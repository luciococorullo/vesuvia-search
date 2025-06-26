/**
 * @fileoverview Main homepage component for VesuviaSearch
 *
 * This is the root page component that renders the main train search interface.
 * It includes the navigation bar and the main search functionality for finding
 * trains across the entire EAV network in Campania, with real-time information,
 * and a modern glass morphism UI design.
 *
 * Optimized for SEO with focus on "orari treni Napoli" and related keywords.
 *
 * @author VesuviaSearch Team
 * @version 2.1.0
 */

"use client";

import Navbar from "./components/Navbar";
import { NewFindTrains } from "./components/NewFindTrains";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOContent from "@/components/SEOContent";
import SEOCTA from "@/components/SEOCTA";
import RichFAQ from "@/components/RichFAQ";

/**
 * Home component - Main page of the VesuviaSearch application
 *
 * Features:
 * - Responsive navigation bar
 * - Multilingual title and subtitle
 * - Train search interface with emphasis on Napoli-area destinations
 * - SEO-optimized content focused on Napoli province trains
 * - Modern UI with Tailwind CSS styling
 * - Schema.org structured data for enhanced search visibility
 *
 * @returns JSX.Element The rendered homepage
 */
export default function Home() {
  const { t, language } = useLanguage();

  // Get language-specific structured data
  const getLocalizedStructuredData = () => {
    const cityNames = {
      it: "Napoli",
      en: "Naples",
      es: "Nápoles",
      pt: "Nápoles",
      fr: "Naples",
      de: "Neapel",
    };

    const serviceNames = {
      it: "Orari Treni Napoli",
      en: "Naples Train Schedules",
      es: "Horarios de Trenes de Nápoles",
      pt: "Horários de Trens de Nápoles",
      fr: "Horaires des Trains de Naples",
      de: "Fahrpläne für Neapel",
    };

    const serviceDescriptions = {
      it: "Servizio di consultazione orari treni Circumvesuviana e EAV per Napoli e provincia in tempo reale",
      en: "Real-time train schedule service for Circumvesuviana and EAV in Naples and province",
      es: "Servicio de consulta de horarios de trenes Circumvesuviana y EAV para Nápoles y provincia en tiempo real",
      pt: "Serviço de consulta de horários de trens Circumvesuviana e EAV para Nápoles e província em tempo real",
      fr: "Service de consultation des horaires de trains Circumvesuviana et EAV pour Naples et sa province en temps réel",
      de: "Echtzeit-Fahrplanservice für Circumvesuviana und EAV in Neapel und Umgebung",
    };

    const serviceTypes = {
      it: "Informazioni orari treni",
      en: "Train schedule information",
      es: "Información de horarios de trenes",
      pt: "Informações sobre horários de trens",
      fr: "Information sur les horaires des trains",
      de: "Zugfahrplaninformationen",
    };

    const priceRanges = {
      it: "Gratuito",
      en: "Free",
      es: "Gratis",
      pt: "Gratuito",
      fr: "Gratuit",
      de: "Kostenlos",
    };

    const catalogNames = {
      it: "Servizi orari treni",
      en: "Train schedule services",
      es: "Servicios de horarios de trenes",
      pt: "Serviços de horários de trens",
      fr: "Services d'horaires de trains",
      de: "Zugfahrplandienste",
    };

    const sorrentoServices = {
      it: "Orari treni Napoli-Sorrento",
      en: "Naples-Sorrento train schedules",
      es: "Horarios de trenes Nápoles-Sorrento",
      pt: "Horários de trens Nápoles-Sorrento",
      fr: "Horaires des trains Naples-Sorrente",
      de: "Zugfahrpläne Neapel-Sorrent",
    };

    const sorrentoDescriptions = {
      it: "Orari in tempo reale per la tratta Napoli-Sorrento",
      en: "Real-time schedules for Naples-Sorrento route",
      es: "Horarios en tiempo real para la ruta Nápoles-Sorrento",
      pt: "Horários em tempo real para o trajeto Nápoles-Sorrento",
      fr: "Horaires en temps réel pour le trajet Naples-Sorrente",
      de: "Echtzeitfahrpläne für die Strecke Neapel-Sorrent",
    };

    const pompeiServices = {
      it: "Orari treni Napoli-Pompei",
      en: "Naples-Pompeii train schedules",
      es: "Horarios de trenes Nápoles-Pompeya",
      pt: "Horários de trens Nápoles-Pompeia",
      fr: "Horaires des trains Naples-Pompéi",
      de: "Zugfahrpläne Neapel-Pompeji",
    };

    const pompeiDescriptions = {
      it: "Orari aggiornati per raggiungere Pompei Scavi da Napoli",
      en: "Updated schedules to reach Pompeii from Naples",
      es: "Horarios actualizados para llegar a Pompeya desde Nápoles",
      pt: "Horários atualizados para chegar a Pompeia a partir de Nápoles",
      fr: "Horaires mis à jour pour atteindre Pompéi depuis Naples",
      de: "Aktualisierte Fahrpläne für die Anreise nach Pompeji von Neapel aus",
    };

    // Get values based on current language or fallback to Italian
    const cityName = cityNames[language] || cityNames["it"];
    const serviceName = serviceNames[language] || serviceNames["it"];
    const serviceDescription = serviceDescriptions[language] || serviceDescriptions["it"];
    const serviceType = serviceTypes[language] || serviceTypes["it"];
    const priceRange = priceRanges[language] || priceRanges["it"];
    const catalogName = catalogNames[language] || catalogNames["it"];
    const sorrentoService = sorrentoServices[language] || sorrentoServices["it"];
    const sorrentoDescription = sorrentoDescriptions[language] || sorrentoDescriptions["it"];
    const pompeiService = pompeiServices[language] || pompeiServices["it"];
    const pompeiDescription = pompeiDescriptions[language] || pompeiDescriptions["it"];

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://vesuvia-search.vercel.app/#homepage-business",
      name: `VesuviaSearch - ${serviceName}`,
      description: serviceDescription,
      url: "https://vesuvia-search.vercel.app/",
      areaServed: {
        "@type": "City",
        name: cityName,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Campania",
        },
      },
      serviceType: serviceType,
      priceRange: priceRange,
      openingHours: ["Mo-Su 00:00-23:59"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: catalogName,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: sorrentoService,
              description: sorrentoDescription,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: pompeiService,
              description: pompeiDescription,
            },
          },
        ],
      },
    };
  };

  const homepageStructuredData = getLocalizedStructuredData();

  // FAQ principali per featured snippets
  const mainFAQs = [
    {
      question: t("homeFAQs.trainSchedules.question"),
      answer: t("homeFAQs.trainSchedules.answer"),
      category: "orari" as const,
    },
    {
      question: t("homeFAQs.ticketPrices.question"),
      answer: t("homeFAQs.ticketPrices.answer"),
      category: "biglietti" as const,
    },
    {
      question: t("homeFAQs.stations.question"),
      answer: t("homeFAQs.stations.answer"),
      category: "destinazioni" as const,
    },
    {
      question: t("homeFAQs.pompeiDirections.question"),
      answer: t("homeFAQs.pompeiDirections.answer"),
      category: "destinazioni" as const,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      {/* Schema markup per homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageStructuredData),
        }}
      />

      {/* Navigation header */}
      <Navbar />

      {/* Main content area */}
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page title and subtitle - SEO optimized for Napoli trains */}
          <div className="text-center mb-8 animate-fade-in mobile-friendly-spacing">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 text-with-shadow">
              {t("pageTitle")}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {t("findTrainsSubtitle")}
            </p>
          </div>

          {/* Train search component */}
          <div className="animate-slide-up mb-10">
            <NewFindTrains />
          </div>

          {/* SEO Content section - Optimized for Napoli area keywords */}
          <SEOContent />

          {/* Rich FAQ for Featured Snippets */}
          <RichFAQ faqs={mainFAQs} title={t("faqSectionTitle")} />

          {/* Disclaimer Prezzi */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              {t("pricingDisclaimer.title")}
            </h3>
            <p className="text-yellow-700 text-sm leading-relaxed">
              {t("pricingDisclaimer.content")}
            </p>
          </div>

          {/* SEO-optimized CTA */}
          <div className="mt-12">
            <SEOCTA
              variant="tourist"
              title={t("tourismCTA.title")}
              description={t("tourismCTA.description")}
              buttonText={t("tourismCTA.buttonText")}
              buttonLink="/destinazioni-turistiche"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
