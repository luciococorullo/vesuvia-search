"use client";

import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { hhmmToMinutes, romeWallClockToUtc } from "@/lib/eav/dates";
import type { Journey, JourneySearchRequest, JourneySearchResponse } from "@/lib/eav/types";
import { romeNow } from "@/lib/utils";
import { fetchJson } from "./fetcher";

/** "Earlier trains" searches this far back from the earliest train shown. */
const EARLIER_STEP_MIN = 60;
const STALE_MS = 60 * 1000;

const fetchJourneys = (req: JourneySearchRequest) =>
  fetchJson<JourneySearchResponse>("/api/journeys", { method: "POST", body: JSON.stringify(req) });

/** Depart-mode request starting at `ms` (Rome wall clock). */
function departFrom(base: JourneySearchRequest, ms: number, until?: string): JourneySearchRequest {
  return { fromId: base.fromId, toId: base.toId, ...romeNow(new Date(ms)), mode: "depart", until };
}

/**
 * Journey search plus "earlier / later trains". The user's request (depart or
 * arrive) is its own query, so its arrive-by picks and cross-network plan never
 * depend on the extra pages, which are plain depart-mode searches.
 */
export function useJourneys(req: JourneySearchRequest | null) {
  const q = useQuery({
    queryKey: ["journeys", req],
    queryFn: () => fetchJourneys(req!),
    enabled: !!req,
    staleTime: STALE_MS,
  });

  // Extra pages belong to one request: reset them when it changes.
  const key = JSON.stringify(req);
  const [extra, setExtra] = useState({ key, earlier: [] as JourneySearchRequest[], later: [] as JourneySearchRequest[] });
  const cur = extra.key === key ? extra : { key, earlier: [], later: [] };

  const pages = useQueries({
    queries: [...cur.earlier, ...cur.later].map((p) => ({
      queryKey: ["journeys", p],
      queryFn: () => fetchJourneys(p),
      staleTime: STALE_MS,
    })),
  });
  const earlierPages = pages.slice(0, cur.earlier.length);
  const laterPages = pages.slice(cur.earlier.length);
  const lastEarlier = earlierPages[earlierPages.length - 1];
  const lastLater = laterPages[laterPages.length - 1];

  const byId = new Map<string, Journey>();
  for (const p of [q.data, ...pages.map((x) => x.data)])
    for (const j of p?.journeys ?? []) if (!byId.has(j.id)) byId.set(j.id, j);
  const journeys = [...byId.values()].sort((a, b) => Date.parse(a.departure) - Date.parse(b.departure));

  const pageable = !!req && !!q.data && !q.data.crossNetwork && journeys.length > 0;
  // Retry a failed page instead of skipping past it.
  const fetchPreviousPage = () => {
    if (!req) return;
    if (lastEarlier?.isError) return void lastEarlier.refetch();
    // An empty earlier page moves the boundary back to where it searched from.
    const lastParam = cur.earlier[cur.earlier.length - 1];
    const boundaryMs =
      lastEarlier && !lastEarlier.data?.journeys.length && lastParam
        ? romeWallClockToUtc(lastParam.date, hhmmToMinutes(lastParam.time))
        : Date.parse(journeys[0].departure);
    const boundary = new Date(boundaryMs).toISOString();
    setExtra({ ...cur, earlier: [...cur.earlier, departFrom(req, boundaryMs - EARLIER_STEP_MIN * 60_000, boundary)] });
  };
  const fetchNextPage = () => {
    if (!req) return;
    if (lastLater?.isError) return void lastLater.refetch();
    const last = journeys[journeys.length - 1];
    setExtra({ ...cur, later: [...cur.later, departFrom(req, Date.parse(last.departure) + 60_000)] });
  };

  return {
    data: q.data,
    isLoading: q.isLoading,
    isError: q.isError,
    isSuccess: q.isSuccess,
    refetch: q.refetch,
    journeys,
    hasPreviousPage: pageable,
    hasNextPage: pageable && (!lastLater?.data || lastLater.data.journeys.length > 0),
    isFetchingPreviousPage: !!lastEarlier?.isFetching,
    isFetchingNextPage: !!lastLater?.isFetching,
    fetchPreviousPage,
    fetchNextPage,
  };
}
