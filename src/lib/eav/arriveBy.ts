/**
 * "Arrive by" search: which trains get you there by a target time, and which
 * two of them we recommend.
 *
 * EAV lines (the Circumvesuviana above all) are often late or cancelled, so we
 * highlight two picks:
 *  - conservative: the latest train that is expected to arrive at least
 *    `conservativeBufferMin` before the target AND still has a later fallback
 *    train that also arrives in time. If it's late or cancelled you can take
 *    the next one and still make it.
 *  - risky: the latest train expected to arrive by the target, no margin.
 *
 * "Expected arrival" = scheduled arrival + the live delay EAV reports now.
 * Cancelled trains are never recommended.
 */
import type { Journey } from './types';

export interface ArriveByConfig {
  conservativeBufferMin: number;
  requireFallback: boolean;
  lookbackMin: number;
  windowBeforeMin: number;
  keepBeforePicks: number;
  keepAfterTarget: number;
}

export const ARRIVE_BY: ArriveByConfig = {
  /** Conservative pick must be expected at least this many minutes before the target. */
  conservativeBufferMin: 20,
  /**
   * Conservative pick must have a later, non-cancelled train that also arrives
   * by the target (a fallback). If no train satisfies this, the rule is relaxed
   * to the buffer alone.
   */
  requireFallback: true,
  /**
   * A first probe search starts this many minutes before the target, to learn
   * how long the trip takes. Also the departure offset for cross-network routes.
   */
  lookbackMin: 150,
  /** The listed window starts at target − trip duration − this many minutes. */
  windowBeforeMin: 60,
  /** Trains kept in the list before the earliest pick (more via "earlier trains"). */
  keepBeforePicks: 2,
  /** Trains kept that arrive after the target (more via "later trains"). */
  keepAfterTarget: 2,
};

export interface ArriveByPicks {
  conservativeId?: string;
  riskyId?: string;
}

/** Scheduled arrival + current delay, in epoch ms. */
export function expectedArrivalMs(j: Journey): number {
  return Date.parse(j.arrival) + j.delayMinutes * 60_000;
}

/** Pure pick logic. `journeys` may be in any order; `targetMs` is epoch ms. */
export function pickArriveBy(
  journeys: Journey[],
  targetMs: number,
  config: Pick<ArriveByConfig, 'conservativeBufferMin' | 'requireFallback'> = ARRIVE_BY,
): ArriveByPicks {
  const inTime = journeys
    .filter((j) => !j.cancelled && expectedArrivalMs(j) <= targetMs)
    .sort((a, b) => Date.parse(a.departure) - Date.parse(b.departure) || expectedArrivalMs(a) - expectedArrivalMs(b));
  if (!inTime.length) return {};

  const risky = inTime.reduce((best, j) =>
    Date.parse(j.departure) > Date.parse(best.departure) ||
    (Date.parse(j.departure) === Date.parse(best.departure) && expectedArrivalMs(j) < expectedArrivalMs(best))
      ? j
      : best,
  );

  const buffered = inTime.filter((j) => expectedArrivalMs(j) <= targetMs - config.conservativeBufferMin * 60_000);
  const hasFallback = (j: Journey) =>
    inTime.some((o) => o.id !== j.id && Date.parse(o.departure) > Date.parse(j.departure));
  const latest = (list: Journey[]) => list[list.length - 1];
  const conservative =
    (config.requireFallback ? latest(buffered.filter(hasFallback)) : undefined) ?? latest(buffered);

  return { conservativeId: conservative?.id, riskyId: risky.id };
}
