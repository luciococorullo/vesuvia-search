# Architecture

## Folders

```
src/app/                 Next.js App Router
  page.tsx, layout.tsx   entry and shell (AppShell is a client component)
  api/*/route.ts         5 route handlers (stations, destinations, journeys, board, train-stops)
  components/            AppShell, Hero, SearchCard, StationPicker, WhenChips, ResultsView,
                         JourneyCard, BoardView, FavoritesView, RecentSearches, PopularDestinations, TabBar
  offline/               offline fallback page
src/hooks/               useStations, useJourneys, useBoard, useTrainStops, useNow, useStorage, fetcher
src/lib/eav/             upstream access and domain logic (see below)
src/lib/search/          station search
src/lib/i18n.ts         dictionaries and language helpers
src/lib/storage.ts      localStorage persistence
public/sw.js            service worker
```

`src/lib/eav/`: `client.ts` (HTTP, timeout, errors), `stations.ts` (station list and cache), `planner.ts` (Home/Create and destinations), `journeys.ts` (same-network and cross-network orchestration), `interchanges.ts`, `board.ts` (HTML boards), `dates.ts`, `lines.ts`, `names.ts`, `http.ts` (route helpers), `types.ts` (shared types).

## Data flow

1. `useStations` fetches `/api/stations` (stale time 1 day) and the client builds a search index from it.
2. The user picks stations and a date/time; the URL is updated.
3. `useJourneys` POSTs `/api/journeys`. The route validates with zod, checks both ids against the station list, and calls `searchJourneys`.
4. For trains departing within 180 minutes, `JourneyCard` calls `/api/train-stops` to show step-by-step stops.
5. The board tab polls `/api/board` every 30 seconds while the page is visible.

Route handlers validate input with zod, call `lib/eav`, and map every failure to `ApiError` (see [API.md](API.md)). Upstream payloads are validated with zod too, so schema drift becomes a clean 502 rather than a crash.

## Caching

| Layer | What | Policy |
| --- | --- | --- |
| `unstable_cache` | station list (`eav-stations-v1`), destinations per station (`eav-destinations-v1`) | 24 h |
| Last-good fallback | station list | module-level copy returned with `stale: true` if EAV fails |
| CDN headers | `/api/stations`, `/api/destinations` | `s-maxage=86400, stale-while-revalidate=604800` (`60/300` when stale) |
| CDN headers | `/api/board`, `/api/train-stops` | `s-maxage=30, stale-while-revalidate=30` |
| CDN headers | `/api/journeys`, errors | `private, no-store` / `no-store` |
| TanStack Query | stations 1 day, journeys 1 min, train stops 2 min, board refetch 30 s | client memory |
| Service worker | see below | versioned caches (`vesuvia-*-v3`) |

### Service worker (`public/sw.js`)

- Navigations: network first, then cached page, then `/offline`.
- Static assets (`/_next/static`, icons, fonts, manifest): stale-while-revalidate.
- `/api/stations`: stale-while-revalidate. All other `/api/*`: network only, never cached.
- Only same-origin GET requests are handled. Old cache versions are deleted on activate; `/sw.js` is served with `no-cache`.

## Search algorithm

Implemented in `src/lib/search/`, pure and browser-safe.

1. **Normalise**: lowercase, strip diacritics, punctuation to spaces.
2. **Expand variants** of each EAV name: `S.` to `s/san/sant/santa/santo`, `P.`/`P.zza` to `piazza`, `V.` to `via`, `C.so` to `corso`, `Staz.` to `stazione`, plus versions without noise tokens (`rfi`, `fs`, `stazione`, ...).
3. **Aliases**: a curated table keyed by normalised station name (not id) adds colloquial names such as "stazione centrale" or "scavi di pompei". Unknown keys are ignored.
4. **Tiers**, best first: exact, prefix (also on space-less compact keys, so "santagnello" works), token prefix, substring, fuzzy.
5. **Fuzzy**: Damerau-Levenshtein with a length-based threshold (0 under 4 characters, 1 from 4, 2 from 7). Fuzzy hits are only shown when no better tier matched.
6. Ties are broken by alias-vs-name, shorter name, then alphabetical. The index is built once per station array and reused per keystroke.

## Cross-network planner

EAV plans within one network only. `searchJourneys` (`journeys.ts`):

1. Same network: one planner search.
2. Different networks: `resolveInterchange` finds the hand-curated station pair for the two networks (for example Garibaldi and Montesanto, with a transfer time).
3. First leg: origin to the exit station at the requested time (skipped if the origin is the interchange).
4. Second leg: entry station to destination, searched from the earliest arrival of a non-cancelled first journey plus delay plus transfer minutes (skipped if the destination is the entry station).
5. The response has `journeys: []` and a `crossNetwork` object that the UI renders as first leg, transfer, second leg.

## i18n

`src/lib/i18n.ts` defines six languages (it, en, es, pt, fr, de). Italian is the source of truth and the default; English is the fallback. A `Dictionary` type forces every language to define the same keys. Placeholders use `{name}` and are filled by `t(key, { name })`.

## State

- **URL-driven views** (`AppShell`): `/?from=&to=&date=&time=` for results, `/?tab=board&station=&type=arrivals` for the board, `/?tab=favorites`. Views are linkable and the back button works.
- **localStorage** (`storage.ts`): recents, favourites and the last board station, read through an SSR-safe external store that also reacts to `storage` events.
- Server state lives in TanStack Query.

## Testing

Vitest (`npm test`, node environment, `TZ=UTC` so Rome timezone logic does not depend on the machine). Tests live in `__tests__` folders next to the code and use **recorded real EAV responses** as fixtures: planner stations for bacini 1 to 4, `Home/Create` responses (including a journey with a change), Moova and PIS board HTML, and the orariotreni homepage. Search tests use a station fixture. Network is never hit.
