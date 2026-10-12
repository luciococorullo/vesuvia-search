"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Current timestamp, refreshed every `intervalMs` (null during SSR / hydration to avoid mismatches). */
export function useNow(intervalMs = 30_000): number | null {
  const subscribe = useCallback(
    (onTick: () => void) => {
      const id = setInterval(onTick, intervalMs);
      return () => clearInterval(id);
    },
    [intervalMs],
  );
  // Snapshot is bucketed to the interval so it stays stable between ticks.
  const getSnapshot = useCallback(() => Math.floor(Date.now() / intervalMs) * intervalMs, [intervalMs]);
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
