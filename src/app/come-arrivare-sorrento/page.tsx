/**
 * @fileoverview Come arrivare a Sorrento - SEO optimized page
 *
 * This page provides comprehensive information about how to reach Sorrento
 * from Naples using public transportation, specifically the Circumvesuviana.
 * Optimized for search queries like "come arrivare sorrento napoli mezzi pubblici"
 */

import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FindTrains } from "../components/FindTrains";

export const metadata: Metadata = {
  title: "Come Arrivare a Sorrento da Napoli | Treni Circumvesuviana Mezzi Pubblici",
  description:
    "🚂 Scopri come arrivare a Sorrento da Napoli con i mezzi pubblici. Guida completa alla Circumvesuviana: orari, stazioni, prezzi e consigli di viaggio. Trasporto pubblico Campania.",
  keywords: [
    "come arrivare sorrento",
    "come arrivare sorrento da napoli",
    "mezzi pubblici sorrento",
    "treno napoli sorrento",
    "circumvesuviana sorrento",
    "trasporto pubblico sorrento",
    "come raggiungere sorrento",
    "viaggio napoli sorrento",
    "sorrento mezzi pubblici",
    "campania express sorrento",
  ],
  openGraph: {
    title: "Come Arrivare a Sorrento da Napoli con i Mezzi Pubblici",
    description:
      "Guida completa per raggiungere Sorrento da Napoli con la Circumvesuviana. Orari, stazioni, prezzi e consigli pratici.",
    url: "https://vesuvia-search.vercel.app/come-arrivare-sorrento",
  },
};

export default function ComeArrivareSorrento() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Come Arrivare a Sorrento da Napoli
          </h1>
          <p className="text-xl text-gray-600">
            Guida completa ai mezzi pubblici per raggiungere Sorrento
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trova il tuo treno</h2>
          <FindTrains />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚂 Trasporto Pubblico per Sorrento
            </h2>
            <p className="text-gray-700 mb-4">
              Il modo migliore e più economico per arrivare a <strong>Sorrento da Napoli</strong> è
              utilizzare la <strong>Circumvesuviana</strong>, la ferrovia gestita da EAV che collega
              Napoli con la penisola sorrentina.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-800 font-semibold">
                ⏱️ Tempo di viaggio: circa 1 ora e 10 minuti
                <br />
                💰 Costo: biglietto economico
                <br />
                🕐 Frequenza: ogni 30 minuti circa
              </p>
            </div>
          </section>

          {/* Stazioni di partenza */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚉 Stazioni di Partenza da Napoli
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Napoli Porta Nolana</h3>
                <p className="text-gray-700 text-sm">
                  Stazione principale della Circumvesuviana. Facilmente raggiungibile a piedi dalla
                  Stazione Centrale di Napoli (10 minuti).
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Napoli Garibaldi</h3>
                <p className="text-gray-700 text-sm">
                  Stazione sotterranea collegata direttamente alla Stazione Centrale di Napoli.
                  Molto comoda per chi arriva in treno.
                </p>
              </div>
            </div>
          </section>

          {/* Campania Express */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⭐ Campania Express - Servizio Turistico
            </h2>
            <p className="text-gray-700 mb-4">
              Il <strong>Campania Express</strong> è un servizio turistico della Circumvesuviana con
              fermate limitate che collega Napoli a Sorrento in modo più veloce e confortevole.
            </p>
            <div className="bg-green-50 border rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Vantaggi del Campania Express:</h3>
              <ul className="list-disc pl-5 text-green-700 space-y-1">
                <li>Tempo di viaggio ridotto (circa 50 minuti)</li>
                <li>Fermate solo nelle stazioni principali</li>
                <li>Treni più moderni e confortevoli</li>
                <li>Aria condizionata</li>
                <li>Servizio stagionale (marzo-ottobre)</li>
              </ul>
            </div>
          </section>

          {/* Stazioni intermedie */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🛤️ Stazioni Principali della Linea
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Napoli Porta Nolana",
                "Ercolano Scavi",
                "Torre Annunziata",
                "Pompei Scavi",
                "Castellammare di Stabia",
                "Vico Equense",
                "Meta di Sorrento",
                "Piano di Sorrento",
                "Sant'Agnello",
                "Sorrento",
              ].map((station, index) => (
                <div key={index} className="bg-gray-50 rounded p-3 text-center">
                  <span className="text-sm font-medium text-gray-700">{station}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Consigli pratici */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Consigli Pratici</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Prima del Viaggio</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Acquista il biglietto prima di salire sul treno</li>
                  <li>Verifica gli orari aggiornati</li>
                  <li>Arriva alla stazione con 10-15 minuti di anticipo</li>
                  <li>Porta con te un documento di identità</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Durante il Viaggio</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Tieni sempre il biglietto con te</li>
                  <li>Fai attenzione agli annunci delle stazioni</li>
                  <li>I treni possono essere affollati in alta stagione</li>
                  <li>Goditi il paesaggio verso Sorrento!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Alternative */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚌 Alternative di Trasporto</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="font-semibold text-yellow-700 mb-1">Autobus</h3>
                <p className="text-gray-600 text-sm">
                  Servizi di autobus SITA collegano Napoli a Sorrento, ma con tempi di percorrenza
                  più lunghi a causa del traffico.
                </p>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <h3 className="font-semibold text-red-700 mb-1">Auto/Taxi</h3>
                <p className="text-gray-600 text-sm">
                  Più costoso e soggetto al traffico, specialmente in estate. Parcheggio limitato a
                  Sorrento.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-blue-700 mb-1">Servizi Turistici</h3>
                <p className="text-gray-600 text-sm">
                  Alcuni tour operator offrono trasferimenti diretti, ma la Circumvesuviana rimane
                  l&apos;opzione più economica.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA finale */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Pronto per il tuo viaggio a Sorrento?</h2>
          <p className="mb-6">
            Usa VesuviaSearch per trovare gli orari più aggiornati della Circumvesuviana
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerca Treni Ora
          </Link>
        </div>
      </div>
    </main>
  );
}
