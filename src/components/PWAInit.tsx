/**
 * @fileoverview PWA Initialization Component
 *
 * This component handles the initialization of Progressive Web App features:
 * - Service worker registration
 * - Install prompt handling
 * - Update notifications
 * - Offline status detection
 */

"use client";

import { useEffect } from "react";
import { pwaManager } from "@/lib/pwa";

export default function PWAInit() {
  useEffect(() => {
    // Only run on the client side and after component mounts
    if (typeof window !== "undefined") {
      // Small delay to ensure everything is properly loaded
      const timer = setTimeout(() => {
        // Register service worker
        pwaManager.registerServiceWorker();

        // Request notification permission (optional)
        pwaManager.requestNotificationPermission();

        // Listen for online/offline status changes
        const unsubscribe = pwaManager.onlineStatusChange((isOnline) => {
          if (isOnline) {
            console.log("App is back online");
            // You could show a toast notification here
          } else {
            console.log("App is offline");
            // You could show an offline indicator here
          }
        });

        return () => {
          clearTimeout(timer);
          unsubscribe();
        };
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
