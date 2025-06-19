/**
 * @fileoverview Campania Express - SEO optimized page
 *
 * Dedicated page for Campania Express tourist service information
 */

import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FindTrains } from "../components/FindTrains";

export const metadata: Metadata = {
  title: "Campania Express | Treno Turistico Napoli Sorrento Pompei | Orari e Prezzi",
  description:
    "🚄 Scopri il Campania Express: treno turistico premium da Napoli a Sorrento. Fermate a Ercolano e Pompei, aria condizionata, comfort superiore. Orari, prezzi e prenotazioni.",
  keywords: [
    "campania express",
    "treno turistico napoli sorrento",
    "campania express orari",
    "campania express prezzi",
    "treno premium circumvesuviana",
    "campania express pompei",
    "treno turistico campania",
    "eav campania express",
    "prenotazione campania express",
  ],
  openGraph: {
    title: "Campania Express - Treno Turistico Premium Napoli Sorrento",
    description:
      "Il treno turistico premium della Circumvesuviana con aria condizionata e fermate limitate.",
    url: "https://vesuvia-search.vercel.app/campania-express",
  },
};

export default function CampaniaExpress() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Campania Express</h1>
          <p className="text-xl text-gray-600">Il treno turistico premium della Circumvesuviana</p>
        </div>

        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🚄 Campania Express</h2>
            <p className="text-xl mb-6">Viaggia con comfort e stile da Napoli a Sorrento</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">❄️</div>
                <div className="font-semibold">Aria Condizionata</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold">Fermate Limitate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎫</div>
                <div className="font-semibold">Servizio Premium</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Trova orari Campania Express</h2>
          <FindTrains />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Che cos'è */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚄 Che cos&apos;è il Campania Express?
            </h2>
            <p className="text-gray-700 mb-4">
              Il <strong>Campania Express</strong> è un servizio turistico premium della
              <strong> Circumvesuviana</strong> gestito da EAV, progettato specificamente per i
              turisti che visitano la Campania. Offre un viaggio più confortevole e veloce tra
              Napoli, Ercolano, Pompei e Sorrento.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Caratteristiche principali:</h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Treni moderni con aria condizionata</li>
                <li>Fermate solo nelle stazioni principali</li>
                <li>Tempo di viaggio ridotto</li>
                <li>Maggior comfort e spazio</li>
                <li>Servizio dedicato ai turisti</li>
              </ul>
            </div>
          </section>

          {/* Fermate */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🚉 Fermate del Campania Express
            </h2>
            <p className="text-gray-700 mb-4">
              Il Campania Express effettua fermate solo nelle stazioni principali, garantendo un
              viaggio più veloce e diretto.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Napoli Garibaldi</div>
                    <div className="text-sm text-gray-600">Stazione centrale sotterranea</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Ercolano Scavi</div>
                    <div className="text-sm text-gray-600">Per gli scavi di Ercolano</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Pompei Scavi</div>
                    <div className="text-sm text-gray-600">Per gli scavi di Pompei</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Sorrento</div>
                    <div className="text-sm text-gray-600">Destinazione finale</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Orari e stagionalità */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Orari e Stagionalità</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-700 mb-3">🌞 Stagione Operativa</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    Periodo: <strong>Marzo - Ottobre</strong>
                  </li>
                  <li>Servizio quotidiano in alta stagione</li>
                  <li>Orari adattati ai flussi turistici</li>
                  <li>Servizio sospeso in inverno</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">⏰ Frequenza</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Frequenza: ogni ora circa</li>
                  <li>Prima corsa: mattina presto</li>
                  <li>Ultima corsa: sera</li>
                  <li>Orari variabili per stagione</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 border rounded-lg p-4 mt-4">
              <p className="text-yellow-800">
                <strong>⚠️ Importante:</strong> Gli orari possono variare in base alla stagione.
                Verifica sempre gli orari aggiornati prima del viaggio.
              </p>
            </div>
          </section>

          {/* Vantaggi */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⭐ Vantaggi del Campania Express
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Comfort</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Aria condizionata in tutti i vagoni</li>
                  <li>Sedili più confortevoli</li>
                  <li>Maggior spazio per le gambe</li>
                  <li>Ambiente più pulito e moderno</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Velocità</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Fermate solo nelle stazioni principali</li>
                  <li>Tempo di viaggio ridotto del 30%</li>
                  <li>Meno affollamento</li>
                  <li>Servizio più puntuale</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prezzi e biglietti */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎫 Biglietti e Prezzi</h2>
            <div className="bg-green-50 border rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">Tariffe:</h3>
              <ul className="list-disc pl-5 text-green-700 space-y-1">
                <li>Prezzo superiore ai treni regionali</li>
                <li>Tariffa unica per tutto il percorso</li>
                <li>Possibilità di biglietti combinati con attrazioni</li>
                <li>Riduzioni per gruppi organizzati</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">Dove acquistare</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                  <li>Stazioni principali</li>
                  <li>Sito web ufficiale EAV</li>
                  <li>Agenzie di viaggio</li>
                  <li>Hotel e strutture turistiche</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">Consigli utili</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                  <li>Prenotazione consigliata in alta stagione</li>
                  <li>Validare sempre il biglietto</li>
                  <li>Conservare il biglietto per tutto il viaggio</li>
                  <li>Verificare orari prima della partenza</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Confronto con treni regionali */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⚖️ Campania Express vs Treni Regionali
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Caratteristica</th>
                    <th className="border border-gray-300 p-3 text-center">Campania Express</th>
                    <th className="border border-gray-300 p-3 text-center">Treni Regionali</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Tempo di viaggio</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      50 min ✓
                    </td>
                    <td className="border border-gray-300 p-3 text-center">70 min</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">Aria condizionata</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">Sì ✓</td>
                    <td className="border border-gray-300 p-3 text-center text-red-600">No ✗</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Frequenza</td>
                    <td className="border border-gray-300 p-3 text-center">Ogni ora</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      Ogni 30 min ✓
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">Prezzo</td>
                    <td className="border border-gray-300 p-3 text-center">Superiore</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      Economico ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">Disponibilità</td>
                    <td className="border border-gray-300 p-3 text-center">Mar-Ott</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      Tutto l&apos;anno ✓
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Consigli */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Consigli per il Viaggio</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-blue-700 mb-2">Prima del viaggio</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verifica la stagionalità</li>
                  <li>• Prenota in anticipo</li>
                  <li>• Controlla orari aggiornati</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h3 className="font-semibold text-green-700 mb-2">Durante il viaggio</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Goditi il comfort</li>
                  <li>• Ammira il paesaggio</li>
                  <li>• Tieni il biglietto</li>
                </ul>
              </div>
              <div className="border-l-4 border-amber-400 pl-4">
                <h3 className="font-semibold text-amber-700 mb-2">Al ritorno</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pianifica il rientro</li>
                  <li>• Controlla ultimo treno</li>
                  <li>• Alternative disponibili</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA finale */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Viaggia con il Campania Express</h2>
          <p className="mb-6">Scopri gli orari e pianifica il tuo viaggio premium in Campania</p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Controlla Orari
          </Link>
        </div>
      </div>
    </main>
  );
}
