"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Station, StationsResponse } from "@/lib/eav/types";
import { normalize, searchStations } from "@/lib/search";
import { fetchJson } from "./fetcher";

const DAY = 24 * 60 * 60 * 1000;

export function useStationsQuery() {
  return useQuery({
    queryKey: ["stations"],
    queryFn: () => fetchJson<StationsResponse>("/api/stations"),
    staleTime: DAY,
    gcTime: DAY,
  });
}

export interface StationsIndex {
  stations: Station[];
  byId: Map<number, Station>;
  /** Exact normalized-name match first, then best fuzzy match. */
  resolveByName: (name: string) => Station | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const EMPTY: Station[] = [];

/** Stations list plus lookup helpers. Station identity is always the numeric id. */
export function useStations(): StationsIndex {
  const q = useStationsQuery();
  const stations = q.data?.stations ?? EMPTY;

  return useMemo(() => {
    const byId = new Map(stations.map((s) => [s.id, s]));
    const byNorm = new Map<string, Station>();
    for (const s of stations) {
      const k = normalize(s.name);
      if (!byNorm.has(k)) byNorm.set(k, s);
    }
    const resolveByName = (name: string) => {
      const exact = byNorm.get(normalize(name));
      if (exact) return exact;
      return searchStations(name, stations, 1)[0];
    };
    return {
      stations,
      byId,
      resolveByName,
      isLoading: q.isLoading,
      isError: q.isError,
      refetch: () => void q.refetch(),
    };
    // q.refetch is stable; isLoading/isError drive re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, q.isLoading, q.isError]);
}
