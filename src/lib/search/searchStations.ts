import type { Station } from '../eav/types';
import { STATION_ALIASES } from './aliases';
import { compact, expandVariants, normalize, NOISE_TOKENS } from './normalize';

/** Match tiers, lower is better. */
export const MatchTier = {
  Exact: 0,
  Prefix: 1,
  TokenPrefix: 2,
  Substring: 3,
  Fuzzy: 4,
} as const;
export type MatchTier = (typeof MatchTier)[keyof typeof MatchTier];

interface IndexKey {
  /** Normalized key, e.g. "napoli piazza garibaldi". */
  text: string;
  words: string[];
  /** Space-less key, e.g. "napolipiazzagaribaldi". */
  compact: string;
  /** Compact suffixes starting at each word boundary ("piazzagaribaldi", "garibaldi"). */
  compactFromWord: string[];
  /** true when the key comes from the curated alias table rather than the EAV name. */
  alias: boolean;
}

interface IndexEntry {
  station: Station;
  keys: IndexKey[];
  /** Distinct words of name-derived keys / of all keys (for fuzzy matching). */
  nameWords: string[];
  allWords: string[];
  sortName: string;
}

export interface StationIndex {
  entries: IndexEntry[];
}

function makeKey(text: string, alias: boolean): IndexKey {
  const words = text.split(' ');
  const compactFromWord: string[] = [];
  for (let i = 0; i < words.length; i++) compactFromWord.push(words.slice(i).join(''));
  return { text, words, compact: compact(text), compactFromWord, alias };
}

/** Build a search index once; reuse it across keystrokes. */
export function buildIndex(stations: readonly Station[]): StationIndex {
  const entries: IndexEntry[] = stations.map((station) => {
    const nameTexts = new Set(expandVariants(station.name));
    const aliasTexts = new Set<string>();
    for (const alias of STATION_ALIASES[normalize(station.name)] ?? []) {
      const a = normalize(alias);
      if (!a) continue;
      aliasTexts.add(a);
      const stripped = a
        .split(' ')
        .filter((t) => !NOISE_TOKENS.has(t))
        .join(' ');
      if (stripped) aliasTexts.add(stripped);
    }
    const keys = [
      ...Array.from(nameTexts).map((t) => makeKey(t, false)),
      ...Array.from(aliasTexts)
        .filter((t) => !nameTexts.has(t))
        .map((t) => makeKey(t, true)),
    ];
    const uniqWords = (ks: IndexKey[]) => Array.from(new Set(ks.flatMap((k) => k.words)));
    return {
      station,
      keys,
      nameWords: uniqWords(keys.filter((k) => !k.alias)),
      allWords: uniqWords(keys),
      sortName: station.name.trim(),
    };
  });
  return { entries };
}

/** Optimal-string-alignment Damerau-Levenshtein distance, early exit above `max`. */
export function damerauLevenshtein(a: string, b: string, max = Infinity): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const n = a.length;
  const m = b.length;
  if (n === 0) return m;
  if (m === 0) return n;
  let prev2 = new Array<number>(m + 1).fill(0);
  let prev = new Array<number>(m + 1);
  let cur = new Array<number>(m + 1);
  for (let j = 0; j <= m; j++) prev[j] = j;
  for (let i = 1; i <= n; i++) {
    cur[0] = i;
    let rowMin = cur[0];
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, prev2[j - 2] + 1);
      }
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    [prev2, prev, cur] = [prev, cur, prev2];
  }
  return prev[m];
}

function fuzzyThreshold(len: number): number {
  if (len >= 7) return 2;
  if (len >= 4) return 1;
  return 0;
}

interface ParsedQuery {
  text: string;
  compact: string;
  tokens: string[];
  /** Tokens without noise words (falls back to all tokens if everything is noise). */
  significant: string[];
}

function parseQuery(query: string): ParsedQuery | null {
  const text = normalize(query);
  if (!text) return null;
  const tokens = text.split(' ');
  const sig = tokens.filter((t) => !NOISE_TOKENS.has(t));
  return { text, compact: compact(text), tokens, significant: sig.length ? sig : tokens };
}

/** Smallest edit distance between `token` and any word (or word prefix); null if above threshold. */
function tokenFuzzyDistance(token: string, words: readonly string[]): number | null {
  const max = fuzzyThreshold(token.length);
  let best: number | null = null;
  for (const w of words) {
    if (w.startsWith(token)) return 0;
    if (max === 0) continue;
    let d = damerauLevenshtein(token, w, max);
    // Partially typed word with a typo: compare against the word's prefix.
    if (w.length > token.length) d = Math.min(d, damerauLevenshtein(token, w.slice(0, token.length), max));
    if (d <= max && (best === null || d < best)) best = d;
  }
  return best;
}

function totalFuzzyDistance(tokens: readonly string[], words: readonly string[]): number | null {
  let total = 0;
  for (const t of tokens) {
    const d = tokenFuzzyDistance(t, words);
    if (d === null) return null;
    total += d;
  }
  return total;
}

interface Score {
  tier: MatchTier;
  /** Secondary ordering within a tier (lower is better): edit distance, alias-only matches. */
  penalty: number;
}

function keyTier(key: IndexKey, q: ParsedQuery): MatchTier | null {
  if (key.text === q.text || key.compact === q.compact) return MatchTier.Exact;
  for (let i = 0; i < key.words.length; i++) {
    if (key.compactFromWord[i].startsWith(q.compact)) return MatchTier.Prefix;
  }
  if (q.significant.every((t) => key.words.some((w) => w.startsWith(t)))) return MatchTier.TokenPrefix;
  if (key.text.includes(q.text) || (q.compact.length >= 3 && key.compact.includes(q.compact))) {
    return MatchTier.Substring;
  }
  return null;
}

function scoreEntry(entry: IndexEntry, q: ParsedQuery): Score | null {
  let best: Score | null = null;
  for (const key of entry.keys) {
    const tier = keyTier(key, q);
    if (tier === null) continue;
    const penalty = key.alias ? 1 : 0;
    if (best === null || tier < best.tier || (tier === best.tier && penalty < best.penalty)) {
      best = { tier, penalty };
      if (tier === MatchTier.Exact && penalty === 0) break;
    }
  }
  if (best) return best;

  const dName = totalFuzzyDistance(q.significant, entry.nameWords);
  const dAll = dName === null ? totalFuzzyDistance(q.significant, entry.allWords) : null;
  if (dName !== null) return { tier: MatchTier.Fuzzy, penalty: dName * 2 };
  if (dAll !== null) return { tier: MatchTier.Fuzzy, penalty: dAll * 2 + 1 };
  return null;
}

export interface ScoredStation {
  station: Station;
  tier: MatchTier;
}

/** Search a prebuilt index, returning matches with their tier (best first). */
export function searchIndexScored(index: StationIndex, query: string, limit = 8): ScoredStation[] {
  const q = parseQuery(query);
  if (!q || limit <= 0) return [];
  const hits: { entry: IndexEntry; tier: MatchTier; penalty: number }[] = [];
  for (const entry of index.entries) {
    const score = scoreEntry(entry, q);
    if (score !== null) hits.push({ entry, ...score });
  }
  hits.sort(
    (a, b) =>
      a.tier - b.tier ||
      a.penalty - b.penalty ||
      a.entry.sortName.length - b.entry.sortName.length ||
      a.entry.sortName.localeCompare(b.entry.sortName, 'it'),
  );
  // Typo matches are only a fallback: "torre" must not suggest "Sorrento" next to real hits.
  const best = hits.length > 0 ? hits[0].tier : MatchTier.Fuzzy;
  const shown = best < MatchTier.Fuzzy ? hits.filter((h) => h.tier < MatchTier.Fuzzy) : hits;
  return shown.slice(0, limit).map((h) => ({ station: h.entry.station, tier: h.tier }));
}

/** Search a prebuilt index. */
export function searchIndex(index: StationIndex, query: string, limit = 8): Station[] {
  return searchIndexScored(index, query, limit).map((h) => h.station);
}

const indexCache = new WeakMap<readonly Station[], StationIndex>();

/** Convenience wrapper: memoizes the index per `stations` array identity. */
export function searchStations(query: string, stations: readonly Station[], limit = 8): Station[] {
  let index = indexCache.get(stations);
  if (!index) {
    index = buildIndex(stations);
    indexCache.set(stations, index);
  }
  return searchIndex(index, query, limit);
}

/**
 * Best-effort highlight ranges ([start, end) offsets into `name`) for query tokens that
 * match the start of a word in the name. Alias-only matches yield [].
 */
export function highlightRanges(name: string, query: string): [number, number][] {
  const q = parseQuery(query);
  if (!q) return [];

  // Normalize `name` char by char, keeping a map back to original offsets.
  let norm = '';
  const map: number[] = [];
  let lastSpace = true;
  for (let i = 0; i < name.length; i++) {
    const c = name[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    for (const ch of c) {
      if (/[a-z0-9]/.test(ch)) {
        norm += ch;
        map.push(i);
        lastSpace = false;
      } else if (!lastSpace) {
        norm += ' ';
        map.push(i);
        lastSpace = true;
      }
    }
  }

  const ranges: [number, number][] = [];
  const addRange = (start: number, len: number) => {
    if (len <= 0) return;
    ranges.push([map[start], map[start + len - 1] + 1]);
  };

  // Whole query as a phrase at a word boundary first.
  let phraseFound = false;
  for (let i = 0; i < norm.length; i++) {
    if ((i === 0 || norm[i - 1] === ' ') && norm.startsWith(q.text, i)) {
      addRange(i, q.text.length);
      phraseFound = true;
      break;
    }
  }
  if (!phraseFound) {
    for (const t of q.tokens) {
      for (let i = 0; i < norm.length; i++) {
        if ((i === 0 || norm[i - 1] === ' ') && norm.startsWith(t, i)) {
          addRange(i, t.length);
          break;
        }
      }
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([r[0], r[1]]);
  }
  return merged;
}
