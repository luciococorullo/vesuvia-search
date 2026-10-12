/**
 * SSR-safe localStorage persistence for recent searches and favourites.
 *
 * Station identity is always the numeric id; names are stored only as a
 * display fallback while the live stations list is loading.
 * Designed for React's useSyncExternalStore (stable snapshots + subscribe).
 */

export interface StationRef {
  id: number;
  name: string;
}

export interface RouteRef {
  from: StationRef;
  to: StationRef;
}

export interface RecentSearch extends RouteRef {
  at: number;
}

export interface Favorites {
  routes: RouteRef[];
  stations: StationRef[];
}

const KEYS = {
  recents: "vs:recents:v1",
  favorites: "vs:favorites:v1",
  boardStation: "vs:board-station:v1",
  installDismissed: "vs:install-dismissed:v1",
} as const;

type Key = (typeof KEYS)[keyof typeof KEYS];

const MAX_RECENTS = 6;
const EMPTY_RECENTS: RecentSearch[] = [];
const EMPTY_FAVORITES: Favorites = { routes: [], stations: [] };

const listeners = new Set<() => void>();
const cache = new Map<Key, { raw: string | null; value: unknown }>();

function hasStorage(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function read<T>(key: Key, fallback: T, validate: (v: unknown) => v is T): T {
  if (!hasStorage()) return fallback;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (validate(parsed)) value = parsed;
    } catch {
      /* corrupted entry → fallback */
    }
  }
  cache.set(key, { raw, value });
  return value;
}

function write(key: Key, value: unknown): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode: ignore */
  }
  emit();
}

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key && (Object.values(KEYS) as string[]).includes(e.key)) listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

/* ---------- validators ---------- */

function isStationRef(v: unknown): v is StationRef {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as StationRef).id === "number" &&
    typeof (v as StationRef).name === "string"
  );
}
function isRouteRef(v: unknown): v is RouteRef {
  return (
    typeof v === "object" &&
    v !== null &&
    isStationRef((v as RouteRef).from) &&
    isStationRef((v as RouteRef).to)
  );
}
function isRecents(v: unknown): v is RecentSearch[] {
  return Array.isArray(v) && v.every((r) => isRouteRef(r) && typeof (r as RecentSearch).at === "number");
}
function isFavorites(v: unknown): v is Favorites {
  return (
    typeof v === "object" &&
    v !== null &&
    Array.isArray((v as Favorites).routes) &&
    (v as Favorites).routes.every(isRouteRef) &&
    Array.isArray((v as Favorites).stations) &&
    (v as Favorites).stations.every(isStationRef)
  );
}

const sameRoute = (a: RouteRef, b: RouteRef) => a.from.id === b.from.id && a.to.id === b.to.id;

/* ---------- recents ---------- */

export function getRecents(): RecentSearch[] {
  return read(KEYS.recents, EMPTY_RECENTS, isRecents);
}
export const getRecentsServer = () => EMPTY_RECENTS;

export function addRecent(route: RouteRef): void {
  const next = [
    { from: route.from, to: route.to, at: Date.now() },
    ...getRecents().filter((r) => !sameRoute(r, route)),
  ].slice(0, MAX_RECENTS);
  write(KEYS.recents, next);
}

export function removeRecent(route: RouteRef): void {
  write(
    KEYS.recents,
    getRecents().filter((r) => !sameRoute(r, route)),
  );
}

export function clearRecents(): void {
  write(KEYS.recents, []);
}

/* ---------- favourites ---------- */

export function getFavorites(): Favorites {
  return read(KEYS.favorites, EMPTY_FAVORITES, isFavorites);
}
export const getFavoritesServer = () => EMPTY_FAVORITES;

export function isFavoriteRoute(fav: Favorites, route: { fromId: number; toId: number }): boolean {
  return fav.routes.some((r) => r.from.id === route.fromId && r.to.id === route.toId);
}

export function toggleFavoriteRoute(route: RouteRef): void {
  const fav = getFavorites();
  const exists = fav.routes.some((r) => sameRoute(r, route));
  write(KEYS.favorites, {
    ...fav,
    routes: exists ? fav.routes.filter((r) => !sameRoute(r, route)) : [route, ...fav.routes],
  });
}

export function isFavoriteStation(fav: Favorites, id: number): boolean {
  return fav.stations.some((s) => s.id === id);
}

export function toggleFavoriteStation(station: StationRef): void {
  const fav = getFavorites();
  const exists = fav.stations.some((s) => s.id === station.id);
  write(KEYS.favorites, {
    ...fav,
    stations: exists ? fav.stations.filter((s) => s.id !== station.id) : [station, ...fav.stations],
  });
}

/* ---------- last board station ---------- */

export function getLastBoardStation(): number | null {
  const v = read<number | null>(KEYS.boardStation, null, (x): x is number | null =>
    x === null || typeof x === "number",
  );
  return v;
}

export function setLastBoardStation(id: number): void {
  write(KEYS.boardStation, id);
}

/* ---------- install banner ---------- */

/** Timestamp of the last "Not now" on the install banner, or null. */
export function getInstallDismissedAt(): number | null {
  return read<number | null>(KEYS.installDismissed, null, (x): x is number | null =>
    x === null || typeof x === "number",
  );
}

export function setInstallDismissedAt(at: number): void {
  write(KEYS.installDismissed, at);
}
