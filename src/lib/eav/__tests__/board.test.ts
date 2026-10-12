import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { attributeLine, parseBoardHtml, parseStops } from '../board';

const html = (name: string) => readFileSync(join(__dirname, 'fixtures', name), 'utf8');

describe('parseBoardHtml (Moova)', () => {
  const rows = parseBoardHtml(html('board-moova-departures.html'));

  it('parses every row, stripping &nbsp; from train numbers', () => {
    expect(rows).toHaveLength(6);
    expect(rows[0]).toMatchObject({
      trainNumber: '1148',
      category: 'DD',
      endpoint: 'Napoli Porta Nolana',
      time: '16:00',
      delayMinutes: 13,
      platform: '4',
      cancelled: false,
      stops: [],
    });
  });

  it('parses "Ferma a:" stops', () => {
    const sorrento = rows.find((r) => r.trainNumber === '1165')!;
    expect(sorrento.endpoint).toBe('Sorrento');
    expect(sorrento.delayMinutes).toBe(0);
    expect(sorrento.stops[0]).toEqual({ station: 'Torre A.ta - Oplonti', time: '16:54' });
    expect(sorrento.stops.at(-1)).toEqual({ station: 'S. Agnello', time: '17:38' });
    expect(sorrento.stops).toHaveLength(11);
  });
});

describe('parseBoardHtml (PIS / Flegrea)', () => {
  it('reads the destination nested in a div and empty platforms', () => {
    const rows = parseBoardHtml(html('board-pis-departures.html'));
    expect(rows).toHaveLength(4);
    expect(rows[0]).toMatchObject({ trainNumber: '5164', endpoint: 'Licola', time: '16:24', platform: '4' });
    expect(rows[3].platform).toBeUndefined();
  });
});

describe('cancellations and stops edge cases', () => {
  it('flags SOPPRESSO', () => {
    const row = `<tr class="testoGiallo"><td class="numTreno">&nbsp;123</td><td class="categoria">A</td>
      <td class="destinazione">SARNO</td><td class="informazioni"><marquee>TRENO SOPPRESSO</marquee></td>
      <td class="binario"></td><td class="orario">9:05</td><td class="ritardo">SOPPRESSO</td></tr>`;
    const [r] = parseBoardHtml(row);
    expect(r.cancelled).toBe(true);
    expect(r.time).toBe('09:05');
    expect(r.delayMinutes).toBe(0);
  });

  it('parseStops ignores text without the prefix', () => {
    expect(parseStops('CAMPANIA EXPRESS')).toEqual([]);
  });
});

describe('attributeLine', () => {
  const index = {
    sorrento: ['sorrento' as const],
    'torre a ta oplonti': ['sorrento' as const],
    licola: ['circumflegrea' as const],
    'napoli porta nolana': ['sorrento' as const, 'sarno' as const],
  };
  it('narrows multi-line stations using endpoint and stops', () => {
    const entry = { trainNumber: '1', category: 'A', endpoint: 'Sorrento', time: '10:00', delayMinutes: 0, cancelled: false, stops: [] };
    expect(attributeLine(['sorrento', 'sarno', 'torre'], entry, index)).toBe('sorrento');
    expect(attributeLine(['cumana', 'circumflegrea'], { ...entry, endpoint: 'Licola' }, index)).toBe('circumflegrea');
  });
  it('falls back to other when ambiguous', () => {
    const entry = { trainNumber: '1', category: 'A', endpoint: 'Napoli Porta Nolana', time: '10:00', delayMinutes: 0, cancelled: false, stops: [] };
    expect(attributeLine(['sorrento', 'sarno', 'torre'], entry, index)).toBe('other');
  });
  it('single-line stations need no lookup', () => {
    const entry = { trainNumber: '1', category: 'A', endpoint: 'X', time: '10:00', delayMinutes: 0, cancelled: false, stops: [] };
    expect(attributeLine(['soccavo'], entry, {})).toBe('soccavo');
  });
});
