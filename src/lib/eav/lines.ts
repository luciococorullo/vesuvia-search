import type { LineKey } from './types';

/**
 * Map any EAV line label to a LineKey. Accepts both spellings seen live:
 *  - orariotreni data-localita `linea`: "NAPOLI-SORRENTO", "NAPOLI-NOLA-BAIANO",
 *    "NAPOLI-SCAFATI-POGGIOMARINO", "NAPOLI-OTTAVIANO-SARNO",
 *    "NAPOLI-S.GIORGIO-TORRE", "CUMANA", "NAPOLI-POMIGLIANO", "CIRCUMFLEGREA",
 *    "SOCCAVO-MONTE S.ANGELO";
 *  - planner `DLinea`: "NAPOLI - SORRENTO", "NAPOLI - OTTAVIANO - SARNO",
 *    "NAPOLI - POGGIOMARINO VIA SCAFATI", "CUMANA", "CIRCUMFLEGREA",
 *    "PISCINOLA - AVERSA " (Metrocampania → 'other').
 * Planner numeric `Linea` ("1", "6"...) is not used: data-localita assigns L1
 * to both Sorrento and Torre lines, so numbers are ambiguous.
 */
export function lineFromName(raw: string): LineKey {
  const s = raw
    .toUpperCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Z]+/g, ' ')
    .trim();
  if (!s) return 'other';
  // Order matters: "TORREGAVETA" (Cumana) must not match the Torre line.
  if (/\bSORRENTO\b/.test(s)) return 'sorrento';
  if (/\bCIRCUMFLEGREA\b|\bLICOLA\b/.test(s)) return 'circumflegrea';
  if (/\bCUMANA\b|\bTORREGAVETA\b/.test(s)) return 'cumana';
  if (/\bSOCCAVO\b|\bMONTE S ANGELO\b|\bMONTE SANT ANGELO\b/.test(s)) return 'soccavo';
  if (/\bBAIANO\b/.test(s)) return 'baiano';
  if (/\bPOMIGLIANO\b/.test(s)) return 'pomigliano';
  if (/\bPOGGIOMARINO\b|\bSCAFATI\b/.test(s)) return 'poggiomarino';
  if (/\bSARNO\b/.test(s)) return 'sarno';
  if (/\bS GIORGIO\b|\bSAN GIORGIO\b|\bTORRE\b/.test(s)) return 'torre';
  return 'other';
}

export const LINE_COLORS: Record<LineKey, string> = {
  sorrento: '#D9572B',
  sarno: '#2E86AB',
  poggiomarino: '#7B5EA7',
  baiano: '#2E9E6B',
  torre: '#E0A100',
  pomigliano: '#5C6BC0',
  cumana: '#C2185B',
  circumflegrea: '#00838F',
  soccavo: '#6D4C41',
  other: '#7A6D63',
};

export const LINE_LABELS: Record<LineKey, string> = {
  sorrento: 'Napoli - Sorrento',
  sarno: 'Napoli - Sarno',
  poggiomarino: 'Napoli - Poggiomarino',
  baiano: 'Napoli - Baiano',
  torre: 'Napoli - Torre del Greco',
  pomigliano: 'Napoli - Pomigliano',
  cumana: 'Cumana',
  circumflegrea: 'Circumflegrea',
  soccavo: 'Soccavo - Monte S. Angelo',
  other: 'Altre linee',
};

/** Stable display order. */
export const LINE_ORDER: LineKey[] = [
  'sorrento',
  'sarno',
  'poggiomarino',
  'baiano',
  'torre',
  'pomigliano',
  'cumana',
  'circumflegrea',
  'soccavo',
  'other',
];
