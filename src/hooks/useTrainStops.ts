"use client";

import { useQuery } from "@tanstack/react-query";
import type { BoardStop } from "@/lib/eav/types";
import { fetchJson } from "./fetcher";

interface TrainStopsResponse {
  stops: BoardStop[] | null;
}

/**
 * Stops after `stationId` for a given train, read from the station's live board.
 * Only meaningful shortly before departure; pass `enabled=false` otherwise.
 */
export function useTrainStops(stationId: number | undefined, train: string, enabled: boolean) {
  return useQuery({
    queryKey: ["train-stops", stationId, train],
    queryFn: () =>
      fetchJson<TrainStopsResponse>(
        `/api/train-stops?station=${stationId}&train=${encodeURIComponent(train)}`,
      ),
    enabled: enabled && stationId != null && !!train,
    staleTime: 2 * 60 * 1000,
    select: (d) => d.stops,
  });
}
