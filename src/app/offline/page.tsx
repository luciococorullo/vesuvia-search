/**
 * @fileoverview Offline page component
 *
 * This page is shown to users when they are offline and trying to access
 * a page that hasn't been cached by the service worker.
 */

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a simple offline message during SSR
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v4m0 12v4m10-10h-4M6 12H2"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sei offline</h1>

          <p className="text-gray-600 mb-6">
            Non riesci a connetterti a Internet. Controlla la tua connessione e riprova.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2v4m0 12v4m10-10h-4M6 12H2"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("offlineMode")}</h1>

        <p className="text-gray-600 mb-6">
          Non riesci a connetterti a Internet. Controlla la tua connessione e riprova.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            {t("retry")}
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Torna indietro
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Alcune funzionalità potrebbero essere disponibili offline se hai già visitato questa
            pagina.
          </p>
        </div>
      </div>
    </div>
  );
}
