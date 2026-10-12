/** Shared helpers for API route handlers. */
import { NextResponse } from 'next/server';
import { EavUpstreamError } from './client';
import type { ApiError } from './types';

const STATUS: Record<ApiError['code'], number> = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UPSTREAM: 502,
  INTERNAL: 500,
};

export function apiError(code: ApiError['code'], error: string): NextResponse<ApiError> {
  return NextResponse.json<ApiError>(
    { error, code },
    { status: STATUS[code], headers: { 'Cache-Control': 'no-store' } },
  );
}

/** Map any thrown error to a safe ApiError response (details only go to server logs). */
export function handleRouteError(route: string, err: unknown): NextResponse<ApiError> {
  if (err instanceof EavUpstreamError) {
    console.error(`[${route}] upstream: ${err.message}`);
    return apiError('UPSTREAM', 'Il servizio EAV non è raggiungibile. Riprova tra poco.');
  }
  console.error(`[${route}] internal:`, err instanceof Error ? err.message : 'unknown error');
  return apiError('INTERNAL', 'Errore interno. Riprova tra poco.');
}

/** Cache-Control for CDN caching with stale-while-revalidate. */
export function cdnCache(sMaxAge: number, swr: number = sMaxAge): Record<string, string> {
  return { 'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}` };
}
