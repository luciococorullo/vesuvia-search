"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between md:items-start space-y-6 md:space-y-0">
          {/* Site Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Orari Treni Napoli</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                  Ricerca Treni
                </Link>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  FAQ Treni Napoli
                </a>
              </li>
              <li>
                <a
                  href="/destinazioni-turistiche"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Destinazioni Turistiche
                </a>
              </li>
              <li>
                <a
                  href="/stazioni-napoli"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Stazioni Napoli
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Tratte Popolari</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/search?from=Napoli&to=Sorrento"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Napoli - Sorrento
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Napoli&to=Pompei%20Scavi"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Napoli - Pompei Scavi
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Sorrento&to=Napoli"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Sorrento - Napoli
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Napoli&to=Ercolano%20Scavi"
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Napoli - Ercolano
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>Disclaimer:</strong> {t("footerDisclaimer")}
              </p>
              <p className="mb-2">{t("footerEducationalProject")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-6 text-center">
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
    </footer>
  );
}
