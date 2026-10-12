/**
 * GET /api/destinations?from=ID → { destinationIds: number[] }
 * Stations reachable from `from` according to the EAV planner. Same network
 * only: cross-network trips are still searchable via POST /api/journeys.
 */
import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import { apiError, cdnCache, handleRouteError } from '@/lib/eav/http';
import { fetchDestinationIds } from '@/lib/eav/planner';
import { getStationsData } from '@/lib/eav/stations';

export const dynamic = 'force-dynamic';

const querySchema = z.object({ from: z.coerce.number().int().positive() });

const cachedDestinations = unstable_cache(
  (fromId: number) => fetchDestinationIds(fromId),
  ['eav-destinations-v1'],
  { revalidate: 86_400, tags: ['eav-destinations'] },
);

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({ from: request.nextUrl.searchParams.get('from') ?? undefined });
  if (!parsed.success) return apiError('BAD_REQUEST', 'Parametro "from" non valido.');
  try {
    const { stations } = await getStationsData();
    const known = new Set(stations.map((s) => s.id));
    if (!known.has(parsed.data.from)) return apiError('NOT_FOUND', 'Stazione non trovata.');
    const ids = await cachedDestinations(parsed.data.from);
    return NextResponse.json(
      { destinationIds: ids.filter((id) => known.has(id)) },
      { headers: cdnCache(86_400, 604_800) },
    );
  } catch (err) {
    return handleRouteError('destinations', err);
  }
}
