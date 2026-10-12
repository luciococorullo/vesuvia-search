import { describe, expect, it } from 'vitest';
import type { Station } from '../../eav/types';
import {
  buildIndex,
  expandVariants,
  highlightRanges,
  normalize,
  searchIndex,
  searchIndexScored,
  searchStations,
  MatchTier,
} from '../index';
import fixture from './fixtures/stations.json';

const stations = fixture as Station[];
const index = buildIndex(stations);
const names = (q: string, limit = 8) => searchIndex(index, q, limit).map((s) => s.name);
const top = (q: string) => names(q, 1)[0];

describe('normalize', () => {
  it('lowercases, strips accents and punctuation', () => {
    expect(normalize("  Sant'Agnello  ")).toBe('sant agnello');
    expect(normalize('Portici Via Liberta\'')).toBe('portici via liberta');
    expect(normalize('Afragola Alta Velocità')).toBe('afragola alta velocita');
    expect(normalize('S.Giorgio   a  Cremano')).toBe('s giorgio a cremano');
  });
});

describe('expandVariants', () => {
  it('expands saint abbreviations', () => {
    const v = expandVariants('S. Agnello');
    expect(v[0]).toBe('s agnello');
    expect(v).toEqual(expect.arrayContaining(['sant agnello', 'san agnello', 'santa agnello']));
  });
  it('expands p. to piazza and drops noise tokens', () => {
    expect(expandVariants('Napoli P. Garibaldi')).toContain('napoli piazza garibaldi');
    expect(expandVariants('Castellammare di Stabia')).toContain('castellammare stabia');
    expect(expandVariants('Caserta RFI')).toContain('caserta');
  });
  it('expands p.zza and c.so', () => {
    expect(expandVariants('P.zza Leopardi')).toContain('piazza leopardi');
    expect(expandVariants('C.so Umberto')).toContain('corso umberto');
  });
});

describe('searchStations (real EAV names)', () => {
  it.each(["sant'agnello", 'santagnello', 's agnello', 'S.Agnello', 'Sant Agnello', 'SANT’AGNELLO'])(
    '%s → S. Agnello',
    (q) => {
      expect(top(q)).toBe('S. Agnello');
    },
  );

  it('san giorgio → both San Giorgio stations, San Giorgio a Cremano included', () => {
    const r = names('san giorgio');
    expect(r).toContain('san giorgio a cremano');
    expect(r).toContain('S. Giorgio Cavalli di Bronzo');
  });

  it('garibaldi / piazza garibaldi → Napoli P. Garibaldi first', () => {
    expect(top('garibaldi')).toBe('Napoli P. Garibaldi');
    expect(top('piazza garibaldi')).toBe('Napoli P. Garibaldi');
    expect(top('p. garibaldi')).toBe('Napoli P. Garibaldi');
  });

  it('pompei returns both Pompei stations on top', () => {
    const r = names('pompei', 2);
    expect(r.sort()).toEqual(['Pompei Santuario', 'Pompei Scavi Villa dei Misteri']);
  });

  it('scavi ercolano → Ercolano Scavi (any word order)', () => {
    expect(top('scavi ercolano')).toBe('Ercolano Scavi');
    expect(top('scavi di ercolano')).toBe('Ercolano Scavi');
  });

  it('sorento (typo) → Sorrento', () => {
    expect(top('sorento')).toBe('Sorrento');
    expect(top('sorreto')).toBe('Sorrento');
  });

  it('castellammare → Castellammare di Stabia', () => {
    expect(top('castellammare')).toBe('Castellammare di Stabia');
    expect(top('castelammare')).toBe('Castellammare di Stabia');
  });

  it('montesanto → Montesanto', () => {
    expect(top('montesanto')).toBe('Montesanto');
  });

  it('porta nolana, herculaneum, oplonti, piano di sorrento', () => {
    expect(top('porta nolana')).toBe('Napoli Porta Nolana');
    expect(top('herculaneum')).toBe('Ercolano Scavi');
    expect(top('oplonti')).toBe('Torre Annunziata - Oplonti');
    expect(top('piano di sorrento')).toBe('Piano');
  });

  it('accents and case are ignored', () => {
    expect(top('MONTESANTÒ')).toBe('Montesanto');
    expect(top('Pòzzuoli')).toBe('Pozzuoli');
  });

  it('empty / whitespace / punctuation-only query → []', () => {
    expect(searchStations('', stations)).toEqual([]);
    expect(searchStations('   ', stations)).toEqual([]);
    expect(searchStations("'.", stations)).toEqual([]);
  });

  it('respects limit', () => {
    expect(searchStations('a', stations, 3)).toHaveLength(3);
  });

  it('memoized searchStations equals searchIndex', () => {
    expect(searchStations('torre', stations).map((s) => s.name)).toEqual(names('torre'));
  });
});

describe('ranking', () => {
  it('exact > prefix > token-prefix > substring > fuzzy', () => {
    const tierOf = (q: string, name: string) =>
      searchIndexScored(index, q, 200).find((h) => h.station.name === name)?.tier;
    expect(tierOf('sorrento', 'Sorrento')).toBe(MatchTier.Exact);
    expect(tierOf('sorr', 'Sorrento')).toBe(MatchTier.Prefix);
    expect(tierOf('scavi villa pompei', 'Pompei Scavi Villa dei Misteri')).toBe(MatchTier.TokenPrefix);
    expect(tierOf('cremano', 'san giorgio a cremano')).toBe(MatchTier.Prefix);
    expect(tierOf('santo', 'Montesanto')).toBe(MatchTier.Substring);
    expect(tierOf('sorento', 'Sorrento')).toBe(MatchTier.Fuzzy);
  });

  it('exact match beats prefix matches of longer names', () => {
    const r = names('quarto');
    expect(r.slice(0, 3)).toEqual(['Quarto', 'Quarto Centro', 'Quarto Officina']);
  });

  it('ties broken by shorter name then alphabetical', () => {
    const r = names('aversa');
    expect(r[0]).toBe('Aversa');
    expect(r.indexOf('Aversa RFI')).toBeLessThan(r.indexOf('Aversa Ippodromo'));
  });

  it('word-prefix matches rank above substring matches', () => {
    const r = searchIndexScored(index, 'santo', 50);
    const tiers = r.map((h) => h.tier);
    expect([...tiers].sort((a, b) => a - b)).toEqual(tiers);
    expect(r.findIndex((h) => h.station.name === 'Montesanto')).toBeGreaterThan(0);
  });

  it('short tokens are not fuzzy-matched', () => {
    expect(names('xyz')).toEqual([]);
  });
});

describe('highlightRanges', () => {
  it('highlights a word-prefix match in the original string', () => {
    const name = 'Napoli P. Garibaldi';
    const [[s, e]] = highlightRanges(name, 'gari');
    expect(name.slice(s, e)).toBe('Gari');
  });
  it('highlights multiple tokens in any order', () => {
    const name = 'Ercolano Scavi';
    const r = highlightRanges(name, 'scavi erc').map(([s, e]) => name.slice(s, e));
    expect(r).toEqual(['Erc', 'Scavi']);
  });
  it('maps through apostrophes', () => {
    const name = "Pomigliano d'Arco";
    const r = highlightRanges(name, "d'arco").map(([s, e]) => name.slice(s, e));
    expect(r).toEqual(["d'Arco"]);
  });
  it('returns [] for empty query or alias-only match', () => {
    expect(highlightRanges('Sorrento', '')).toEqual([]);
    expect(highlightRanges('Ercolano Scavi', 'herculaneum')).toEqual([]);
  });
});

describe('typo fallback', () => {
  it('hides typo matches when real matches exist', () => {
    const r = names('torre');
    expect(r.length).toBeGreaterThan(0);
    expect(r).not.toContain('Sorrento');
  });
});
