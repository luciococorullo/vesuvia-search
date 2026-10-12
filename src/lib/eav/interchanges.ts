/**
 * Cross-network interchanges.
 *
 * The EAV planner only routes inside one "bacino" (verified 2026-10-12:
 * DestinazioniFromStazione for 3 Garibaldi returns only the 97 Vesuviana
 * stations, for 801 Montesanto only the 28 Flegrea ones, for 711 Piscinola only
 * the 5 Metrocampania NordEst ones). There is no EAV station shared between
 * networks, so journeys across networks need an external transfer in Naples
 * (Metro, walking). This small hand-curated table lists one node pair per
 * network pair. Stations are referenced by NAME (normalised), not by id, and
 * resolved at runtime against the live station list; if a name disappears the
 * plan is simply not offered.
 *
 * Transfer minutes are deliberately generous (walk + wait + ride).
 */
import { normalizeStationName } from './names';
import type { NetworkId, Station } from './types';

interface InterchangeLink {
  a: { network: NetworkId; name: string };
  b: { network: NetworkId; name: string };
  minutes: number;
  /** Description written for the a→b direction; `descriptionBA` for the reverse. */
  descriptionAB: string;
  descriptionBA: string;
}

const GARIBALDI = 'Napoli P. Garibaldi';
const MONTESANTO = 'Montesanto';
const NAPOLI_CENTRALE = 'Napoli Centrale RFI';
const PISCINOLA = 'Piscinola Scampia';

export const INTERCHANGE_LINKS: InterchangeLink[] = [
  {
    a: { network: 1, name: GARIBALDI },
    b: { network: 2, name: MONTESANTO },
    minutes: 20,
    descriptionAB: 'Metro Linea 2 Napoli P. Garibaldi → Montesanto',
    descriptionBA: 'Metro Linea 2 Montesanto → Napoli P. Garibaldi',
  },
  {
    a: { network: 1, name: GARIBALDI },
    b: { network: 3, name: NAPOLI_CENTRALE },
    minutes: 10,
    descriptionAB: 'A piedi in Piazza Garibaldi: Circumvesuviana → Napoli Centrale',
    descriptionBA: 'A piedi in Piazza Garibaldi: Napoli Centrale → Circumvesuviana',
  },
  {
    a: { network: 1, name: GARIBALDI },
    b: { network: 4, name: PISCINOLA },
    minutes: 40,
    descriptionAB: 'Metro Linea 1 Garibaldi → Piscinola Scampia',
    descriptionBA: 'Metro Linea 1 Piscinola Scampia → Garibaldi',
  },
  {
    a: { network: 2, name: MONTESANTO },
    b: { network: 3, name: NAPOLI_CENTRALE },
    minutes: 20,
    descriptionAB: 'Metro Linea 2 Montesanto → Napoli P. Garibaldi (Napoli Centrale)',
    descriptionBA: 'Metro Linea 2 Napoli P. Garibaldi (Napoli Centrale) → Montesanto',
  },
  {
    a: { network: 2, name: MONTESANTO },
    b: { network: 4, name: PISCINOLA },
    minutes: 40,
    descriptionAB: 'A piedi fino a Dante, poi Metro Linea 1 Dante → Piscinola Scampia',
    descriptionBA: 'Metro Linea 1 Piscinola Scampia → Dante, poi a piedi fino a Montesanto',
  },
  {
    a: { network: 3, name: NAPOLI_CENTRALE },
    b: { network: 4, name: PISCINOLA },
    minutes: 40,
    descriptionAB: 'Metro Linea 1 Garibaldi → Piscinola Scampia',
    descriptionBA: 'Metro Linea 1 Piscinola Scampia → Garibaldi',
  },
];

export interface ResolvedInterchange {
  /** Station on the origin's network where the first leg ends. */
  exit: Station;
  /** Station on the destination's network where the second leg starts. */
  entry: Station;
  minutes: number;
  description: string;
}

function findByName(stations: Station[], network: NetworkId, name: string): Station | undefined {
  const key = normalizeStationName(name);
  return stations.find((s) => s.network === network && normalizeStationName(s.name) === key);
}

/** Resolve the interchange between two networks against the live station list. */
export function resolveInterchange(
  stations: Station[],
  fromNetwork: NetworkId,
  toNetwork: NetworkId,
): ResolvedInterchange | null {
  for (const link of INTERCHANGE_LINKS) {
    let exitRef, entryRef, description;
    if (link.a.network === fromNetwork && link.b.network === toNetwork) {
      [exitRef, entryRef, description] = [link.a, link.b, link.descriptionAB];
    } else if (link.b.network === fromNetwork && link.a.network === toNetwork) {
      [exitRef, entryRef, description] = [link.b, link.a, link.descriptionBA];
    } else continue;
    const exit = findByName(stations, exitRef.network, exitRef.name);
    const entry = findByName(stations, entryRef.network, entryRef.name);
    if (exit && entry) return { exit, entry, minutes: link.minutes, description };
  }
  return null;
}
