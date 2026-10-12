/**
 * GET /api/stations → StationsResponse
 * All EAV stations (161 today) merged from the planner and orariotreni.
 */
import { NextResponse } from 'next/server';
import { cdnCache, handleRouteError } from '@/lib/eav/http';
import { getStations } from '@/lib/eav/stations';
import type { StationsResponse } from '@/lib/eav/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getStations();
    // Stale fallback data: let the CDN retry soon instead of pinning it for a day.
    const headers = data.stale ? cdnCache(60, 300) : cdnCache(86_400, 604_800);
    return NextResponse.json<StationsResponse>(data, { headers });
  } catch (err) {
    return handleRouteError('stations', err);
  }
}
