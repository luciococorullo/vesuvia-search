"use client";

import Navbar from "./components/Navbar";
import { FindTrains } from "./components/FindTrains";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{t("findTrainsTitle")}</h2>
            <p className="text-gray-600 text-lg">{t("findTrainsSubtitle")}</p>
          </div>
          <FindTrains />
        </div>
      </div>
    </main>
  );
}
