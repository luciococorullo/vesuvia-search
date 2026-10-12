/**
 * GET /api/version → { buildId }
 * Lets an open (installed) app notice that a newer deployment is live.
 * NEXT_PUBLIC_BUILD_ID is inlined at build time (next.config.ts).
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    { buildId: process.env.NEXT_PUBLIC_BUILD_ID ?? null },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
