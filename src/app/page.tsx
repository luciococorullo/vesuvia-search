/**
 * @fileoverview Main homepage component for VesuviaSearch
 *
 * This is the root page component that renders the main train search interface.
 * It includes the navigation bar and the main search functionality for finding
 * Circumvesuviana trains between Naples and Sorrento.
 * SEO optimized for public transport searches.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

"use client";

import Navbar from "./components/Navbar";
import { FindTrains } from "./components/FindTrains";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Home component - Main page of the VesuviaSearch application
 *
 * Features:
 * - Responsive navigation bar
 * - Multilingual title and subtitle
 * - Train search interface
 * - SEO-optimized content for public transport searches
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Treni Circumvesuviana Napoli Sorrento
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            🚂 Trova facilmente i treni per Sorrento, Pompei ed Ercolano
          </p>
          <p className="text-lg opacity-90">
            Il modo più veloce per cercare orari del trasporto pubblico in Campania
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{t("findTrainsTitle")}</h2>
            <p className="text-gray-600 text-lg">{t("findTrainsSubtitle")}</p>
          </div>

          {/* Train search component */}
          <FindTrains />

          {/* SEO Content Section */}
          <div className="mt-16 space-y-12">
            {/* Quick Links */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🚉 Destinazioni Popolari
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Napoli → Sorrento", link: "/come-arrivare-sorrento" },
                  { name: "Napoli → Pompei", link: "/come-arrivare-pompei" },
                  { name: "Sorrento → Napoli", link: "/" },
                  { name: "Pompei → Sorrento", link: "/" },
                  { name: "Napoli → Ercolano", link: "/" },
                  { name: "Castellammare → Sorrento", link: "/" },
                  { name: "Torre Annunziata → Napoli", link: "/" },
                  { name: "Vico Equense → Napoli", link: "/" },
                ].map((route, index) => (
                  <a
                    key={index}
                    href={route.link}
                    className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                  >
                    <span className="text-sm font-medium text-blue-700">{route.name}</span>
                  </a>
                ))}
              </div>
            </section>

            {/* Informazioni principali */}
            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  🚂 Circumvesuviana: Trasporto Pubblico Campania
                </h2>
                <p className="text-gray-700 mb-4">
                  La <strong>Circumvesuviana</strong> è la ferrovia che collega{" "}
                  <strong>Napoli a Sorrento</strong>, passando per le principali attrazioni
                  turistiche della Campania come Pompei ed Ercolano.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    Servizio gestito da <strong>EAV</strong> (Ente Autonomo Volturno)
                  </li>
                  <li>Collegamenti diretti con Pompei Scavi e Ercolano</li>
                  <li>Treni ogni 30 minuti circa</li>
                  <li>Servizio tutto l&apos;anno</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  ⭐ Campania Express - Servizio Premium
                </h2>
                <p className="text-gray-700 mb-4">
                  Il <strong>Campania Express</strong> è il servizio turistico premium con aria
                  condizionata e fermate limitate per un viaggio più confortevole.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Tempo di viaggio ridotto</li>
                  <li>Aria condizionata e comfort superiore</li>
                  <li>Fermate solo nelle stazioni principali</li>
                  <li>Servizio stagionale (marzo-ottobre)</li>
                </ul>
                <a
                  href="/campania-express"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Scopri di più →
                </a>
              </div>
            </section>

            {/* Guide utili */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                📖 Guide Utili per il Viaggiatore
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">
                    🏖️ Come Arrivare a Sorrento
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Guida completa per raggiungere Sorrento da Napoli con i mezzi pubblici, orari e
                    consigli pratici.
                  </p>
                  <a
                    href="/come-arrivare-sorrento"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Leggi la guida →
                  </a>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-amber-600 mb-3">
                    🏛️ Come Arrivare a Pompei
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Scopri come visitare gli Scavi di Pompei con la Circumvesuviana, stazioni e
                    informazioni turistiche.
                  </p>
                  <a
                    href="/come-arrivare-pompei"
                    className="text-amber-600 hover:text-amber-800 font-medium text-sm"
                  >
                    Visita Pompei →
                  </a>
                </div>

                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">
                    🕐 Orari Circumvesuviana
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Consulta tutti gli orari aggiornati, prime e ultime corse, frequenze e
                    variazioni stagionali.
                  </p>
                  <a
                    href="/orari-circumvesuviana"
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    Vedi orari →
                  </a>
                </div>
              </div>
            </section>

            {/* Perché scegliere VesuviaSearch */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ✨ Perché Scegliere VesuviaSearch
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-semibold text-gray-700 mb-2">Veloce</h3>
                  <p className="text-sm text-gray-600">
                    Ricerca istantanea degli orari senza complicazioni
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-semibold text-gray-700 mb-2">Preciso</h3>
                  <p className="text-sm text-gray-600">
                    Orari aggiornati e informazioni sempre accurate
                  </p>
                </div>
                <div>
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-semibold text-gray-700 mb-2">Mobile</h3>
                  <p className="text-sm text-gray-600">Ottimizzato per smartphone e tablet</p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🆓</div>
                  <h3 className="font-semibold text-gray-700 mb-2">Gratuito</h3>
                  <p className="text-sm text-gray-600">Servizio completamente gratuito per tutti</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
