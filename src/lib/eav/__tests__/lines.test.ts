import { describe, expect, it } from 'vitest';
import { LINE_COLORS, LINE_LABELS, lineFromName } from '../lines';

describe('lineFromName', () => {
  it.each([
    ['NAPOLI-SORRENTO', 'sorrento'],
    ['NAPOLI-NOLA-BAIANO', 'baiano'],
    ['NAPOLI-SCAFATI-POGGIOMARINO', 'poggiomarino'],
    ['NAPOLI-OTTAVIANO-SARNO', 'sarno'],
    ['NAPOLI-S.GIORGIO-TORRE', 'torre'],
    ['CUMANA', 'cumana'],
    ['NAPOLI-POMIGLIANO', 'pomigliano'],
    ['CIRCUMFLEGREA', 'circumflegrea'],
    ['SOCCAVO-MONTE S.ANGELO', 'soccavo'],
    // planner DLinea spellings
    ['NAPOLI - SORRENTO', 'sorrento'],
    ['NAPOLI - OTTAVIANO - SARNO', 'sarno'],
    ['NAPOLI - POGGIOMARINO VIA SCAFATI', 'poggiomarino'],
    ['MONTESANTO - TORREGAVETA', 'cumana'],
    ['PISCINOLA - AVERSA ', 'other'],
    ['', 'other'],
  ])('%s → %s', (raw, key) => {
    expect(lineFromName(raw)).toBe(key);
  });

  it('has a colour and label for every key', () => {
    expect(Object.keys(LINE_COLORS).sort()).toEqual(Object.keys(LINE_LABELS).sort());
  });
});

import { prettifyName } from '../names';
describe('prettifyName', () => {
  it.each([
    ['TORRE A.TA - OPLONTI', 'Torre A.ta - Oplonti'],
    ['S.LEONARDO', 'S.Leonardo'],
    ["MADONNA DELL'ARCO", "Madonna dell'Arco"],
    ['Napoli P. Garibaldi', 'Napoli P. Garibaldi'],
  ])('%s → %s', (raw, out) => expect(prettifyName(raw)).toBe(out));
});
