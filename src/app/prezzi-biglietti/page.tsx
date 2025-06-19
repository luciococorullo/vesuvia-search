/**
 * @fileoverview Prezzi Biglietti Circumvesuviana - SEO optimized page
 */

import { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Prezzi Biglietti Circumvesuviana 2025 | Tariffe Treni Napoli Sorrento EAV",
  description:
    "💰 Scopri i prezzi aggiornati dei biglietti della Circumvesuviana. Tariffe per Napoli-Sorrento, Pompei, Ercolano. Campania Express, abbonamenti e riduzioni EAV.",
  keywords: [
    "prezzi circumvesuviana",
    "biglietti circumvesuviana",
    "tariffe eav",
    "costo treno napoli sorrento",
    "prezzo biglietto pompei",
    "abbonamenti circumvesuviana",
    "campania express prezzo",
    "biglietti vesuviana",
  ],
};

export default function PrezziBiglietti() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Prezzi Biglietti Circumvesuviana
          </h1>
          <p className="text-xl text-gray-600">Tariffe aggiornate per tutti i treni EAV</p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Tariffe Principali</h2>
            <div className="bg-yellow-50 border rounded-lg p-4 mb-4">
              <p className="text-yellow-800">
                <strong>⚠️ Importante:</strong> I prezzi indicati sono orientativi. Per le tariffe
                ufficiali aggiornate consultare il sito EAV.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">🎫 Biglietti Ordinari</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Napoli - Ercolano</span>
                    <span className="font-semibold">€ 2,00</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Napoli - Pompei</span>
                    <span className="font-semibold">€ 2,80</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Napoli - Sorrento</span>
                    <span className="font-semibold">€ 3,60</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">⭐ Campania Express</h3>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-blue-50 rounded">
                    <span>Napoli - Pompei</span>
                    <span className="font-semibold">€ 10,00</span>
                  </div>
                  <div className="flex justify-between p-3 bg-blue-50 rounded">
                    <span>Napoli - Sorrento</span>
                    <span className="font-semibold">€ 15,00</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎟️ Dove Acquistare i Biglietti
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">🏪</div>
                <h3 className="font-semibold text-gray-700 mb-2">Stazioni</h3>
                <p className="text-sm text-gray-600">Biglietterie e distributori automatici</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-semibold text-gray-700 mb-2">Online</h3>
                <p className="text-sm text-gray-600">Sito ufficiale EAV</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-3">🏨</div>
                <h3 className="font-semibold text-gray-700 mb-2">Agenzie</h3>
                <p className="text-sm text-gray-600">Hotel e agenzie turistiche</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
