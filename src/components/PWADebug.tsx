/**
 * @fileoverview PWA Debug Component
 *
 * Shows debug information about PWA installation status
 * Only visible in development mode
 */

"use client";

import { useState, useEffect } from "react";

interface PWADebugInfo {
  userAgent: string;
  isHTTPS: boolean;
  isLocalhost: boolean;
  displayMode: string;
  isStandalone: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isChrome: boolean;
  isSafari: boolean;
  serviceWorkerSupported: boolean;
  manifestSupported: boolean;
  beforeInstallPromptSupported: boolean;
}

export default function PWADebug() {
  const [debugInfo, setDebugInfo] = useState<PWADebugInfo | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const info = {
        userAgent: navigator.userAgent,
        isHTTPS: location.protocol === "https:",
        isLocalhost: location.hostname === "localhost",
        displayMode: window.matchMedia("(display-mode: standalone)").matches
          ? "standalone"
          : "browser",
        isStandalone: window.matchMedia("(display-mode: standalone)").matches,
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),
        isChrome: /Chrome/.test(navigator.userAgent),
        isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
        serviceWorkerSupported: "serviceWorker" in navigator,
        manifestSupported: "manifest" in document.documentElement,
        beforeInstallPromptSupported: "onbeforeinstallprompt" in window,
      };

      setDebugInfo(info);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !isClient || !debugInfo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs p-4 rounded-lg max-w-md z-50">
      <h3 className="font-bold mb-2">PWA Debug Info</h3>
      <div className="space-y-1">
        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
            <span className={value ? "text-green-400" : "text-red-400"}>
              {value ? "✓" : "✗"} {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
