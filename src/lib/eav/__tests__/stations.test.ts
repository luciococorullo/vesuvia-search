import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { mergeStations, parseLocalitaHtml, plannerStationSchema } from '../stations';
import { resolveInterchange } from '../interchanges';
import { normalizeStationName } from '../names';

const read = (name: string) => readFileSync(join(__dirname, 'fixtures', name), 'utf8');
const planner = [1, 2, 3, 4].flatMap((i) => plannerStationSchema.array().parse(JSON.parse(read(`bacino${i}.json`))));
const localita = parseLocalitaHtml(read('orariotreni-home.html'));
const data = mergeStations(planner, localita, '2026-10-12T14:00:00.000Z');
const byId = (id: number) => data.stations.find((s) => s.id === id)!;

describe('mergeStations', () => {
  it('keeps all 161 planner stations with their network', () => {
    expect(localita).toHaveLength(184);
    expect(data.stations).toHaveLength(161);
    const count = (n: number) => data.stations.filter((s) => s.network === n).length;
    expect([count(1), count(2), count(3), count(4)]).toEqual([97, 28, 31, 5]);
    expect(new Set(data.stations.map((s) => s.id)).size).toBe(161);
  });

  it('collects every line serving a station and the Moova board', () => {
    const garibaldi = byId(3);
    expect(garibaldi.name).toBe('Napoli P. Garibaldi');
    expect(garibaldi.lines).toEqual(['sorrento', 'sarno', 'poggiomarino', 'baiano', 'torre', 'pomigliano']);
    expect(garibaldi.board).toEqual({ backend: 'moova', codLoc: 'TNPNTS00000000000040', touchpoint: 'TPOINT00000000000080' });
  });

  it('gives Flegrea stations a PIS board (empty touchpoint)', () => {
    const montesanto = byId(801);
    expect(montesanto.lines).toEqual(['cumana', 'circumflegrea']);
    expect(montesanto.board).toEqual({ backend: 'pis', codLoc: '801', touchpoint: '' });
  });

  it('gives Stabia Scavi a Moova board with an empty touchpoint', () => {
    expect(byId(52).board).toEqual({ backend: 'moova', codLoc: 'TNPNTS00000000008280', touchpoint: '' });
  });

  it('omits boards when EAV has no usable identifiers', () => {
    expect(byId(520).board).toBeUndefined(); // Via Nocera: isMoova but no idLocMoova
    expect(byId(701).board).toBeUndefined(); // Napoli Centrale RFI: not on orariotreni
    expect(byId(701).lines).toEqual([]);
  });

  it('prettifies all-lowercase planner names', () => {
    expect(byId(27).name).toBe('San Giorgio a Cremano');
  });

  it('indexes both planner and orariotreni spellings', () => {
    expect(data.lineIndex[normalizeStationName('NAPOLI PIAZZA GARIBALDI')]).toContain('sorrento');
    expect(data.lineIndex[normalizeStationName("SANT'AGNELLO")]).toEqual(['sorrento']);
    expect(data.lineIndex[normalizeStationName('LICOLA')]).toEqual(['circumflegrea']);
  });
});

describe('resolveInterchange', () => {
  it('resolves every network pair against the live list', () => {
    for (const a of [1, 2, 3, 4] as const) {
      for (const b of [1, 2, 3, 4] as const) {
        if (a === b) continue;
        const node = resolveInterchange(data.stations, a, b);
        expect(node, `${a}->${b}`).not.toBeNull();
        expect(node!.exit.network).toBe(a);
        expect(node!.entry.network).toBe(b);
      }
    }
    const v2f = resolveInterchange(data.stations, 1, 2)!;
    expect([v2f.exit.id, v2f.entry.id]).toEqual([3, 801]);
  });
});
