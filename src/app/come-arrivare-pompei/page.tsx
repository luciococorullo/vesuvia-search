/**
 * @fileoverview Come arrivare a Pompei - SEO optimized page
 *
 * This page provides comprehensive information about how to reach Pompei
 * from Naples using public transportation, specifically targeting tourist searches.
 */

import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FindTrains } from "../components/FindTrains";

export const metadata: Metadata = {
  title: "Come Arrivare a Pompei da Napoli | Treno per Pompei Scavi Circumvesuviana",
  description:
    "🏛️ Scopri come arrivare a Pompei da Napoli con la Circumvesuviana. Guida completa: stazione Pompei Scavi, orari treni, prezzi biglietti e consigli per visitare gli scavi.",
  keywords: [
    "come arrivare pompei",
    "treno per pompei",
    "pompei scavi treno",
    "circumvesuviana pompei",
    "come raggiungere pompei",
    "napoli pompei treno",
    "mezzi pubblici pompei",
    "stazione pompei scavi",
    "pompei da napoli",
    "visitare pompei treno",
  ],
  openGraph: {
    title: "Come Arrivare a Pompei da Napoli con il Treno",
    description:
      "Guida completa per raggiungere Pompei da Napoli con la Circumvesuviana. Stazione Pompei Scavi, orari e consigli.",
    url: "https://vesuvia-search.vercel.app/come-arrivare-pompei",
  },
};

export default function ComeArrivarePompei() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Come Arrivare a Pompei da Napoli
          </h1>
          <p className="text-xl text-gray-600">
            Guida completa per visitare gli Scavi di Pompei con la Circumvesuviana
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trova il tuo treno per Pompei</h2>
          <FindTrains />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🏛️ Visitare Pompei con i Mezzi Pubblici
            </h2>
            <p className="text-gray-700 mb-4">
              La <strong>Circumvesuviana</strong> è il mezzo più conveniente per raggiungere
              <strong> Pompei da Napoli</strong>. La stazione{" "}
              <strong>Pompei Scavi - Villa dei Misteri</strong>
              si trova a soli 100 metri dall&apos;ingresso principale degli Scavi archeologici.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
              <p className="text-amber-800 font-semibold">
                ⏱️ Tempo di viaggio: circa 40 minuti
                <br />
                🚉 Stazione: Pompei Scavi - Villa dei Misteri
                <br />
                🚶 Distanza scavi: 100 metri a piedi
                <br />
                💰 Biglietto economico
              </p>
            </div>
          </section>

          {/* Stazioni */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚉 Stazioni per Pompei</h2>
            <div className="grid gap-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  ⭐ Pompei Scavi - Villa dei Misteri (CONSIGLIATA)
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Stazione ideale per visitare gli Scavi di Pompei. Si trova direttamente
                  all&apos;ingresso principale del sito archeologico.
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                  <li>Distanza scavi: 100 metri</li>
                  <li>Servizio biglietteria nelle vicinanze</li>
                  <li>Bar e servizi turistici</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Pompei Santuario</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Stazione più vicina al centro moderno di Pompei e al Santuario della Madonna di
                  Pompei.
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                  <li>Distanza scavi: 15 minuti a piedi</li>
                  <li>Vicina al centro città</li>
                  <li>Più servizi commerciali</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Campania Express per Pompei */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚄 Campania Express per Pompei
            </h2>
            <p className="text-gray-700 mb-4">
              Il <strong>Campania Express</strong> è l&apos;opzione premium per raggiungere Pompei,
              con fermate limitate e maggior comfort.
            </p>
            <div className="bg-blue-50 border rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Vantaggi per i turisti:</h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Tempo di viaggio ridotto (30 minuti circa)</li>
                <li>Aria condizionata e comfort superiore</li>
                <li>Meno affollato dei treni regionali</li>
                <li>Fermata diretta a Pompei Scavi</li>
                <li>Perfetto per gruppi turistici</li>
              </ul>
              <p className="text-blue-600 text-sm mt-3">
                <strong>Nota:</strong> Servizio stagionale attivo da marzo a ottobre
              </p>
            </div>
          </section>

          {/* Orari e frequenze */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⏰ Orari e Frequenze</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Treni Regionali</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Frequenza: ogni 30 minuti circa</li>
                  <li>Primo treno: 05:00 circa</li>
                  <li>Ultimo treno: 22:00 circa</li>
                  <li>Servizio tutto l&apos;anno</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Campania Express</h3>
                <ul className="list-disc pl-5 text-blue-600 space-y-2">
                  <li>Frequenza: ogni ora circa</li>
                  <li>Servizio: marzo - ottobre</li>
                  <li>Orari: mattina e pomeriggio</li>
                  <li>Prenotazione consigliata</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Consigli per la visita */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Consigli per Visitare Pompei
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Prima della Partenza</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Prenota online i biglietti per gli Scavi</li>
                  <li>Controlla gli orari di apertura</li>
                  <li>Porta abbigliamento comodo e cappello</li>
                  <li>Scarica l&apos;app di VesuviaSearch per gli orari</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Al Ritorno</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Verifica gli orari di ritorno</li>
                  <li>La stazione può essere affollata</li>
                  <li>Considera di visitare anche Sorrento</li>
                  <li>Tieni il biglietto fino all&apos;uscita</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Attrazioni vicine */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🗺️ Cosa Vedere Vicino a Pompei
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">🌋 Vesuvio</h3>
                <p className="text-sm text-gray-600">
                  Il vulcano che distrusse Pompei. Raggiungibile con autobus da Pompei.
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">🏛️ Ercolano</h3>
                <p className="text-sm text-gray-600">
                  Altro sito archeologico, facilmente raggiungibile con la Circumvesuviana.
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">⛪ Santuario</h3>
                <p className="text-sm text-gray-600">
                  Santuario della Madonna di Pompei, meta di pellegrinaggio.
                </p>
              </div>
            </div>
          </section>

          {/* Biglietti e prezzi */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎫 Biglietti e Prezzi</h2>
            <div className="bg-yellow-50 border rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Informazioni Importanti:</h3>
              <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                <li>I prezzi variano in base alla destinazione</li>
                <li>Biglietti disponibili alle stazioni e online</li>
                <li>Validare sempre il biglietto prima di salire</li>
                <li>Esistono biglietti combinati treno + scavi</li>
                <li>Riduzioni per gruppi e studenti</li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA finale */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Pianifica la tua visita a Pompei</h2>
          <p className="mb-6">
            Trova gli orari migliori per raggiungere gli Scavi di Pompei con la Circumvesuviana
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Controlla Orari Treni
          </Link>
        </div>
      </div>
    </main>
  );
}
