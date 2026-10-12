/**
 * Text normalisation + search-key generation for EAV station names.
 * Pure functions, no deps, browser-safe.
 */

const DIACRITICS = /[̀-ͯ]/g;

/** Lowercase, strip diacritics, turn apostrophes/punctuation into spaces, collapse spaces. */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Remove all spaces from an already-normalized string. */
export function compact(normalized: string): string {
  return normalized.replace(/ /g, '');
}

/**
 * Tokens that carry little meaning: kept in the primary keys (so exact matches
 * still work) but also dropped in an extra key so users can omit them.
 */
export const NOISE_TOKENS: ReadonlySet<string> = new Set([
  'rfi',
  'fs',
  'stazione',
  'staz',
  'di',
  'del',
  'della',
  'dell',
  'dello',
  'dei',
  'delle',
  'degli',
  'd',
  'a',
  'in',
]);

const SAINT_FORMS = ['s', 'san', 'sant', 'santa', 'santo'];
const SAINT_SET = new Set(SAINT_FORMS);

/** Alternatives for a single normalized token (always includes the token itself first). */
function tokenAlternatives(tok: string): string[] {
  if (SAINT_SET.has(tok)) return [tok, ...SAINT_FORMS.filter((f) => f !== tok)];
  switch (tok) {
    case 'ss':
      return ['ss', 'santissimo', 'santi'];
    case 'p':
      return ['p', 'piazza'];
    case 'pza':
    case 'pzza':
      return [tok, 'piazza'];
    case 'v':
      return ['v', 'via'];
    case 'staz':
      return ['staz', 'stazione'];
    default:
      return [tok];
  }
}

/** Rewrites dotted abbreviations that would otherwise be split into meaningless pieces. */
function preExpand(s: string): string {
  return s
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/\bp\s*\.\s*z?za\b/g, ' piazza ')
    .replace(/\bc\s*\.\s*so\b/g, ' corso ')
    .replace(/\bv\s*\.\s*le\b/g, ' viale ');
}

const MAX_VARIANTS = 64;

/**
 * Produce normalized search keys for a station name:
 * - the plain normalized name (first element),
 * - abbreviation expansions (s./san/sant/santa/santo, ss., p./p.zza → piazza, v. → via, c.so → corso, staz. → stazione),
 * - each of the above with noise tokens (rfi, di, del, ...) removed.
 * Joined forms ("santagnello") are matched via the compact (space-less) key, see `compact`.
 */
export function expandVariants(name: string): string[] {
  const base = normalize(name);
  const out = new Set<string>();
  if (!base) return [];
  out.add(base);

  const tokens = normalize(preExpand(name)).split(' ');
  let combos: string[][] = [[]];
  for (const tok of tokens) {
    const alts = tokenAlternatives(tok);
    const next: string[][] = [];
    for (const c of combos) {
      for (const a of alts) {
        if (next.length >= MAX_VARIANTS) break;
        next.push([...c, a]);
      }
    }
    combos = next;
  }

  for (const c of combos) {
    out.add(c.join(' '));
    const stripped = c.filter((t) => !NOISE_TOKENS.has(t));
    if (stripped.length > 0 && stripped.length < c.length) out.add(stripped.join(' '));
  }
  return Array.from(out);
}
