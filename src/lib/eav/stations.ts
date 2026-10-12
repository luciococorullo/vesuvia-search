/**
 * Station list built 100% from live EAV data:
 *  - planner Home/StazioniFromBacino (bacini 1..4): ids, names, network;
 *  - orariotreni.eavsrl.it `data-localita` JSON: lines and board identifiers.
 *
 * data-localita `id` equals the planner `Codice` (verified 2026-10-12: every
 * planner station with an orariotreni entry matches by id; a handful of
 * orariotreni-only ids, e.g. 54 Castellammare Terme or 101 Bivio Botteghelle,
 * are not plannable and are ignored).
 *
 * Cached 24h with unstable_cache; on EAV failure the last good copy held in
 * memory is served with `stale: true`.
 */
import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import { eavGetText, eavPostJson, EavUpstreamError, ORARIOTRENI_BASE, PLANNER_BASE } from './client';
import { lineFromName, LINE_ORDER } from './lines';
import { normalizeStationName, prettifyName } from './names';
import type { LineKey, NetworkId, Station, StationsResponse } from './types';

const BACINI: NetworkId[] = [1, 2, 3, 4];

export const plannerStationSchema = z.object({
  Codice: z.number().int(),
  Descrizione: z.string(),
  Bacino: z.number().int(),
});
export type PlannerStation = z.infer<typeof plannerStationSchema>;

const localitaSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  idLocMoova: z.unknown().optional(),
  touchpoint: z.unknown().optional(),
  isMoova: z.union([z.string(), z.boolean()]).optional(),
  descrizione: z.string(),
  idLinea: z.string().optional(),
  linea: z.string().optional(),
});
export type Localita = z.infer<typeof localitaSchema>;

/** Internal cached shape: the public response plus a name → lines index. */
export interface StationsData extends StationsResponse {
  /** normalised station name (planner and orariotreni spellings) → lines. */
  lineIndex: Record<string, LineKey[]>;
}

/** Extract and validate the `data-localita` JSON embedded in orariotreni's homepage. */
export function parseLocalitaHtml(html: string): Localita[] {
  const m = /<script[^>]*id="data-localita"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new EavUpstreamError('data-localita not found on orariotreni homepage');
  let json: unknown;
  try {
    json = JSON.parse(m[1]);
  } catch {
    throw new EavUpstreamError('data-localita is not valid JSON');
  }
  const parsed = z.array(localitaSchema).safeParse(json);
  if (!parsed.success) throw new EavUpstreamError('data-localita did not match schema');
  return parsed.data;
}

const nonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';
const isTrue = (v: unknown) => v === true || (typeof v === 'string' && v.toLowerCase() === 'true');

function sortLines(lines: Iterable<LineKey>): LineKey[] {
  return [...new Set(lines)].sort((a, b) => LINE_ORDER.indexOf(a) - LINE_ORDER.indexOf(b));
}

/**
 * Pure merge of planner stations and data-localita entries.
 *
 * Board identifiers:
 *  - entry with isMoova "true" + idLocMoova → Moova board (ws_getData_moova.php),
 *    `{ codLoc: idLocMoova, touchpoint }`. The touchpoint may be missing
 *    (52 Stabia Scavi has `[]`): EAV's own page then sends it empty and the
 *    board still works;
 *  - entries with isMoova "false" (all Flegrea stations today) → the legacy PIS
 *    board (ws_getData_pis.php) keyed by station id: `{ codLoc: "<id>", touchpoint: "" }`;
 *  - isMoova "true" without idLocMoova (e.g. 520 Via Nocera) → no board.
 */
export function mergeStations(
  planner: PlannerStation[],
  localita: Localita[],
  updatedAt: string,
): StationsData {
  const byId = new Map<string, Localita[]>();
  for (const l of localita) {
    const list = byId.get(l.id) ?? [];
    list.push(l);
    byId.set(l.id, list);
  }

  const lineIndex: Record<string, LineKey[]> = {};
  const addToIndex = (name: string, lines: LineKey[]) => {
    if (!lines.length) return;
    const key = normalizeStationName(name);
    lineIndex[key] = sortLines([...(lineIndex[key] ?? []), ...lines]);
  };

  const seen = new Set<number>();
  const stations: Station[] = [];
  for (const p of planner) {
    if (seen.has(p.Codice)) continue;
    if (!BACINI.includes(p.Bacino as NetworkId)) continue;
    seen.add(p.Codice);

    const entries = byId.get(String(p.Codice)) ?? [];
    const lines = sortLines(entries.filter((e) => e.linea).map((e) => lineFromName(e.linea!)));

    let board: Station['board'];
    const moovaEntries = entries.filter((e) => isTrue(e.isMoova) && nonEmptyString(e.idLocMoova));
    // Prefer an entry that also carries a touchpoint.
    const moova = moovaEntries.find((e) => nonEmptyString(e.touchpoint)) ?? moovaEntries[0];
    if (moova) {
      board = {
        backend: 'moova',
        codLoc: moova.idLocMoova as string,
        touchpoint: nonEmptyString(moova.touchpoint) ? moova.touchpoint : '',
      };
    } else if (entries.length && entries.every((e) => !isTrue(e.isMoova))) {
      board = { backend: 'pis', codLoc: String(p.Codice), touchpoint: '' };
    }

    const name = prettifyName(p.Descrizione);
    const station: Station = { id: p.Codice, name, network: p.Bacino as NetworkId, lines };
    if (board) station.board = board;
    stations.push(station);

    addToIndex(name, lines);
    for (const e of entries) addToIndex(e.descrizione, lines);
  }

  stations.sort((a, b) => a.name.localeCompare(b.name, 'it'));
  return { stations, updatedAt, lineIndex };
}

async function fetchStationsData(): Promise<StationsData> {
  const [bacini, html] = await Promise.all([
    Promise.all(
      BACINI.map((id) =>
        eavPostJson(`${PLANNER_BASE}/Home/StazioniFromBacino`, { id: String(id) }, z.array(plannerStationSchema)),
      ),
    ),
    eavGetText(`${ORARIOTRENI_BASE}/`),
  ]);
  const planner = bacini.flat();
  if (planner.length === 0) throw new EavUpstreamError('EAV returned no stations');
  return mergeStations(planner, parseLocalitaHtml(html), new Date().toISOString());
}

const cachedStationsData = unstable_cache(fetchStationsData, ['eav-stations-v1'], {
  revalidate: 86_400,
  tags: ['eav-stations'],
});

let lastGood: StationsData | null = null;

/** Full internal data (with lineIndex). Throws EavUpstreamError if EAV is down and nothing is cached. */
export async function getStationsData(): Promise<StationsData> {
  try {
    const data = await cachedStationsData();
    lastGood = data;
    return data;
  } catch (err) {
    if (lastGood) return { ...lastGood, stale: true };
    throw err instanceof EavUpstreamError ? err : new EavUpstreamError('Unable to load stations');
  }
}

/** Public station list. */
export async function getStations(): Promise<StationsResponse> {
  const { stations, updatedAt, stale } = await getStationsData();
  return stale ? { stations, updatedAt, stale } : { stations, updatedAt };
}

export async function getStationById(id: number): Promise<Station | undefined> {
  const { stations } = await getStationsData();
  return stations.find((s) => s.id === id);
}
