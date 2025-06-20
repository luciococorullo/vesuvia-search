/**
 * @fileoverview Main homepage component for VesuviaSearch
 *
 * This is the root page component that renders the main train search interface.
 * It includes the navigation bar and the main search functionality for finding
 * EAV Circumvesuviana trains across the entire regional network in Campania.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
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
    <main className="min-h-screen bg-gray-50">
      {/* Navigation header */}
      <Navbar />

      {/* Main content area */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page title and subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{t("findTrainsTitle")}</h2>
            <p className="text-gray-600 text-lg">{t("findTrainsSubtitle")}</p>
          </div>

          {/* Train search component */}
          <NewFindTrains />
        </div>
      </div>
    </main>
  );
}
