# Notes on the EAV upstream

EAV publishes no documented API. Everything below was observed live (mostly on 2026-10-12) and is implemented in `src/lib/eav/`. Fixtures of real responses are in `src/lib/eav/__tests__/fixtures/`. Endpoints can change without notice, which is why every payload is validated with zod and failures surface as `UPSTREAM` (502).

## Hosts

| Host | Constant | Used for |
| --- | --- | --- |
| `https://planner.eavsrl.it` | `PLANNER_BASE` | stations, destinations, journeys |
| `https://orariotreni.eavsrl.it` | `ORARIOTRENI_BASE` | line data and live boards |

## Required request shape

Planner calls are `POST` with `application/x-www-form-urlencoded; charset=UTF-8`. The planner **redirects to `/Home/Error`** unless `X-Requested-With: XMLHttpRequest` is present, so the client sends it on every form POST, does not follow redirects (`redirect: 'manual'`) and treats any non-2xx as an error. Timeout is 8 s. No browser user agent is spoofed and raw payloads are never logged.

## Planner

| Endpoint | Form fields | Returns |
| --- | --- | --- |
| `POST /Home/StazioniFromBacino` | `id` = bacino 1..4 | `[{ Codice, Descrizione, Bacino }]` |
| `POST /Home/DestinazioniFromStazione` | `id` = station Codice | list of reachable destinations (same bacino only) |
| `POST /Home/Create` | `origine`, `destinazione`, `data` (planner date format), `ora` (HH:MM) | runs with segments |

### Networks (bacini)

| id | Network |
| --- | --- |
| 1 | Vesuviana (Circumvesuviana) |
| 2 | Flegrea (Cumana, Circumflegrea) |
| 3 | Suburbana |
| 4 | Metrocampania NordEst |

The planner routes within one bacino only. Observed: `DestinazioniFromStazione` for Garibaldi returns just the 97 Vesuviana stations, Montesanto only the 28 Flegrea ones, Piscinola only 5. No station is shared between networks, hence the hand-curated interchange table (`interchanges.ts`), keyed by station name and resolved against the live list.

### Dates and times in `Home/Create`

- ASP.NET serialises dates as `/Date(ms)/`, optionally with a `+0100` suffix.
- **Segment-level** `partenza`, `arrivo`, `partenzaOrigine`, `arrivoDestinazione` are wall-clock values on the dummy date **1900-01-01**, serialised with a fixed +01:00 offset. 17:05 arrives as `/Date(-2208930900000)/`. Rome's historic LMT (+00:49:56) was ruled out because no value has odd seconds. They are decoded as "ms since 1900-01-01T00:00+01:00".
- **Run-level** `partenza`/`arrivo` are real timestamps, but their calendar date echoes the server's "today" (a search for 13/10 returned runs dated 12/10). Only time of day is trusted; everything is anchored on the requested date and rolls over midnight when times go backwards.

### Segment times are the whole run, not the leg

For Napoli P. Garibaldi to Sorrento on train 1171 the run says 17:08 but the segment says 17:05. Segment `partenza`/`arrivo` describe the **whole train run** (Origine_corsa to Destinazione_corsa, here Napoli Porta Nolana to Sorrento). The passenger's leg is given by two offsets from the run's first departure:

- `partenzaOrigine`: time from run start to boarding (00:03 gives 17:08)
- `arrivoDestinazione`: time from run start to alighting (01:12 gives 18:17)

Cross-checked against the live Garibaldi board and a journey with a change (train 6093: run start 09:22 + 00:02:30 boarding, + 00:38:30 alighting = 10:00:30, equal to the run-level `arrivo`).

Other fields used: `codice` (train number), `DLinea` (line description), `ritardo` (delay minutes), `soppressa` (cancelled). The numeric `Linea` is ignored because it is ambiguous (L1 is used for both the Sorrento and Torre lines).

## orariotreni

### Station metadata: `GET /`

The homepage embeds a `<script id="data-localita">` JSON array: `id` (equals the planner `Codice`), `idLocMoova`, `touchpoint`, `isMoova`, `descrizione`, `idLinea`, `linea`. It is merged with the planner list to add lines and board identifiers. A few ids exist only here (for example 54 Castellammare Terme, 101 Bivio Botteghelle) and are ignored because they cannot be planned.

Line labels differ between sources (`NAPOLI-SORRENTO` vs `NAPOLI - SORRENTO`); `lines.ts` maps both to a `LineKey`. Order matters: "TORREGAVETA" (Cumana) must not match the Torre line.

### Boards: `POST /teleindicatori/<backend>`

Form fields: `device` = `M01T<stationId>M`, `tipoLista` = `P` (departures) or `A` (arrivals), `codLoc`, `touchpoint`.

| Backend | Used for | codLoc | touchpoint |
| --- | --- | --- | --- |
| `ws_getData_moova.php` | Vesuviana and others | `idLocMoova` | from data-localita |
| `ws_getData_pis.php` | Flegrea (Cumana, Circumflegrea) | station id | empty |

Both return an HTML table with rows `<tr class="testoGiallo">`; cells include `binario` (platform) and an info text with `Ferma a: STATION (HH:MM), ...`. The scraper decodes entities and extracts stops.

## Quirks

- Stabia Scavi has no live board.
- Baiano-line searches may return nothing.
- On the Moova backend at Napoli P. Garibaldi, `tipoLista=A` and `P` returned the same rows (only the header changes). The app shows what EAV returns.
- The old departures endpoint is gone (404); boards now use Moova/PIS.
- Some stations appear in the planner under different spellings than in orariotreni; `names.ts` normalises both for matching.
