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
import { addMinutesToSearch } from './dates';
import { resolveInterchange } from './interchanges';
import { searchPlanner } from './planner';
import type { Journey, JourneySearchRequest, JourneySearchResponse, Station } from './types';

export async function searchJourneys(
  req: JourneySearchRequest,
  stations: Station[],
): Promise<JourneySearchResponse> {
  const from = stations.find((s) => s.id === req.fromId);
  const to = stations.find((s) => s.id === req.toId);
  if (!from || !to) throw new Error('Unknown station');

  if (from.network === to.network) {
    return { journeys: await searchPlanner(from.id, to.id, req.date, req.time) };
  }

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
