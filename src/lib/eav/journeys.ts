/**
 * Journey search orchestration, including cross-network meta-plans.
 *
 * Cross-network (origin and destination on different bacini):
 *  1. resolve the interchange node pair (interchanges.ts);
 *  2. first leg: origin → exit station at the requested date/time
 *     (skipped if the origin *is* the exit station);
 *  3. second leg: entry station → destination, searched from
 *     (earliest arrival of a non-cancelled first-leg journey) + transfer minutes,
 *     or from the requested time + transfer if there was no first leg;
 *     skipped if the destination *is* the entry station.
 *  Top-level `journeys` is empty for cross-network results: the UI renders
 *  `crossNetwork.first`, `transfer`, `second`.
 */
import { ARRIVE_BY, pickArriveBy } from './arriveBy';
import { addMinutesToSearch, hhmmToMinutes, romeWallClockToUtc, toRomeIso } from './dates';
import { resolveInterchange } from './interchanges';
import { searchPlanner } from './planner';
import type { Journey, JourneySearchRequest, JourneySearchResponse, Station } from './types';

type Moment = { date: string; time: string };
type Planner = (fromId: number, toId: number, date: string, time: string) => Promise<Journey[]>;

/** Planner calls allowed for one windowed search (each returns ~4 runs). */
const MAX_PAGES = 6;
/** Extra steps back (windowBeforeMin each) when the window holds no safe pick with a fallback. */
const MAX_EARLIER_STEPS = 2;

const byDeparture = (a: Journey, b: Journey) => Date.parse(a.departure) - Date.parse(b.departure);

/**
 * Page forward through the planner from `start` until a train departs at or
 * after `stopMs`, no new trains come back, or MAX_PAGES is hit.
 */
async function collect(
  plan: Planner,
  fromId: number,
  toId: number,
  start: Moment,
  stopMs: number,
): Promise<Journey[]> {
  const byId = new Map<string, Journey>();
  let at = start;
  for (let i = 0; i < MAX_PAGES; i++) {
    const page = await plan(fromId, toId, at.date, at.time);
    const fresh = page.filter((j) => !byId.has(j.id));
    for (const j of fresh) byId.set(j.id, j);
    const all = [...byId.values()].sort(byDeparture);
    if (!fresh.length || all.some((j) => Date.parse(j.departure) >= stopMs)) return all;
    at = addMinutesToSearch(all[all.length - 1].departure, 1);
  }
  return [...byId.values()].sort(byDeparture);
}

function merge(a: Journey[], b: Journey[]): Journey[] {
  const byId = new Map([...a, ...b].map((j) => [j.id, j]));
  return [...byId.values()].sort(byDeparture);
}

/** Same-network "arrive by": trains around the target arrival plus the two picks. */
export async function searchArriveBy(
  fromId: number,
  toId: number,
  req: JourneySearchRequest,
  plan: Planner = searchPlanner,
): Promise<JourneySearchResponse> {
  const targetMs = romeWallClockToUtc(req.date, hhmmToMinutes(req.time));
  const probeStart = addMinutesToSearch(req, -ARRIVE_BY.lookbackMin);
  const probe = await plan(fromId, toId, probeStart.date, probeStart.time);
  const arriveBy = { target: toRomeIso(targetMs), bufferMinutes: ARRIVE_BY.conservativeBufferMin };
  if (!probe.length) return { journeys: [], arriveBy };

  // Window: trip length plus a margin before the target. Collect until a train
  // departs after the target (nothing later can arrive in time, even a faster one).
  const duration = Math.min(...probe.map((j) => j.durationMinutes));
  let windowStartMs = targetMs - (duration + ARRIVE_BY.windowBeforeMin) * 60_000;
  let journeys = await collect(plan, fromId, toId, addMinutesToSearch(toRomeIso(windowStartMs), 0), targetMs);
  let picks = pickArriveBy(journeys, targetMs);

  // Sparse lines: if no safe pick with a fallback is in the window (none, or it
  // is the risky one itself), any earlier in-time train would be one. Look back.
  const needsEarlier = () => picks.riskyId && (!picks.conservativeId || picks.conservativeId === picks.riskyId);
  for (let i = 0; i < MAX_EARLIER_STEPS && needsEarlier(); i++) {
    const untilMs = windowStartMs;
    windowStartMs -= ARRIVE_BY.windowBeforeMin * 60_000;
    const earlier = await collect(plan, fromId, toId, addMinutesToSearch(toRomeIso(windowStartMs), 0), untilMs);
    journeys = merge(journeys, earlier.filter((j) => Date.parse(j.departure) < untilMs));
    picks = pickArriveBy(journeys, targetMs);
  }

  const firstPick = journeys.findIndex((j) => j.id === picks.conservativeId || j.id === picks.riskyId);
  if (firstPick > ARRIVE_BY.keepBeforePicks) journeys = journeys.slice(firstPick - ARRIVE_BY.keepBeforePicks);
  // Trim late context only after the last in-time train, so no pick is cut.
  const lastInTime = Math.max(
    ...journeys.filter((j) => Date.parse(j.arrival) <= targetMs || j.id === picks.riskyId).map((j) => Date.parse(j.departure)),
  );
  const late = journeys.filter((j) => Date.parse(j.departure) > lastInTime);
  const lastKept = late[ARRIVE_BY.keepAfterTarget - 1];
  if (lastKept) journeys = journeys.filter((j) => Date.parse(j.departure) <= Date.parse(lastKept.departure));
  return { journeys, arriveBy: { ...arriveBy, ...picks } };
}

export async function searchJourneys(
  req: JourneySearchRequest,
  stations: Station[],
): Promise<JourneySearchResponse> {
  const from = stations.find((s) => s.id === req.fromId);
  const to = stations.find((s) => s.id === req.toId);
  if (!from || !to) throw new Error('Unknown station');

  if (from.network === to.network) {
    if (req.mode === 'arrive') return searchArriveBy(from.id, to.id, req);
    if (req.until) {
      const untilMs = Date.parse(req.until);
      const all = await collect(searchPlanner, from.id, to.id, req, untilMs);
      return { journeys: all.filter((j) => Date.parse(j.departure) < untilMs) };
    }
    return { journeys: await searchPlanner(from.id, to.id, req.date, req.time) };
  }

  // Cross-network arrive-by: no picks (two trains + transfer); start the plan early enough.
  if (req.mode === 'arrive') req = { ...req, ...addMinutesToSearch(req, -ARRIVE_BY.lookbackMin) };

  const node = resolveInterchange(stations, from.network, to.network);
  if (!node) return { journeys: [] };

  const firstJourneys: Journey[] =
    from.id === node.exit.id ? [] : await searchPlanner(from.id, node.exit.id, req.date, req.time);

  const best = firstJourneys
    .filter((j) => !j.cancelled)
    .sort((a, b) => Date.parse(a.arrival) - Date.parse(b.arrival))[0];

  let second = { date: req.date, time: req.time };
  if (best) {
    second = addMinutesToSearch(best.arrival, best.delayMinutes + node.minutes);
  } else if (from.id === node.exit.id) {
    second = addMinutesToSearch({ date: req.date, time: req.time }, node.minutes);
  }

  // No usable first leg (and origin isn't the interchange) → nothing sensible to chain.
  const canChain = Boolean(best) || from.id === node.exit.id;
  const secondJourneys: Journey[] =
    !canChain || to.id === node.entry.id ? [] : await searchPlanner(node.entry.id, to.id, second.date, second.time);

  return {
    journeys: [],
    crossNetwork: {
      first: { fromId: from.id, toId: node.exit.id, journeys: firstJourneys },
      transfer: {
        fromStation: node.exit.name,
        toStation: node.entry.name,
        description: node.description,
        minutes: node.minutes,
      },
      second: { fromId: node.entry.id, toId: to.id, journeys: secondJourneys },
    },
  };
}
