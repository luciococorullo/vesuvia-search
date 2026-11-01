"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { hhmmToMinutes, romeWallClockToUtc } from "@/lib/eav/dates";
import type { Journey, JourneySearchRequest, JourneySearchResponse } from "@/lib/eav/types";
import { romeNow } from "@/lib/utils";
import { fetchJson } from "./fetcher";

/** "Earlier trains" searches this far back from the earliest train shown. */
const EARLIER_STEP_MIN = 60;

const startMs = (r: JourneySearchRequest) => romeWallClockToUtc(r.date, hhmmToMinutes(r.time));

/** Depart-mode request starting at `ms` (Rome wall clock). */
function departFrom(base: JourneySearchRequest, ms: number, until?: string): JourneySearchRequest {
  return { fromId: base.fromId, toId: base.toId, ...romeNow(new Date(ms)), mode: "depart", until };
}

/**
 * Journey search with paging both ways. The first page is the user's request
 * (depart or arrive); earlier/later pages are plain depart-mode searches, so
 * the arrive-by picks and cross-network plan always come from the first page.
 */
export function useJourneys(req: JourneySearchRequest | null) {
  const q = useInfiniteQuery({
    queryKey: ["journeys", req],
    queryFn: ({ pageParam }) =>
      fetchJson<JourneySearchResponse>("/api/journeys", {
        method: "POST",
        body: JSON.stringify(pageParam),
      }),
    initialPageParam: req as JourneySearchRequest,
    getNextPageParam: (last) => {
      const j = last.journeys[last.journeys.length - 1];
      if (!req || last.crossNetwork || !j) return undefined;
      return departFrom(req, Date.parse(j.departure) + 60_000);
    },
    getPreviousPageParam: (first, _all, firstParam) => {
      if (!req || first.crossNetwork) return undefined;
      // An empty initial page has nothing to page from; an empty earlier page
      // just moves the boundary back to where it searched from.
      const boundary = first.journeys[0]?.departure ?? (firstParam.until ? new Date(startMs(firstParam)).toISOString() : undefined);
      if (!boundary) return undefined;
      return departFrom(req, Date.parse(boundary) - EARLIER_STEP_MIN * 60_000, boundary);
    },
    enabled: !!req,
    staleTime: 60 * 1000,
  });

  const pages = q.data?.pages;
  const journeys = useMemo<Journey[]>(() => {
    const byId = new Map<string, Journey>();
    for (const p of pages ?? []) for (const j of p.journeys) if (!byId.has(j.id)) byId.set(j.id, j);
    return [...byId.values()].sort((a, b) => Date.parse(a.departure) - Date.parse(b.departure));
  }, [pages]);

  // The user's own request is the page fetched with the initial param.
  const key = JSON.stringify(req);
  const mainIdx = q.data?.pageParams.findIndex((p) => JSON.stringify(p) === key) ?? -1;
  const main = mainIdx >= 0 ? pages?.[mainIdx] : undefined;

  return { ...q, journeys, main };
}
