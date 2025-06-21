/**
 * @fileoverview PWA Install Button Component
 *
 * Provides a button for users to install the Progressive Web App
 * Appears only when the app is installable and handles the installation flow
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSafePWAManager } from "@/lib/safe-pwa";

interface SafePWAManager {
  isInstallable: boolean;
  showInstallPrompt: () => Promise<{ outcome: string; platform: string } | null>;
  onInstallPromptChange: (callback: (canInstall: boolean) => void) => () => void;
}

export default function InstallButton() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [pwaManager, setPwaManager] = useState<SafePWAManager | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const { t } = useLanguage();

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatches
    setIsClient(true);

    // Add debug information about the environment
    const debug = [];
    debug.push(`User Agent: ${navigator.userAgent}`);
    debug.push(`Is HTTPS: ${location.protocol === "https:"}`);
    debug.push(`Is localhost: ${location.hostname === "localhost"}`);
    debug.push(
      `Display mode: ${
        window.matchMedia("(display-mode: standalone)").matches ? "standalone" : "browser"
      }`
    );
    debug.push(`Is already installed: ${window.matchMedia("(display-mode: standalone)").matches}`);
    setDebugInfo(debug.join(", "));

    // Load PWA manager safely
    const loadPWAManager = async () => {
      try {
        const manager = await getSafePWAManager();
        setPwaManager(manager);

        // Check initial installable state
        setIsInstallable(manager.isInstallable);
        console.log("PWA Manager loaded, installable:", manager.isInstallable);

        // Listen for changes in installable state
        const unsubscribe = manager.onInstallPromptChange((installable) => {
          console.log("Install prompt change:", installable);
          setIsInstallable(installable);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Failed to load PWA manager:", error);
      }
    };

    loadPWAManager();
  }, []);

  // Don't render anything during SSR or if not client-side
  if (!isClient || !pwaManager) {
    return null;
  }

  // Check if this is iOS device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;

  // For iOS, show install instructions if not in standalone mode
  const shouldShowForIOS = isIOS && !isInStandaloneMode;

  // Show button if installable OR if it's iOS and not installed
  const shouldShowButton = isInstallable || shouldShowForIOS;

  console.log("Install button debug:", {
    isInstallable,
    isIOS,
    isInStandaloneMode,
    shouldShowForIOS,
    shouldShowButton,
    debugInfo,
  });

  const handleInstall = async () => {
    if (isIOS) {
      // For iOS, show instructions instead of automatic install
      alert(t("iosInstallInstructions"));
      return;
    }

    if (!pwaManager) return;

    setIsInstalling(true);

    try {
      const result = await pwaManager.showInstallPrompt();

      if (result?.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else if (result?.outcome === "dismissed") {
        console.log("User dismissed the install prompt");
      }
    } catch (error) {
      console.error("Error showing install prompt:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  // Don't render if not installable and not iOS
  if (!shouldShowButton) {
    return null;
  }

  return (
    <Button
      onClick={handleInstall}
      disabled={isInstalling}
      variant="outline"
      size="sm"
      className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 h-10"
    >
      {isInstalling ? (
        <>
          <div className="w-4 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          {t("installing")}
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </>
      )}
    </Button>
  );
}
