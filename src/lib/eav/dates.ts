/**
 * Date helpers for EAV payloads.
 *
 * EAV's planner is an ASP.NET MVC app that serialises DateTime as "/Date(ms)/".
 * Two flavours appear in Home/Create responses:
 *  - run-level `partenza`/`arrivo`: real epoch timestamps (but see planner.ts:
 *    their calendar date echoes the server's "today", not the requested date);
 *  - segment-level `partenza`/`arrivo`/`partenzaOrigine`/`arrivoDestinazione`:
 *    wall-clock values attached to the dummy date 1900-01-01.
 *
 * The 1900 values were serialised by the server using a fixed +01:00 offset
 * (CET). Verified live on 2026-10-12: 17:05 is sent as /Date(-2208930900000)/,
 * i.e. 1900-01-01T16:05:00Z, which is 17:05 at +01:00 with zero seconds. Had the
 * server applied Rome's historic LMT (+00:49:56) we would see odd seconds, and
 * no observed value has them. So we decode 1900 values as "ms since
 * 1900-01-01T00:00+01:00" and never feed them to a timezone database.
 */

const MINUTE = 60_000;
const DAY_MINUTES = 24 * 60;
/** 1900-01-01T00:00:00+01:00 in epoch ms. */
const EPOCH_1900_CET = Date.UTC(1900, 0, 1) - 60 * MINUTE;

export const ROME_TZ = 'Europe/Rome';

/** Parse an ASP.NET "/Date(1791817680000)/" (optionally with "+0100" suffix). */
export function parseDotNetDate(raw: string): number {
  const m = /^\/Date\((-?\d+)(?:[+-]\d{4})?\)\/$/.exec(raw.trim());
  if (!m) throw new Error('Invalid .NET date');
  return Number(m[1]);
}

/**
 * Minutes elapsed since 1900-01-01 00:00 (CET) for a 1900-dated planner value.
 * Used both for time-of-day fields and for offset fields (partenzaOrigine,
 * arrivoDestinazione), which are durations from the run's first departure that
 * spill into 1899-12-31 23:xx UTC. Seconds are kept as fractional minutes.
 */
export function dotNet1900ToMinutes(raw: string): number {
  return (parseDotNetDate(raw) - EPOCH_1900_CET) / MINUTE;
}

/** Offset of Europe/Rome from UTC (minutes) at the given instant. */
export function romeOffsetMinutes(utcMs: number): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: ROME_TZ,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / MINUTE);
}

/**
 * Convert a Rome wall-clock (date + minutes from that date's midnight, may
 * exceed 1440 for overnight rollover) to epoch ms.
 */
export function romeWallClockToUtc(dateYmd: string, minutesFromMidnight: number): number {
  const [y, mo, d] = dateYmd.split('-').map(Number);
  const naive = Date.UTC(y, mo - 1, d) + minutesFromMidnight * MINUTE;
  // Two passes settle the offset around DST transitions.
  let utc = naive - romeOffsetMinutes(naive) * MINUTE;
  utc = naive - romeOffsetMinutes(utc) * MINUTE;
  return utc;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** ISO 8601 with Rome offset, e.g. "2026-10-12T17:08:00+02:00". */
export function toRomeIso(utcMs: number): string {
  const off = romeOffsetMinutes(utcMs);
  const local = new Date(utcMs + off * MINUTE);
  const sign = off >= 0 ? '+' : '-';
  const abs = Math.abs(off);
  return (
    `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}` +
    `T${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:${pad(local.getUTCSeconds())}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
}

/** Rome calendar date (YYYY-MM-DD) and minutes-of-day for an instant. */
export function romeParts(utcMs: number): { date: string; minutes: number } {
  const iso = toRomeIso(utcMs);
  return { date: iso.slice(0, 10), minutes: Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16)) };
}

/** "HH:MM" → minutes from midnight. */
export function hhmmToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** minutes (any value, wraps around the day) → "HH:MM". */
export function minutesToHhmm(minutes: number): string {
  const m = ((Math.floor(minutes) % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

/** "YYYY-MM-DD" → "DD/MM/YYYY" as the planner expects. */
export function ymdToPlanner(dateYmd: string): string {
  const [y, m, d] = dateYmd.split('-');
  return `${d}/${m}/${y}`;
}

/** True if the string is a real calendar date in YYYY-MM-DD form. */
export function isValidYmd(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export { DAY_MINUTES };

/**
 * Shift a search moment by `minutes`, returning planner-ready date/time in Rome.
 * Accepts an ISO datetime (e.g. a Journey arrival) or a {date, time} pair.
 */
export function addMinutesToSearch(
  base: string | { date: string; time: string },
  minutes: number,
): { date: string; time: string } {
  const startUtc =
    typeof base === 'string' ? Date.parse(base) : romeWallClockToUtc(base.date, hhmmToMinutes(base.time));
  const parts = romeParts(startUtc + minutes * MINUTE);
  return { date: parts.date, time: minutesToHhmm(parts.minutes) };
}
