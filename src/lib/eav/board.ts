/**
 * Live station boards from orariotreni.eavsrl.it/teleindicatori.
 *
 * Two backends, same HTML table format (rows `<tr class="testoGiallo">`):
 *  - ws_getData_moova.php (Vesuviana etc.): codLoc = idLocMoova + touchpoint
 *    (the touchpoint can be empty, e.g. Stabia Scavi);
 *  - ws_getData_pis.php (Flegrea): codLoc = station id, empty touchpoint.
 * The device name is "M01T<stationId>M" for both (as the EAV page sends it).
 *
 * Note: observed 2026-10-12, the Moova backend returns the same rows for
 * tipoLista=A and P at Napoli P. Garibaldi (only the header changes). We pass
 * the parameter through and show what EAV returns.
 */
import { eavPostText, ORARIOTRENI_BASE } from './client';
import { normalizeStationName, prettifyName } from './names';
import type { BoardEntry, BoardStop, LineKey, Station } from './types';

/** A parsed board row before line attribution. */
export type RawBoardEntry = Omit<BoardEntry, 'line'>;

const ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  agrave: 'à',
  egrave: 'è',
  eacute: 'é',
  igrave: 'ì',
  ograve: 'ò',
  ugrave: 'ù',
  Agrave: 'À',
  Egrave: 'È',
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, ent: string) => {
    if (ent[0] === '#') {
      const code = ent[1] === 'x' || ent[1] === 'X' ? parseInt(ent.slice(2), 16) : parseInt(ent.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[ent] ?? whole;
  });
}

const cleanText = (html: string) => decodeEntities(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Text content of the element carrying `class="<cls>"` (td or nested div). */
function cell(row: string, cls: string): string {
  const re = new RegExp(`class="${cls}"[^>]*>([\\s\\S]*?)</(?:td|div)>`);
  const m = re.exec(row);
  return m ? cleanText(m[1]) : '';
}

/** Parse "Ferma a: TORRE A.TA - OPLONTI (16:54), Villa Regina (16:57), ..." */
export function parseStops(info: string): BoardStop[] {
  const idx = info.toLowerCase().indexOf('ferma a:');
  if (idx === -1) return [];
  const list = info.slice(idx + 'ferma a:'.length);
  const stops: BoardStop[] = [];
  const re = /\s*,?\s*([^,()]+?)\s*\((\d{1,2}):(\d{2})\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(list))) {
    stops.push({ station: prettifyName(m[1]), time: `${m[2].padStart(2, '0')}:${m[3]}` });
  }
  return stops;
}

/** Pure HTML → rows parser. */
export function parseBoardHtml(html: string): RawBoardEntry[] {
  const entries: RawBoardEntry[] = [];
  const rowRe = /<tr[^>]*class="testoGiallo"[^>]*>([\s\S]*?)<\/tr>/g;
  let m: RegExpExecArray | null;
  while ((m = rowRe.exec(html))) {
    const row = m[1];
    const trainNumber = cell(row, 'numTreno').replace(/\s+/g, '');
    const time = cell(row, 'orario');
    if (!trainNumber || !/^\d{1,2}:\d{2}$/.test(time)) continue;

    const info = cell(row, 'informazioni');
    const delayRaw = cell(row, 'ritardo');
    const cancelled = /soppress/i.test(delayRaw) || /soppress/i.test(info);
    const delayNum = parseInt(delayRaw, 10);
    const platform = cell(row, 'binario');
    const category = cell(row, 'categoria');

    entries.push({
      trainNumber,
      category,
      endpoint: prettifyName(cell(row, 'destinazione')),
      time: time.padStart(5, '0'),
      delayMinutes: Number.isFinite(delayNum) && delayNum > 0 ? delayNum : 0,
      platform: platform || undefined,
      cancelled,
      stops: parseStops(info),
    });
  }
  return entries;
}

/**
 * Attribute a line to a board row: intersect the lines of this station, the
 * endpoint and every stop (names resolved via the normalised line index).
 * Unknown names are skipped; ambiguous results fall back to 'other'.
 */
export function attributeLine(
  stationLines: LineKey[],
  entry: RawBoardEntry,
  lineIndex: Record<string, LineKey[]>,
): LineKey {
  let candidates = new Set(stationLines);
  if (candidates.size === 1) return [...candidates][0];
  const names = [entry.endpoint, ...entry.stops.map((s) => s.station)];
  for (const name of names) {
    const lines = lineIndex[normalizeStationName(name)];
    if (!lines?.length) continue;
    const next = new Set([...candidates].filter((l) => lines.includes(l)));
    if (next.size === 0) continue;
    candidates = next;
    if (candidates.size === 1) break;
  }
  return candidates.size === 1 ? [...candidates][0] : 'other';
}

export async function fetchBoardHtml(station: Station, type: 'departures' | 'arrivals'): Promise<string> {
  if (!station.board) throw new Error('Station has no board');
  const { backend, codLoc, touchpoint } = station.board;
  const endpoint = backend === 'moova' ? 'ws_getData_moova.php' : 'ws_getData_pis.php';
  return eavPostText(`${ORARIOTRENI_BASE}/teleindicatori/${endpoint}`, {
    device: `M01T${station.id}M`,
    tipoLista: type === 'arrivals' ? 'A' : 'P',
    codLoc,
    touchpoint,
    visualizzazione: 'mobile',
  });
}

export async function getBoardEntries(
  station: Station,
  type: 'departures' | 'arrivals',
  lineIndex: Record<string, LineKey[]>,
): Promise<BoardEntry[]> {
  const html = await fetchBoardHtml(station, type);
  return parseBoardHtml(html).map((e) => ({ ...e, line: attributeLine(station.lines, e, lineIndex) }));
}
