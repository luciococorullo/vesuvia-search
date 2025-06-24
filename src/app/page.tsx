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
  const { t } = useLanguage();

  // Schema markup per homepage con business e location info
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://vesuvia-search.vercel.app/#homepage-business",
    "name": "VesuviaSearch - Orari Treni Napoli",
    "description": "Servizio di consultazione orari treni Circumvesuviana e EAV per Napoli e provincia in tempo reale",
    "url": "https://vesuvia-search.vercel.app/",
    "areaServed": {
      "@type": "City",
      "name": "Napoli",
      "containedInPlace": {
        "@type": "AdministrativeArea", 
        "name": "Campania"
      }
    },
    "serviceType": "Informazioni orari treni",
    "priceRange": "Gratuito",
    "openingHours": ["Mo-Su 00:00-23:59"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servizi orari treni",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Orari treni Napoli-Sorrento",
            "description": "Orari in tempo reale per la tratta Napoli-Sorrento"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Orari treni Napoli-Pompei",
            "description": "Orari aggiornati per raggiungere Pompei Scavi da Napoli"
          }
        }
      ]
    }
  };

  // FAQ principali per featured snippets
  const mainFAQs = [
    {
      question: "Quali sono gli orari dei treni da Napoli a Sorrento?",
      answer: "I treni della Circumvesuviana da Napoli a Sorrento partono ogni 30 minuti circa dalle 6:00 alle 21:40. Il viaggio dura circa 1 ora e 15 minuti. Il primo treno parte intorno alle 6:15 da Napoli Porta Nolana, l'ultimo intorno alle 21:40.",
      category: "orari" as const
    },
    {
      question: "Quanto costa il biglietto da Napoli a Pompei?",
      answer: "Il biglietto standard da Napoli a Pompei Scavi costa <strong>€2,80</strong>. Per il Campania Express (servizio turistico premium) il costo è di circa €8. I biglietti si acquistano presso le biglietterie automatiche o gli sportelli.",
      category: "biglietti" as const
    },
    {
      question: "Dove si prende la Circumvesuviana a Napoli?",
      answer: "Le stazioni principali sono <strong>Napoli Porta Nolana</strong> (capolinea) e <strong>Napoli Piazza Garibaldi</strong> (collegata alla stazione centrale FS). Entrambe servono tutte le destinazioni della provincia.",
      category: "destinazioni" as const
    },
    {
      question: "Come arrivare agli Scavi di Pompei da Napoli?",
      answer: "Prendi la Circumvesuviana da Napoli Porta Nolana verso Sorrento/Poggiomarino e scendi a <strong>Pompei Scavi - Villa dei Misteri</strong> dopo 35 minuti. L'ingresso agli scavi è a 100 metri dalla stazione.",
      category: "destinazioni" as const
    }
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
              Orari Treni Napoli e Circumvesuviana
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
          <RichFAQ 
            faqs={mainFAQs}
            title="Domande frequenti sui treni a Napoli e provincia"
          />
          
          {/* Disclaimer Prezzi */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              ℹ️ Informazioni sui Prezzi
            </h3>
            <p className="text-yellow-700 text-sm leading-relaxed">
              Per informazioni aggiornate sui prezzi dei biglietti EAV e Circumvesuviana, 
              consulta i punti vendita ufficiali EAV o il sito web ufficiale. 
              VesuviaSearch fornisce esclusivamente informazioni sugli orari dei treni.
            </p>
          </div>
          
          {/* SEO-optimized CTA */}
          <div className="mt-12">
            <SEOCTA 
              variant="tourist"
              title="Pianifica il tuo viaggio a Napoli e provincia"
              description="Raggiungi facilmente Sorrento, Pompei, Ercolano e tutte le destinazioni turistiche della Campania con gli orari aggiornati della Circumvesuviana"
              buttonText="🗺️ Esplora Destinazioni Turistiche"
              buttonLink="/destinazioni-turistiche"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
