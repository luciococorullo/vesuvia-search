/**
 * @fileoverview Main homepage component for VesuviaSearch
 *
 * This is the root page component that renders the main train search interface.
 * It includes the navigation bar and the main search functionality for finding
 * trains across the entire EAV network in Campania, with real-time information,
 * and a modern glass morphism UI design.
 *
 * @author VesuviaSearch Team
 * @version 2.0.0
 */

"use client";

import Navbar from "./components/Navbar";
import { NewFindTrains } from "./components/NewFindTrains";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Home component - Main page of the VesuviaSearch application
 *
 * Features:
 * - Responsive navigation bar
 * - Multilingual title and subtitle
 * - Train search interface
 * - Modern UI with Tailwind CSS styling
 *
 * @returns JSX.Element The rendered homepage
 */
export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      {/* Navigation header */}
      <Navbar />

      {/* Main content area */}
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page title and subtitle */}
          <div className="text-center mb-8 animate-fade-in mobile-friendly-spacing">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 text-with-shadow">
              {t("findTrainsTitle")}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {t("findTrainsSubtitle")}
            </p>
          </div>

          {/* Train search component */}
          <div className="animate-slide-up">
            <NewFindTrains />
          </div>
        </div>
      </div>
    </main>
  );
}
