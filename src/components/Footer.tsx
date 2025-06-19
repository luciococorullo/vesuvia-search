"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> {t("footerDisclaimer")}
            </p>
            <p className="mb-2">{t("footerEducationalProject")}</p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              {t("footerMadeWith")} ❤️ {t("footerBy")}{" "}
              <a
                href="https://www.crealatuaidea.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Creja
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © {new Date().getFullYear()} VesuviaSearch - {t("footerEducationalCopyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
