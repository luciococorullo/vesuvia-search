/**
 * @fileoverview Travel Time Calculator page
 *
 * Provides comprehensive travel time information between stations
 * targeting "quanto tempo ci vuole" and similar search queries
 */

"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TempiViaggioPage() {
  const { t } = useLanguage();
  // Structured data for travel time information
  const travelTimeStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: t("travelTimePage.faq.q1"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("travelTimePage.faq.a1"),
        },
      },
      {
        "@type": "Question",
        name: t("travelTimePage.faq.q2"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("travelTimePage.faq.a2"),
        },
      },
      {
        "@type": "Question",
        name: t("travelTimePage.faq.q3"),
        acceptedAnswer: {
          "@type": "Answer",
          text: t("travelTimePage.faq.a3"),
        },
      },
    ],
  };

  // Travel time data
  const travelTimes = [
    {
      route: t("travelTimePage.napoliSorrento"),
      regular: "65-70 min",
      express: "50 min (Campania Express)",
      distance: "48 km",
      stations: 20,
      highlights: "Tratta turistica più popolare",
      slug: "napoli-sorrento",
    },
    {
      route: t("travelTimePage.napoliPompei"),
      regular: "35-40 min",
      express: "35 min (fermate limitate)",
      distance: "26 km",
      stations: 13,
      highlights: "Accesso diretto agli scavi",
      slug: "napoli-pompei",
    },
    {
      route: t("travelTimePage.napoliErcolano"),
      regular: "20-25 min",
      express: "18 min",
      distance: "12 km",
      stations: 7,
      highlights: "Destinazione più veloce",
      slug: "napoli-ercolano",
    },
    {
      route: t("travelTimePage.sorrentoPompei"),
      regular: "30-35 min",
      express: "25 min",
      distance: "22 km",
      stations: 7,
      highlights: "Collegamento turistico diretto",
      slug: "sorrento-pompei",
    },
    {
      route: "Napoli → Castellammare",
      regular: "45-50 min",
      express: "40 min",
      distance: "30 km",
      stations: 15,
      highlights: "Porta d&apos;accesso alla Penisola Sorrentina",
      slug: "",
    },
    {
      route: "Napoli → Torre Annunziata",
      regular: "30-35 min",
      express: "28 min",
      distance: "20 km",
      stations: 11,
      highlights: "Centro industriale vesuviano",
      slug: "",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(travelTimeStructuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t("travelTimePage.pageTitle")}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{t("travelTimePage.intro")}</p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-semibold text-blue-800 mb-2">
                💡 {t("travelTimePage.howToReadTimes")}
              </h2>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • <strong>{t("travelTimePage.regularTime")}:</strong>{" "}
                  {t("travelTimePage.regularTimeDescription")}
                </li>
                <li>
                  • <strong>{t("travelTimePage.expressTime")}:</strong>{" "}
                  {t("travelTimePage.expressTimeDescription")}
                </li>
                <li>
                  • <strong>{t("travelTimePage.variations")}:</strong>{" "}
                  {t("travelTimePage.variationsDescription")}
                </li>
              </ul>
            </div>
          </div>

          {/* Travel Times Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {travelTimes.map((route, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{route.route}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {route.distance}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">🚂 {t("travelTimePage.standardTrain")}:</span>
                    <span className="font-semibold text-green-600">{route.regular}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">⚡ {t("travelTimePage.expressTrain")}:</span>
                    <span className="font-semibold text-blue-600">{route.express}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🚉 {t("travelTimePage.stops")}:</span>
                    <span className="font-medium">
                      {route.stations} {t("travelTimePage.stations")}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>{t("travelTimePage.note")}:</strong> {route.highlights}
                  </p>
                  {route.slug && (
                    <Link
                      href={`/route/${route.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                    >
                      📍 {t("travelTimePage.detailedGuide")} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Factors Affecting Travel Time */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🎯 {t("travelTimePage.effects.title")}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕐</span>
                </div>
                <h3 className="font-semibold mb-2">{t("travelTimePage.effects.timeOfDay")}</h3>
                <p className="text-sm text-gray-600">{t("travelTimePage.peakHoursDescription")}</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚆</span>
                </div>
                <h3 className="font-semibold mb-2">{t("travelTimePage.effects.trainType")}</h3>
                <p className="text-sm text-gray-600">
                  {t("travelTimePage.expressTrainsDescription")}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-semibold mb-2">
                  {t("travelTimePage.effects.weatherConditions")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("travelTimePage.weatherDelaysDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">💡 {t("travelTimePage.travelTips")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">⏰ {t("travelTimePage.optimalPlanning")}</h3>
                <ul className="space-y-2 text-sm">
                  <li>• {t("travelTimePage.tip1")}</li>
                  <li>• {t("travelTimePage.tip2")}</li>
                  <li>• {t("travelTimePage.tip3")}</li>
                  <li>• {t("travelTimePage.tip4")}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">🎯 {t("travelTimePage.forTourists")}</h3>
                <ul className="space-y-2 text-sm">
                  <li>• {t("travelTimePage.touristTip1")}</li>
                  <li>• {t("travelTimePage.touristTip2")}</li>
                  <li>• {t("travelTimePage.touristTip3")}</li>
                  <li>• {t("travelTimePage.touristTip4")}</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                🔍 {t("travelTimePage.checkRealTimeSchedules")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
