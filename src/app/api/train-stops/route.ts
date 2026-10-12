/**
 * GET /api/train-stops?station=ID&train=NUM → { stops: BoardStop[] | null }
 * Stops after `station` for train NUM, read from that station's departures
 * board ("Ferma a: ..."). `null` when the train is not on the board (too far
 * in the future, already left) or the board lists no stops.
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBoardEntries } from '@/lib/eav/board';
import { apiError, cdnCache, handleRouteError } from '@/lib/eav/http';
import { getStationsData } from '@/lib/eav/stations';
import type { BoardStop } from '@/lib/eav/types';

export const dynamic = 'force-dynamic';

const querySchema = z.object({
  station: z.coerce.number().int().positive(),
  train: z.string().regex(/^\d{1,8}$/),
});

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const parsed = querySchema.safeParse({
    station: sp.get('station') ?? undefined,
    train: sp.get('train')?.trim() ?? undefined,
  });
  if (!parsed.success) return apiError('BAD_REQUEST', 'Parametri non validi.');
  try {
    const { stations, lineIndex } = await getStationsData();
    const station = stations.find((s) => s.id === parsed.data.station);
    if (!station) return apiError('NOT_FOUND', 'Stazione non trovata.');
    let stops: BoardStop[] | null = null;
    if (station.board) {
      const entries = await getBoardEntries(station, 'departures', lineIndex);
      const match = entries.find((e) => e.trainNumber === parsed.data.train);
      stops = match && match.stops.length ? match.stops : null;
    }
    return NextResponse.json({ stops }, { headers: cdnCache(30, 30) });
  } catch (err) {
    return handleRouteError('train-stops', err);
  }
}
