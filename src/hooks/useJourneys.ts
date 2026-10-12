"use client";

import { useQuery } from "@tanstack/react-query";
import type { JourneySearchRequest, JourneySearchResponse } from "@/lib/eav/types";
import { fetchJson } from "./fetcher";

export function useJourneys(req: JourneySearchRequest | null) {
  return useQuery({
    queryKey: ["journeys", req],
    queryFn: () =>
      fetchJson<JourneySearchResponse>("/api/journeys", {
        method: "POST",
        body: JSON.stringify(req),
      }),
    enabled: !!req,
    staleTime: 60 * 1000,
  });
}
