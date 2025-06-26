/**
 * @fileoverview Accessibility information page
 *
 * Provides comprehensive accessibility information for VesuviaSearch,
 * improving both SEO and user experience for people with disabilities.
 */

import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import { useTranslation } from "../../lib/client-i18n";

import { generateMetadata } from "../../lib/metadata";

export const metadata: Metadata = generateMetadata({
  it: {
    title: "Accessibilità | VesuviaSearch - Informazioni per tutti gli utenti",
    description:
      "Informazioni sull'accessibilità di VesuviaSearch. Funzionalità per persone con disabilità, stazioni Circumvesuviana accessibili, supporto tecnologie assistive.",
    keywords: [
      "accessibilità sito web",
      "circumvesuviana accessibile",
      "stazioni accessibili napoli",
      "disabilità trasporti napoli",
      "barriere architettoniche stazioni",
      "tecnologie assistive",
      "screen reader compatibile",
      "wcag 2.1 compliance",
    ],
    ogTitle: "Accessibilità | VesuviaSearch",
    ogDescription:
      "Informazioni complete sull'accessibilità di VesuviaSearch e delle stazioni Circumvesuviana",
  },
  en: {
    title: "Accessibility | VesuviaSearch - Information for all users",
    description:
      "VesuviaSearch accessibility information. Features for people with disabilities, accessible Circumvesuviana stations, assistive technologies support.",
    keywords: [
      "website accessibility",
      "accessible circumvesuviana",
      "accessible naples stations",
      "disabled transport naples",
      "architectural barriers stations",
      "assistive technologies",
      "screen reader compatible",
      "wcag 2.1 compliance",
    ],
    ogTitle: "Accessibility | VesuviaSearch",
    ogDescription:
      "Complete accessibility information for VesuviaSearch and Circumvesuviana stations",
  },
  es: {
    title: "Accesibilidad | VesuviaSearch - Información para todos los usuarios",
    description:
      "Información de accesibilidad de VesuviaSearch. Funciones para personas con discapacidades, estaciones Circumvesuviana accesibles, soporte de tecnologías asistivas.",
    keywords: [
      "accesibilidad sitio web",
      "circumvesuviana accesible",
      "estaciones accesibles nápoles",
      "transporte discapacitados nápoles",
      "barreras arquitectónicas estaciones",
      "tecnologías asistivas",
      "compatible con lector de pantalla",
      "wcag 2.1 compliance",
    ],
    ogTitle: "Accesibilidad | VesuviaSearch",
    ogDescription:
      "Información completa sobre la accesibilidad de VesuviaSearch y las estaciones Circumvesuviana",
  },
  canonical: "https://vesuvia-search.vercel.app/accessibilita",
});

export default function AccessibilitaPage() {
  const { t, language } = useTranslation();

  // Helper to get localized date based on current language
  const getLocalizedDate = (date: Date) => {
    const localeMap: Record<string, string> = {
      it: "it-IT",
      en: "en-GB",
      es: "es-ES",
      pt: "pt-PT",
      fr: "fr-FR",
      de: "de-DE",
    };
    return date.toLocaleDateString(localeMap[language as string] || "it-IT");
  };

  // Structured data for accessibility information
  const accessibilityStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("accessibilityPage.name"),
    description: t("accessibilityPage.description"),
    url: "https://vesuvia-search.vercel.app/accessibilita",
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: t("accessibilityPage.faq1.question"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("accessibilityPage.faq1.answer"),
          },
        },
        {
          "@type": "Question",
          name: t("accessibilityPage.faq2.question"),
          acceptedAnswer: {
            "@type": "Answer",
            text: t("accessibilityPage.faq2.answer"),
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(accessibilityStructuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t("accessibilityPage.hero.title")}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{t("accessibilityPage.hero.description")}</p>
          </div>

          {/* Web Accessibility Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t("accessibilityPage.webAccessibility.title")}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">
                  {t("accessibilityPage.webAccessibility.standards.title")}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>{t("accessibilityPage.webAccessibility.standards.wcag")}</li>
                  <li>{t("accessibilityPage.webAccessibility.standards.section508")}</li>
                  <li>{t("accessibilityPage.webAccessibility.standards.en301")}</li>
                  <li>{t("accessibilityPage.webAccessibility.standards.leggeStanca")}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-800">
                  {t("accessibilityPage.webAccessibility.features.title")}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>{t("accessibilityPage.webAccessibility.features.keyboardNavigation")}</li>
                  <li>{t("accessibilityPage.webAccessibility.features.screenReader")}</li>
                  <li>{t("accessibilityPage.webAccessibility.features.highContrast")}</li>
                  <li>{t("accessibilityPage.webAccessibility.features.focusVisible")}</li>
                  <li>{t("accessibilityPage.webAccessibility.features.altText")}</li>
                  <li>{t("accessibilityPage.webAccessibility.features.descriptiveLabels")}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-purple-800">
                  {t("accessibilityPage.webAccessibility.shortcuts.title")}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Tab</kbd> -{" "}
                      {t("accessibilityPage.webAccessibility.shortcuts.tab")}
                    </li>
                    <li>
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Enter</kbd> /{" "}
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Spazio</kbd> -{" "}
                      {t("accessibilityPage.webAccessibility.shortcuts.enterSpace")}
                    </li>
                    <li>
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Esc</kbd> -{" "}
                      {t("accessibilityPage.webAccessibility.shortcuts.esc")}
                    </li>
                    <li>
                      <kbd className="bg-gray-200 px-2 py-1 rounded">Frecce</kbd> -{" "}
                      {t("accessibilityPage.webAccessibility.shortcuts.arrows")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
            <h3 className="font-semibold mb-3">{t("accessibilityPage.legal.title")}</h3>
            <p className="mb-2">
              <strong>{t("accessibilityPage.legal.accessibilityDeclaration")}</strong>{" "}
              {t("accessibilityPage.legal.description")}
              <a
                href="https://www.agid.gov.it/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("accessibilityPage.legal.leggeStancaLink")}
              </a>
              {t("accessibilityPage.legal.and")}
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("accessibilityPage.legal.wcagLink")}
              </a>
              .
            </p>
            <p>
              <strong>{t("accessibilityPage.legal.lastUpdate")}</strong>{" "}
              {getLocalizedDate(new Date())} |
              <strong>{t("accessibilityPage.legal.nextReview")}</strong>{" "}
              {getLocalizedDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000))}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
