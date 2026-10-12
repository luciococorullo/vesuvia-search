/**
 * GET /api/board?station=ID&type=departures|arrivals (default departures) → BoardResponse
 * 404 NOT_FOUND if the station is unknown or has no live board.
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getBoardEntries } from '@/lib/eav/board';
import { apiError, cdnCache, handleRouteError } from '@/lib/eav/http';
import { getStationsData } from '@/lib/eav/stations';
import type { BoardResponse } from '@/lib/eav/types';

export const dynamic = 'force-dynamic';

const querySchema = z.object({
  station: z.coerce.number().int().positive(),
  type: z.enum(['departures', 'arrivals']).default('departures'),
});

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const parsed = querySchema.safeParse({
    station: sp.get('station') ?? undefined,
    type: sp.get('type') ?? undefined,
  });
  if (!parsed.success) return apiError('BAD_REQUEST', 'Parametri non validi.');
  try {
    const { stations, lineIndex } = await getStationsData();
    const station = stations.find((s) => s.id === parsed.data.station);
    if (!station) return apiError('NOT_FOUND', 'Stazione non trovata.');
    if (!station.board) return apiError('NOT_FOUND', 'Tabellone non disponibile per questa stazione.');
    const entries = await getBoardEntries(station, parsed.data.type, lineIndex);
    return NextResponse.json<BoardResponse>(
      { stationId: station.id, type: parsed.data.type, entries, updatedAt: new Date().toISOString() },
      { headers: cdnCache(30, 30) },
    );
  } catch (err) {
    return handleRouteError('board', err);
  }
}
