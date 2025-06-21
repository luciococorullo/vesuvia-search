/**
 * @fileoverview Offline Indicator Component
 *
 * Shows a banner when the user is offline to inform them about the connection status
 */

"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OfflineIndicator() {
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleOnline = () => {
      setShowOfflineBanner(false);
    };

    const handleOffline = () => {
      setShowOfflineBanner(true);
    };

    // Set initial state based on current online status
    if (!navigator.onLine) {
      setShowOfflineBanner(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showOfflineBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        {t("offlineMode")}
        <button
          onClick={() => setShowOfflineBanner(false)}
          className="ml-4 text-white hover:text-yellow-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}
