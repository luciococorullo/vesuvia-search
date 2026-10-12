import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TIME_ZONE = "Europe/Rome";

const timeFormatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TIME_ZONE,
});

/** ISO datetime (with offset) → "HH:MM" in Europe/Rome, whatever the device zone. */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--:--";
  return timeFormatter.format(d);
}

/** Add minutes to an ISO datetime and format it as Rome "HH:MM". */
export function formatTimePlus(iso: string, minutes: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--:--";
  return timeFormatter.format(new Date(d.getTime() + minutes * 60_000));
}

/** "HH:MM" + minutes → "HH:MM" (wraps past midnight). */
export function addMinutesToHHMM(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm;
  const total = (((h * 60 + m + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** 64 → "1 h 04", 51 → "51 min". */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 0) return "";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h} h ${String(m).padStart(2, "0")}`;
}

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Current date/time in Rome as { date: "YYYY-MM-DD", time: "HH:MM" }. */
export function romeNow(now: Date = new Date()): { date: string; time: string } {
  const p = Object.fromEntries(partsFormatter.formatToParts(now).map((x) => [x.type, x.value]));
  const hour = p.hour === "24" ? "00" : p.hour;
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${hour}:${p.minute}` };
}

/** "YYYY-MM-DD" + n days → "YYYY-MM-DD" (calendar arithmetic, zone-agnostic). */
export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

/** Minutes from now until the given ISO datetime (negative if in the past). */
export function minutesUntil(iso: string, now: number = Date.now()): number {
  return (new Date(iso).getTime() - now) / 60_000;
}

/** Minutes between two ISO datetimes. */
export function minutesBetween(fromIso: string, toIso: string): number {
  return Math.round((new Date(toIso).getTime() - new Date(fromIso).getTime()) / 60_000);
}

/** Format a "YYYY-MM-DD" date for humans in the given locale (e.g. "mar 14 ott"). */
export function formatDateShort(date: string, locale: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Raw EAV line text ("NAPOLI-SORRENTO") → "Napoli - Sorrento". */
export function prettifyLineName(raw: string): string {
  return raw
    .toLowerCase()
    .split(/\s*-\s*/)
    .map((part) => part.replace(/(^|[\s'.])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase()))
    .join(" - ");
}

/** Merge overlapping/adjacent [start, end) ranges and sort them. */
export function mergeRanges(ranges: [number, number][]): [number, number][] {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else out.push([r[0], r[1]]);
  }
  return out;
}
