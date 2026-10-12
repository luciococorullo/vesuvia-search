/**
 * EAV planner (planner.eavsrl.it): journey search and same-network destinations.
 *
 * ## How Home/Create times work (investigated live on 2026-10-12)
 *
 * Search Napoli P. Garibaldi (3) → Sorrento (62), train 1171: the run says
 * partenza 17:08, the segment says partenza 17:05. Hypothesis "1900 dates +
 * Rome LMT (+00:49:56)" was ruled out: offsets would be ~49 minutes with odd
 * seconds, while the gap is exactly 3 minutes and arrivals match. The real
 * cause: segment `partenza`/`arrivo` are the times of the *whole train run*
 * (Origine_corsa → Destinazione_corsa, here Napoli Porta Nolana → Sorrento),
 * not of the passenger's leg. The passenger's leg is given by two offsets from
 * the run's first departure:
 *   - `partenzaOrigine`   = minutes from run start to boarding  (00:03 → 17:08)
 *   - `arrivoDestinazione` = minutes from run start to alighting (01:12 → 18:17)
 * Cross-checked with the live Garibaldi board (1171 departs 17:08) and with a
 * journey with a change (6093 Garibaldi→Ottaviano: run start 09:22 + 00:02:30
 * board, + 00:38:30 alight = 10:00:30, exactly the run-level `arrivo`).
 *
 * ## Dates
 * Run-level `partenza`/`arrivo` are real epoch values, but their calendar date
 * echoes the server's "today" (a search for 13/10 returned runs dated 12/10).
 * So we only trust time-of-day from 1900 segment fields and anchor everything
 * on the requested date, rolling over midnight when times go backwards.
 */
import { z } from 'zod';
import { eavPostJson, PLANNER_BASE } from './client';
import { DAY_MINUTES, dotNet1900ToMinutes, hhmmToMinutes, romeWallClockToUtc, toRomeIso, ymdToPlanner } from './dates';
import { lineFromName } from './lines';
import type { Journey, Leg } from './types';

const dotNetDate = z.string().regex(/^\/Date\(-?\d+(?:[+-]\d{4})?\)\/$/);

const segmentSchema = z.object({
  codice: z.union([z.number(), z.string()]),
  DLinea: z.string().nullish(),
  Linea: z.union([z.string(), z.number()]).nullish(),
  tipologia: z.string().nullish(),
  ritardo: z.number().nullish(),
  soppressa: z.boolean().nullish(),
  Descrizione_origine: z.string().nullish(),
  Descrizione_destinazione: z.string().nullish(),
  partenza: dotNetDate,
  arrivo: dotNetDate,
  partenzaOrigine: dotNetDate.nullish(),
  arrivoDestinazione: dotNetDate.nullish(),
});

const runSchema = z.object({
  Descrizione_origine: z.string().nullish(),
  Descrizione_destinazione: z.string().nullish(),
  partenza: dotNetDate.nullish(),
  arrivo: dotNetDate.nullish(),
  percorsi: z.array(segmentSchema),
});

export const createResponseSchema = z.object({
  CorsePercorso: z.array(runSchema).nullish(),
});
export type CreateResponse = z.infer<typeof createResponseSchema>;

const destinationsSchema = z.array(z.object({ Codice: z.number().int(), Descrizione: z.string() }));

/** If a time jumps back more than this, we assume it crossed midnight. */
const ROLLOVER_THRESHOLD_MIN = 6 * 60;

function legMinutes(seg: z.infer<typeof segmentSchema>): { dep: number; arr: number } {
  const runStart = dotNet1900ToMinutes(seg.partenza);
  if (seg.partenzaOrigine && seg.arrivoDestinazione) {
    const dep = runStart + dotNet1900ToMinutes(seg.partenzaOrigine);
    const arr = runStart + dotNet1900ToMinutes(seg.arrivoDestinazione);
    // Guard against nonsense offsets: fall back to the run's own times.
    if (arr >= dep && arr - dep < DAY_MINUTES) return { dep, arr };
  }
  let arr = dotNet1900ToMinutes(seg.arrivo);
  if (arr < runStart) arr += DAY_MINUTES;
  return { dep: runStart, arr };
}

/**
 * Pure mapping of a Home/Create payload to Journeys.
 * `date` (YYYY-MM-DD) and `time` (HH:MM) are the search parameters: they anchor
 * the calendar date of 1900-dated segment times.
 */
export function mapCreateResponse(payload: CreateResponse, date: string, time: string): Journey[] {
  const requested = hhmmToMinutes(time);
  const journeys: Journey[] = [];

  for (const run of payload.CorsePercorso ?? []) {
    if (!run.percorsi.length) continue;
    const legs: Leg[] = [];
    let prevArr: number | null = null;

    for (const seg of run.percorsi) {
      let { dep, arr } = legMinutes(seg);
      // Times are minute-of-day (0..1440+); shift whole days to keep monotonic order.
      const reference: number = prevArr ?? requested;
      while (dep < reference - ROLLOVER_THRESHOLD_MIN) {
        dep += DAY_MINUTES;
        arr += DAY_MINUTES;
      }
      prevArr = arr;
      const lineName = (seg.DLinea ?? '').trim();
      legs.push({
        trainNumber: String(seg.codice).trim(),
        lineName,
        line: lineFromName(lineName),
        category: seg.tipologia?.trim() || undefined,
        from: (seg.Descrizione_origine ?? '').trim(),
        to: (seg.Descrizione_destinazione ?? '').trim(),
        // Floor to the minute: offsets can carry 30s (e.g. 10:00:30) and the UI shows HH:MM.
        departure: toRomeIso(romeWallClockToUtc(date, Math.floor(dep))),
        arrival: toRomeIso(romeWallClockToUtc(date, Math.floor(arr))),
        delayMinutes: Math.max(0, Math.round(seg.ritardo ?? 0)),
        cancelled: seg.soppressa === true,
      });
    }

    const first = legs[0];
    const last = legs[legs.length - 1];
    const durationMinutes = Math.round((Date.parse(last.arrival) - Date.parse(first.departure)) / 60_000);
    journeys.push({
      id: `${first.departure.slice(0, 16)}-${legs.map((l) => l.trainNumber).join('-')}`,
      from: (run.Descrizione_origine ?? first.from).trim(),
      to: (run.Descrizione_destinazione ?? last.to).trim(),
      departure: first.departure,
      arrival: last.arrival,
      durationMinutes,
      changes: legs.length - 1,
      legs,
      delayMinutes: Math.max(...legs.map((l) => l.delayMinutes)),
      cancelled: legs.some((l) => l.cancelled),
    });
  }

  journeys.sort((a, b) => Date.parse(a.departure) - Date.parse(b.departure));
  return journeys;
}

/** Same-network journey search via Home/Create. */
export async function searchPlanner(fromId: number, toId: number, date: string, time: string): Promise<Journey[]> {
  const payload = await eavPostJson(
    `${PLANNER_BASE}/Home/Create`,
    {
      origine: String(fromId),
      destinazione: String(toId),
      data: ymdToPlanner(date),
      ora: time,
    },
    createResponseSchema,
  );
  return mapCreateResponse(payload, date, time);
}

/** Station ids reachable from `fromId` according to the planner (same network only). */
export async function fetchDestinationIds(fromId: number): Promise<number[]> {
  const list = await eavPostJson(
    `${PLANNER_BASE}/Home/DestinazioniFromStazione`,
    { id: String(fromId) },
    destinationsSchema,
  );
  return [...new Set(list.map((d) => d.Codice))].filter((id) => id !== fromId);
}
