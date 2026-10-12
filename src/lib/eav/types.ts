/**
 * Shared domain types between API routes and UI.
 * Everything here is derived from live EAV APIs: no hand-maintained station lists.
 */

/** EAV planner "bacino": the planner only routes within a single network. */
export type NetworkId = 1 | 2 | 3 | 4;

export const NETWORKS: Record<NetworkId, string> = {
  1: 'Vesuviana',
  2: 'Flegrea',
  3: 'Suburbana',
  4: 'Metrocampania NordEst',
};

/** Line keys used for colours. Derived from orariotreni `data-localita.linea`. */
export type LineKey =
  | 'sorrento'
  | 'baiano'
  | 'poggiomarino'
  | 'sarno'
  | 'torre'
  | 'pomigliano'
  | 'cumana'
  | 'circumflegrea'
  | 'soccavo'
  | 'other';

export interface Station {
  /** Planner `Codice` (numeric id used by Home/Create and DestinazioniFromStazione). */
  id: number;
  /** Display name as EAV writes it (e.g. "S. Agnello"). */
  name: string;
  network: NetworkId;
  /** Lines serving the station (from data-localita); may be empty. */
  lines: LineKey[];
  /** Live departures board identifiers, present only if the station has a Moova board. */
  board?: { codLoc: string; touchpoint: string };
}

export interface StationsResponse {
  stations: Station[];
  /** ISO timestamp of when EAV data was fetched. */
  updatedAt: string;
  /** true when served from last-good fallback because EAV failed. */
  stale?: boolean;
}

/** One train ride within a journey (journeys with changes have >1 leg). */
export interface Leg {
  trainNumber: string;
  /** Raw EAV line description, e.g. "NAPOLI-SORRENTO". */
  lineName: string;
  line: LineKey;
  category?: string;
  from: string;
  to: string;
  /** ISO datetime with offset, Europe/Rome, real calendar date (no 1900 dates). */
  departure: string;
  arrival: string;
  delayMinutes: number;
  cancelled: boolean;
}

export interface Journey {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  changes: number;
  legs: Leg[];
  delayMinutes: number;
  cancelled: boolean;
}

export interface JourneySearchRequest {
  fromId: number;
  toId: number;
  /** YYYY-MM-DD */
  date: string;
  /** HH:MM */
  time: string;
}

export interface JourneySearchResponse {
  journeys: Journey[];
  /**
   * Present when origin and destination are on different networks: the journey
   * is split at an interchange node with an external transfer (metro, walk...).
   */
  crossNetwork?: CrossNetworkPlan;
}

export interface CrossNetworkPlan {
  /** First leg search: origin → interchange station on origin network. */
  first: { fromId: number; toId: number; journeys: Journey[] };
  transfer: {
    fromStation: string;
    toStation: string;
    /** Human hint, e.g. "Metro Linea 2 Garibaldi → Montesanto". */
    description: string;
    minutes: number;
  };
  second: { fromId: number; toId: number; journeys: Journey[] };
}

export interface BoardStop {
  station: string;
  /** HH:MM */
  time: string;
}

export interface BoardEntry {
  trainNumber: string;
  category: string;
  /** Destination (departures) or origin (arrivals). */
  endpoint: string;
  /** HH:MM scheduled */
  time: string;
  delayMinutes: number;
  platform?: string;
  cancelled: boolean;
  /** Stops after this station (departures) parsed from "Ferma a:". */
  stops: BoardStop[];
  line: LineKey;
}

export interface BoardResponse {
  stationId: number;
  type: 'departures' | 'arrivals';
  entries: BoardEntry[];
  updatedAt: string;
}

/** Error body for all API routes. Never leaks internals. */
export interface ApiError {
  error: string;
  code: 'BAD_REQUEST' | 'NOT_FOUND' | 'UPSTREAM' | 'INTERNAL';
}
