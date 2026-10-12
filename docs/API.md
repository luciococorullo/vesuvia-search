# API reference

Five route handlers under `src/app/api/*/route.ts`, all `dynamic = 'force-dynamic'`. Types live in `src/lib/eav/types.ts`. User-facing error messages are in Italian.

## Errors

Every error uses the same body, with `Cache-Control: no-store`:

```ts
interface ApiError {
  error: string; // safe, human readable (Italian)
  code: 'BAD_REQUEST' | 'NOT_FOUND' | 'UPSTREAM' | 'INTERNAL';
}
```

| code | HTTP | Meaning |
| --- | --- | --- |
| `BAD_REQUEST` | 400 | Validation failed, or invalid JSON body |
| `NOT_FOUND` | 404 | Unknown station, or no board for that station |
| `UPSTREAM` | 502 | EAV timed out (8 s), answered non-2xx or redirected, or sent a payload that failed validation |
| `INTERNAL` | 500 | Anything else. Details are only logged server-side |

## GET /api/stations

All stations, merged from the EAV planner and orariotreni (161 at the time of writing). No parameters.

```ts
interface StationsResponse {
  stations: Station[];
  updatedAt: string; // ISO
  stale?: boolean;   // true when served from the last-good copy because EAV failed
}
interface Station {
  id: number;                 // planner "Codice"
  name: string;               // as EAV writes it, e.g. "S. Agnello"
  network: 1 | 2 | 3 | 4;     // 1 Vesuviana, 2 Flegrea, 3 Suburbana, 4 Metrocampania NordEst
  lines: LineKey[];
  board?: { backend: 'moova' | 'pis'; codLoc: string; touchpoint: string }; // present only if a live board exists
}
```

Cache: `public, s-maxage=86400, stale-while-revalidate=604800`; when `stale` is true, `s-maxage=60, stale-while-revalidate=300`.

## GET /api/destinations

Stations reachable from `from` according to the planner (same network only).

| Param | Validation |
| --- | --- |
| `from` | required, coerced integer, positive; must be a known station id |

Response: `{ destinationIds: number[] }` (filtered to known stations). Errors: 400, 404, 502.
Cache: `s-maxage=86400, stale-while-revalidate=604800`, plus a 24 h `unstable_cache` per `from`.

## POST /api/journeys

JSON body:

```ts
interface JourneySearchRequest {
  fromId: number; // integer > 0
  toId: number;   // integer > 0, different from fromId
  date: string;   // YYYY-MM-DD, must be a valid calendar date
  time: string;   // HH:MM, 00:00-23:59
}
```

Validation failures, invalid JSON and `fromId === toId` return 400; unknown ids return 404.

```ts
interface JourneySearchResponse {
  journeys: Journey[];          // same network; empty for cross-network results
  crossNetwork?: CrossNetworkPlan;
}
interface Journey {
  id: string; from: string; to: string;
  departure: string; arrival: string; // ISO with Europe/Rome offset, real dates
  durationMinutes: number; changes: number;
  legs: Leg[]; delayMinutes: number; cancelled: boolean;
}
interface Leg {
  trainNumber: string; lineName: string; line: LineKey; category?: string;
  from: string; to: string; departure: string; arrival: string;
  delayMinutes: number; cancelled: boolean;
}
interface CrossNetworkPlan {
  first:    { fromId: number; toId: number; journeys: Journey[] };
  transfer: { fromStation: string; toStation: string; description: string; minutes: number };
  second:   { fromId: number; toId: number; journeys: Journey[] };
}
```

If origin and destination are on different networks and no interchange is known, the response is `{ journeys: [] }`. Cache: `private, no-store`.

## GET /api/board

Live board for a station.

| Param | Validation |
| --- | --- |
| `station` | required, positive integer |
| `type` | `departures` (default) or `arrivals` |

```ts
interface BoardResponse {
  stationId: number;
  type: 'departures' | 'arrivals';
  entries: BoardEntry[];
  updatedAt: string;
}
interface BoardEntry {
  trainNumber: string; category: string;
  endpoint: string;       // destination (departures) or origin (arrivals)
  time: string;           // HH:MM scheduled
  delayMinutes: number; platform?: string; cancelled: boolean;
  stops: BoardStop[];     // from "Ferma a:" (departures)
  line: LineKey;
}
interface BoardStop { station: string; time: string } // HH:MM
```

404 if the station is unknown or has no board (for example Via Nocera). Cache: `s-maxage=30, stale-while-revalidate=30`.

## GET /api/train-stops

Stops after `station` for a given train, read from that station's departures board.

| Param | Validation |
| --- | --- |
| `station` | required, positive integer |
| `train` | required, 1 to 8 digits (trimmed) |

Response: `{ stops: BoardStop[] | null }`. `stops` is `null` when the train is not on the board (too far ahead, already departed), the station has no board, or the board lists no stops. Cache: `s-maxage=30, stale-while-revalidate=30`.

## LineKey

`sorrento | baiano | poggiomarino | sarno | torre | pomigliano | cumana | circumflegrea | soccavo | other`
