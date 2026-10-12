import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createResponseSchema, mapCreateResponse } from '../planner';
import { dotNet1900ToMinutes, parseDotNetDate } from '../dates';

const fixture = (name: string) =>
  createResponseSchema.parse(JSON.parse(readFileSync(join(__dirname, 'fixtures', name), 'utf8')));

describe('.NET dates', () => {
  it('parses /Date(ms)/ including negative 1900 values', () => {
    expect(parseDotNetDate('/Date(1791817680000)/')).toBe(1791817680000);
    expect(parseDotNetDate('/Date(-2208930900000)/')).toBe(-2208930900000);
    expect(parseDotNetDate('/Date(1791817680000+0200)/')).toBe(1791817680000);
    expect(() => parseDotNetDate('17:05')).toThrow();
  });

  it('decodes 1900 wall-clock values at +01:00 (no LMT artefacts)', () => {
    expect(dotNet1900ToMinutes('/Date(-2208930900000)/')).toBe(17 * 60 + 5);
    // offset fields spill into 1899-12-31 UTC: 00:03 → 3 minutes
    expect(dotNet1900ToMinutes('/Date(-2208992220000)/')).toBe(3);
    expect(dotNet1900ToMinutes('/Date(-2208990090000)/')).toBe(38.5);
  });
});

describe('mapCreateResponse', () => {
  it('maps a direct journey with boarding offset (1171 departs Garibaldi 17:08, not 17:05)', () => {
    const journeys = mapCreateResponse(fixture('create-garibaldi-sorrento.json'), '2026-10-12', '17:00');
    expect(journeys).toHaveLength(2);
    const j = journeys[0];
    expect(j.departure).toBe('2026-10-12T17:08:00+02:00');
    expect(j.arrival).toBe('2026-10-12T18:17:00+02:00');
    expect(j.durationMinutes).toBe(69);
    expect(j.changes).toBe(0);
    expect(j.from).toBe('Napoli P. Garibaldi');
    expect(j.to).toBe('Sorrento');
    expect(j.legs[0]).toMatchObject({
      trainNumber: '1171',
      lineName: 'NAPOLI - SORRENTO',
      line: 'sorrento',
      category: 'DD',
      delayMinutes: 0,
      cancelled: false,
    });
  });

  it('anchors on the requested date, not the run-level date echoed by EAV', () => {
    const journeys = mapCreateResponse(fixture('create-garibaldi-sorrento.json'), '2026-10-18', '17:00');
    expect(journeys[0].departure).toBe('2026-10-18T17:08:00+02:00');
  });

  it('maps a journey with a change and half-minute offsets', () => {
    const journeys = mapCreateResponse(fixture('create-sorrento-ottaviano-change.json'), '2026-10-13', '08:00');
    const j = journeys[0];
    expect(j.changes).toBe(1);
    expect(j.legs.map((l) => l.trainNumber)).toEqual(['1082', '6093']);
    expect(j.legs.map((l) => l.line)).toEqual(['sorrento', 'sarno']);
    expect(j.legs[0].departure).toBe('2026-10-13T08:14:00+02:00');
    expect(j.legs[0].arrival).toBe('2026-10-13T09:23:00+02:00');
    expect(j.legs[1].departure).toBe('2026-10-13T09:24:00+02:00');
    expect(j.legs[1].arrival).toBe('2026-10-13T10:00:00+02:00');
    expect(j.durationMinutes).toBe(106);
  });

  it('rolls over midnight and maps delay/cancellation', () => {
    const t = (hh: number, mm: number) => `/Date(${Date.UTC(1900, 0, 1, hh - 1, mm)})/`;
    const off = (min: number) => `/Date(${Date.UTC(1900, 0, 1, -1, min)})/`;
    const journeys = mapCreateResponse(
      {
        CorsePercorso: [
          {
            Descrizione_origine: 'A',
            Descrizione_destinazione: 'C',
            partenza: null,
            arrivo: null,
            percorsi: [
              {
                codice: 1, DLinea: 'CUMANA', tipologia: 'A', ritardo: 4, soppressa: false,
                Descrizione_origine: 'A', Descrizione_destinazione: 'B',
                partenza: t(23, 40), arrivo: t(23, 59), partenzaOrigine: off(0), arrivoDestinazione: off(15),
              },
              {
                codice: 2, DLinea: 'CUMANA', tipologia: 'A', ritardo: 0, soppressa: true,
                Descrizione_origine: 'B', Descrizione_destinazione: 'C',
                partenza: t(0, 5), arrivo: t(0, 30), partenzaOrigine: off(0), arrivoDestinazione: off(25),
              },
            ],
          },
        ],
      },
      '2026-03-28',
      '23:30',
    );
    const j = journeys[0];
    expect(j.legs[0].departure).toBe('2026-03-28T23:40:00+01:00');
    expect(j.legs[1].departure).toBe('2026-03-29T00:05:00+01:00');
    expect(j.arrival).toBe('2026-03-29T00:30:00+01:00');
    expect(j.durationMinutes).toBe(50);
    expect(j.delayMinutes).toBe(4);
    expect(j.cancelled).toBe(true);
  });

  it('handles a first train after midnight for a late search', () => {
    const t = (hh: number, mm: number) => `/Date(${Date.UTC(1900, 0, 1, hh - 1, mm)})/`;
    const journeys = mapCreateResponse(
      {
        CorsePercorso: [
          {
            percorsi: [{ codice: 9, partenza: t(0, 10), arrivo: t(0, 50) }],
          },
        ],
      },
      '2026-10-12',
      '23:45',
    );
    expect(journeys[0].departure).toBe('2026-10-13T00:10:00+02:00');
    expect(journeys[0].arrival).toBe('2026-10-13T00:50:00+02:00');
  });

  it('returns [] for empty responses', () => {
    expect(mapCreateResponse({ CorsePercorso: [] }, '2026-10-12', '10:00')).toEqual([]);
    expect(mapCreateResponse({}, '2026-10-12', '10:00')).toEqual([]);
  });
});
