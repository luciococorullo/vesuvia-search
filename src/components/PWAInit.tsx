/**
 * @fileoverview Registers the service worker (production only).
 *
 * In development any previously registered SW is unregistered to avoid
 * serving stale bundles while iterating.
 */

"use client";

import { useEffect } from "react";
import { pwaManager } from "@/lib/pwa";

export default function PWAInit() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((reg) => reg.unregister()))
        .catch(() => undefined);
      return;
    }

    const register = () => {
      void pwaManager.registerServiceWorker();
    };

    // Register after load so the SW install doesn't compete with first paint.
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
