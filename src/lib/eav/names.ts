/**
 * Station-name normalisation. EAV spells the same station differently across
 * systems ("Napoli P. Garibaldi" in the planner, "NAPOLI PIAZZA GARIBALDI" in
 * data-localita, "S. Agnello" vs "SANT'AGNELLO"), so matching is done on a
 * normalised key, never on raw strings.
 */
export function normalizeStationName(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => {
      if (w === 'san' || w === 'santa' || w === 'sant' || w === 'santo') return 's';
      if (w === 'piazza') return 'p';
      return w;
    })
    .join(' ');
}

/** Title-case strings EAV writes in ALL CAPS or all lowercase; leave mixed case alone. */
export function prettifyName(raw: string): string {
  const s = raw.replace(/\s+/g, ' ').trim();
  if (s !== s.toUpperCase() && s !== s.toLowerCase()) return s;
  const titled = s.toLowerCase().replace(/(?<=^|[\s\-'(/]|(?:^|\s)s\.)\p{L}/gu, (c) => c.toUpperCase());
  return titled
    .split(' ')
    .map((w, i) => {
      if (i === 0) return w;
      if (SMALL_WORDS.has(w.toLowerCase())) return w.toLowerCase();
      const apo = w.indexOf("'");
      if (apo > 0 && SMALL_WORDS.has(w.slice(0, apo).toLowerCase())) {
        return w.slice(0, apo).toLowerCase() + w.slice(apo);
      }
      return w;
    })
    .join(' ');
}

const SMALL_WORDS = new Set(['a', 'di', 'del', 'della', 'dei', 'delle', 'dell', 'in', 'e']);
