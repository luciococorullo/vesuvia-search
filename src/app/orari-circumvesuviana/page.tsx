/**
 * @fileoverview Orari Circumvesuviana - SEO optimized page
 *
 * Comprehensive page for Circumvesuviana schedules and timetables
 */

import Link from "next/link";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import { FindTrains } from "../components/FindTrains";

export const metadata: Metadata = {
  title: "Orari Circumvesuviana Napoli Sorrento | Orari Treni EAV Aggiornati 2025",
  description:
    "🕐 Orari aggiornati della Circumvesuviana linea Napoli-Sorrento. Consulta tutti gli orari EAV, prime e ultime corse, frequenze e informazioni sui treni in tempo reale.",
  keywords: [
    "orari circumvesuviana",
    "orari treni circumvesuviana",
    "circumvesuviana napoli sorrento orari",
    "orari eav",
    "orari vesuviana",
    "prima corsa circumvesuviana",
    "ultima corsa circumvesuviana",
    "orari treni napoli sorrento",
    "tabelle orarie circumvesuviana",
  ],
  openGraph: {
    title: "Orari Circumvesuviana Napoli Sorrento - Orari EAV Aggiornati",
    description:
      "Consulta tutti gli orari aggiornati della Circumvesuviana linea Napoli-Sorrento. Prime e ultime corse, frequenze e orari in tempo reale.",
    url: "https://vesuvia-search.vercel.app/orari-circumvesuviana",
  },
};

export default function OrariCircumvesuviana() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Orari Circumvesuviana</h1>
          <p className="text-xl text-gray-600">
            Tutti gli orari aggiornati della linea Napoli-Sorrento
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Consulta orari in tempo reale</h2>
          <FindTrains />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Informazioni generali */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🕐 Informazioni Orari Generali
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Orari di Servizio</h3>
                <ul className="list-disc pl-5 text-blue-700 space-y-2">
                  <li>
                    <strong>Prima corsa:</strong> 05:00 circa
                  </li>
                  <li>
                    <strong>Ultima corsa:</strong> 22:30 circa
                  </li>
                  <li>
                    <strong>Frequenza:</strong> ogni 30 minuti
                  </li>
                  <li>
                    <strong>Servizio:</strong> tutti i giorni
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Tempo di Percorrenza</h3>
                <ul className="list-disc pl-5 text-green-700 space-y-2">
                  <li>
                    <strong>Napoli-Sorrento:</strong> 1h 10min
                  </li>
                  <li>
                    <strong>Napoli-Pompei:</strong> 40 minuti
                  </li>
                  <li>
                    <strong>Napoli-Ercolano:</strong> 20 minuti
                  </li>
                  <li>
                    <strong>Pompei-Sorrento:</strong> 30 minuti
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 border rounded-lg p-4 mt-4">
              <p className="text-yellow-800">
                <strong>⚠️ Nota:</strong> Gli orari possono subire variazioni. Consigliamo sempre di
                verificare gli orari aggiornati prima del viaggio.
              </p>
            </div>
          </section>

          {/* Prime e ultime corse */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌅 Prime e Ultime Corse</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">🔄 Napoli → Sorrento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Prima corsa</span>
                    <span className="text-green-700 font-bold">05:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-800">Ultima corsa</span>
                    <span className="text-red-700 font-bold">22:28</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">🔄 Sorrento → Napoli</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Prima corsa</span>
                    <span className="text-green-700 font-bold">05:35</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-800">Ultima corsa</span>
                    <span className="text-red-700 font-bold">23:05</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Frequenze per fascia oraria */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⏰ Frequenze per Fascia Oraria
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Fascia Oraria</th>
                    <th className="border border-gray-300 p-3 text-center">Frequenza</th>
                    <th className="border border-gray-300 p-3 text-center">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">05:00 - 07:00</td>
                    <td className="border border-gray-300 p-3 text-center">40-60 min</td>
                    <td className="border border-gray-300 p-3 text-center text-gray-600">
                      Servizio ridotto
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">07:00 - 09:00</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-semibold">
                      20-30 min
                    </td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      Ora di punta
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">09:00 - 17:00</td>
                    <td className="border border-gray-300 p-3 text-center">30-40 min</td>
                    <td className="border border-gray-300 p-3 text-center text-gray-600">
                      Servizio regolare
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium">17:00 - 20:00</td>
                    <td className="border border-gray-300 p-3 text-center text-green-600 font-semibold">
                      20-30 min
                    </td>
                    <td className="border border-gray-300 p-3 text-center text-green-600">
                      Ora di punta
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-medium">20:00 - 23:00</td>
                    <td className="border border-gray-300 p-3 text-center">40-60 min</td>
                    <td className="border border-gray-300 p-3 text-center text-gray-600">
                      Servizio serale
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Orari stazioni principali */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚉 Orari Stazioni Principali</h2>
            <p className="text-gray-700 mb-4">
              Tempi di percorrenza indicativi dalle stazioni principali:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Da Napoli Porta Nolana</h3>
                <div className="space-y-2">
                  {[
                    { station: "Ercolano Scavi", time: "22 min" },
                    { station: "Torre Annunziata", time: "35 min" },
                    { station: "Pompei Scavi", time: "42 min" },
                    { station: "Castellammare", time: "55 min" },
                    { station: "Vico Equense", time: "62 min" },
                    { station: "Sorrento", time: "72 min" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-gray-700">{item.station}</span>
                      <span className="font-semibold text-blue-600">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Da Sorrento</h3>
                <div className="space-y-2">
                  {[
                    { station: "Sant'Agnello", time: "3 min" },
                    { station: "Piano di Sorrento", time: "6 min" },
                    { station: "Vico Equense", time: "15 min" },
                    { station: "Castellammare", time: "22 min" },
                    { station: "Pompei Scavi", time: "32 min" },
                    { station: "Napoli Porta Nolana", time: "72 min" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-gray-700">{item.station}</span>
                      <span className="font-semibold text-purple-600">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Variazioni stagionali */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Variazioni Stagionali</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="text-lg font-semibold text-green-700 mb-3">🌞 Estate (Giu-Set)</h3>
                <ul className="list-disc pl-5 text-green-600 space-y-1 text-sm">
                  <li>Frequenza aumentata</li>
                  <li>Servizio Campania Express attivo</li>
                  <li>Corse aggiuntive nei weekend</li>
                  <li>Orari prolungati</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">🍂 Mezza Stagione</h3>
                <ul className="list-disc pl-5 text-blue-600 space-y-1 text-sm">
                  <li>Orari standard</li>
                  <li>Campania Express limitato</li>
                  <li>Frequenza regolare</li>
                  <li>Servizio normale</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">❄️ Inverno (Nov-Feb)</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                  <li>Frequenza ridotta</li>
                  <li>Campania Express sospeso</li>
                  <li>Possibili variazioni meteo</li>
                  <li>Orari invernali</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Giorni festivi */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎊 Orari nei Giorni Festivi</h2>
            <div className="bg-orange-50 border rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-3">Modifiche nei giorni festivi:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Domeniche e festivi</h4>
                  <ul className="list-disc pl-5 text-orange-600 space-y-1 text-sm">
                    <li>Frequenza ridotta (45-60 minuti)</li>
                    <li>Prime corse posticipate</li>
                    <li>Ultime corse anticipate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-700 mb-2">Festività particolari</h4>
                  <ul className="list-disc pl-5 text-orange-600 space-y-1 text-sm">
                    <li>Natale: servizio ridotto</li>
                    <li>Capodanno: orari speciali</li>
                    <li>Pasqua: verificare avvisi</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* App e risorse */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📱 Come Consultare gli Orari</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-semibold text-gray-700 mb-2">VesuviaSearch</h3>
                <p className="text-sm text-gray-600">
                  Ricerca veloce e intuitiva degli orari in tempo reale
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-gray-700 mb-2">Sito EAV</h3>
                <p className="text-sm text-gray-600">Orari ufficiali e comunicazioni del gestore</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">🚉</div>
                <h3 className="font-semibold text-gray-700 mb-2">Stazioni</h3>
                <p className="text-sm text-gray-600">
                  Tabelle orarie affisse nelle stazioni principali
                </p>
              </div>
            </div>
          </section>

          {/* Consigli pratici */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              💡 Consigli per Consultare gli Orari
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Prima del viaggio</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Verifica sempre gli orari aggiornati</li>
                  <li>Controlla eventuali avvisi di servizio</li>
                  <li>Pianifica un margine di 10-15 minuti</li>
                  <li>Considera alternative in caso di ritardi</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Suggerimenti utili</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Evita le ore di punta se possibile</li>
                  <li>In estate arriva con più anticipo</li>
                  <li>Tieni presente le variazioni festive</li>
                  <li>Usa app per aggiornamenti in tempo reale</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA finale */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Consulta gli orari aggiornati</h2>
          <p className="mb-6">
            Trova gli orari più comodi per il tuo viaggio con la Circumvesuviana
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerca Orari Ora
          </Link>
        </div>
      </div>
    </main>
  );
}
