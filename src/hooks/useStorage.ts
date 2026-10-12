"use client";

import { useSyncExternalStore } from "react";
import {
  getFavorites,
  getFavoritesServer,
  getRecents,
  getRecentsServer,
  subscribe,
} from "@/lib/storage";

export function useRecents() {
  return useSyncExternalStore(subscribe, getRecents, getRecentsServer);
}

export function useFavorites() {
  return useSyncExternalStore(subscribe, getFavorites, getFavoritesServer);
}
