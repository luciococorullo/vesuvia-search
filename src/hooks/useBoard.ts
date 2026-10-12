"use client";

import { useQuery } from "@tanstack/react-query";
import type { BoardResponse } from "@/lib/eav/types";
import { fetchJson } from "./fetcher";

export type BoardType = BoardResponse["type"];

const REFRESH_MS = 30 * 1000;

/** Live board for a station; auto-refreshes every 30s while visible. 404 = station has no live board. */
export function useBoard(stationId: number | null, type: BoardType) {
  return useQuery({
    queryKey: ["board", stationId, type],
    queryFn: () =>
      fetchJson<BoardResponse>(`/api/board?station=${stationId}&type=${type}`),
    enabled: stationId != null,
    staleTime: REFRESH_MS / 2,
    refetchInterval: REFRESH_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    placeholderData: (prev, prevQuery) =>
      prevQuery?.queryKey[1] === stationId ? prev : undefined,
  });
}
