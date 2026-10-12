/**
 * POST /api/journeys  body: JourneySearchRequest → JourneySearchResponse
 * Same network: `journeys` filled. Different networks: `journeys: []` and
 * `crossNetwork` describes first leg + transfer + second leg.
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isValidYmd } from '@/lib/eav/dates';
import { apiError, handleRouteError } from '@/lib/eav/http';
import { searchJourneys } from '@/lib/eav/journeys';
import { getStationsData } from '@/lib/eav/stations';
import type { JourneySearchResponse } from '@/lib/eav/types';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  fromId: z.number().int().positive(),
  toId: z.number().int().positive(),
  date: z.string().refine(isValidYmd),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError('BAD_REQUEST', 'Body JSON non valido.');
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return apiError('BAD_REQUEST', 'Parametri di ricerca non validi.');
  if (parsed.data.fromId === parsed.data.toId) {
    return apiError('BAD_REQUEST', 'Partenza e arrivo coincidono.');
  }
  try {
    const { stations } = await getStationsData();
    const ids = new Set(stations.map((s) => s.id));
    if (!ids.has(parsed.data.fromId) || !ids.has(parsed.data.toId)) {
      return apiError('NOT_FOUND', 'Stazione non trovata.');
    }
    const result = await searchJourneys(parsed.data, stations);
    return NextResponse.json<JourneySearchResponse>(result, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (err) {
    return handleRouteError('journeys', err);
  }
}
