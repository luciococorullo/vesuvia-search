import { describe, expect, it } from 'vitest';
import { pickArriveBy } from '../arriveBy';
import { searchArriveBy } from '../journeys';
import type { Journey } from '../types';

const day = '2026-11-02T';
const at = (hhmm: string) => `${day}${hhmm}:00+01:00`;

function journey(dep: string, arr: string, extra: Partial<Journey> = {}): Journey {
  return {
    id: dep,
    from: 'Napoli P. Garibaldi',
    to: 'Sorrento',
    departure: at(dep),
    arrival: at(arr),
    durationMinutes: (Date.parse(at(arr)) - Date.parse(at(dep))) / 60_000,
    changes: 0,
    legs: [],
    delayMinutes: 0,
    cancelled: false,
    ...extra,
  };
}

const target = Date.parse(at('10:00'));
const config = { conservativeBufferMin: 20, requireFallback: true };

describe('pickArriveBy', () => {
  // Half-hourly trains, 70 min each: arrive 08:40, 09:10, 09:40, 10:10.
  const trains = [
    journey('07:30', '08:40'),
    journey('08:00', '09:10'),
    journey('08:30', '09:40'),
    journey('09:00', '10:10'),
  ];

  it('risky = latest train arriving by the target; conservative = buffered, with a fallback', () => {
    expect(pickArriveBy(trains, target, config)).toEqual({ conservativeId: '08:00', riskyId: '08:30' });
  });

  it('accepts a train arriving exactly at the target as risky', () => {
    const picks = pickArriveBy([...trains, journey('08:50', '10:00')], target, config);
    expect(picks.riskyId).toBe('08:50');
    // 08:30 (arr 09:40) is exactly 20 min early and has the 08:50 fallback.
    expect(picks.conservativeId).toBe('08:30');
  });

  it('counts live delays and skips cancelled trains', () => {
    const picks = pickArriveBy(
      [
        journey('07:30', '08:40'),
        journey('08:00', '09:10', { cancelled: true }),
        journey('08:30', '09:40', { delayMinutes: 25 }), // expected 10:05: too late
        journey('09:00', '10:10'),
      ],
      target,
      config,
    );
    // Only 07:30 makes it: it is both picks (no fallback to relax to).
    expect(picks).toEqual({ conservativeId: '07:30', riskyId: '07:30' });
  });

  it('relaxes the fallback rule when no buffered train has one', () => {
    const picks = pickArriveBy([journey('08:00', '09:10'), journey('09:00', '10:10')], target, config);
    expect(picks).toEqual({ conservativeId: '08:00', riskyId: '08:00' });
  });

  it('leaves conservative empty when nothing arrives with the buffer', () => {
    const picks = pickArriveBy([journey('08:30', '09:50'), journey('09:00', '10:10')], target, config);
    expect(picks).toEqual({ conservativeId: undefined, riskyId: '08:30' });
  });

  it('returns nothing when no train arrives in time', () => {
    expect(pickArriveBy([journey('09:00', '10:10')], target, config)).toEqual({});
  });

  it('honours a tuned buffer', () => {
    const picks = pickArriveBy(trains, target, { conservativeBufferMin: 60, requireFallback: true });
    expect(picks.conservativeId).toBe('07:30');
  });
});

describe('searchArriveBy', () => {
  /** Fake planner: the first `perPage` runs departing at or after the requested time. */
  const planner = (runs: Journey[], perPage = 4) => async (_f: number, _t: number, date: string, time: string) =>
    runs
      .filter((j) => j.departure >= `${date}T${time}`)
      .sort((a, b) => a.departure.localeCompare(b.departure))
      .slice(0, perPage);
  const req = { fromId: 1, toId: 2, date: '2026-11-02', time: '10:00', mode: 'arrive' as const };

  it('looks further back on sparse lines to find a safe pick with a fallback', async () => {
    // 60-min trips, 70 min apart: the window (08:00) alone holds only 08:40.
    const runs = [journey('06:20', '07:20'), journey('07:30', '08:30'), journey('08:40', '09:40'), journey('09:50', '10:50')];
    const res = await searchArriveBy(1, 2, req, planner(runs));
    expect(res.arriveBy).toMatchObject({ conservativeId: '07:30', riskyId: '08:40' });
  });

  it('does not stop at a slow train when a faster later one still arrives in time', async () => {
    const runs = [
      journey('08:00', '09:10'),
      journey('08:30', '10:05'), // slow: late
      journey('08:45', '09:55'), // fast: in time, on the next planner page
      journey('09:15', '10:25'),
    ];
    const res = await searchArriveBy(1, 2, req, planner(runs, 2));
    expect(res.arriveBy?.riskyId).toBe('08:45');
  });
});
