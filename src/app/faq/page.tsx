/**
 * @fileoverview FAQ page for VesuviaSearch
 *
 * Dedicated FAQ page with rich, keyword-focused content about trains in Napoli province.
 * This page helps improve SEO by addressing common search queries about Circumvesuviana
 * and EAV trains in the Napoli area.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";
import SEOBreadcrumbs from "@/components/SEOBreadcrumbs";

// SEO Metadata
export const metadata: Metadata = {
  title: "FAQ Treni Napoli | Domande frequenti Circumvesuviana | VesuviaSearch",
  description:
    "Risposte alle domande più frequenti sui treni della Circumvesuviana ed EAV a Napoli e provincia. Orari, biglietti, stazioni e collegamenti per Sorrento, Pompei e altre destinazioni.",
  keywords: [
    "orari circumvesuviana napoli",
    "come arrivare a pompei da napoli",
    "orari treni sorrento napoli",
    "biglietti circumvesuviana",
    "stazioni circumvesuviana napoli",
    "ultimo treno napoli sorrento",
    "campania express orari",
    "circumvesuviana napoli ercolano",
    "treno napoli pompei quanto tempo",
    "circumvesuviana napoli torre annunziata",
  ],
};

export default function FAQPage() {
  // Structured data specifico per la pagina FAQ
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Come posso raggiungere Sorrento con la Circumvesuviana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Circumvesuviana offre un servizio frequente per Sorrento. È il modo più comodo per raggiungere la Penisola Sorrentina da Napoli.",
        },
      },
      {
        "@type": "Question",
        name: "Qual è l&apos;orario dell&apos;ultimo treno da Napoli a Sorrento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L&apos;ultimo treno da Napoli a Sorrento parte generalmente intorno alle 21:40 da Napoli Porta Nolana. Gli orari possono variare, quindi è sempre meglio verificare su VesuviaSearch.",
        },
      },
      {
        "@type": "Question",
        name: "Come arrivare a Pompei Scavi da Napoli con la Circumvesuviana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prendi un treno della Circumvesuviana da Napoli Porta Nolana o Piazza Garibaldi diretto a Sorrento o Poggiomarino. Scendi alla fermata &apos;Pompei Scavi - Villa dei Misteri&apos; dopo circa 35 minuti. Per informazioni sui prezzi, consulta i punti vendita EAV.",
        },
      },
      {
        "@type": "Question",
        name: "Dove si trova la stazione principale della Circumvesuviana a Napoli?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le due stazioni principali sono: Napoli Porta Nolana (capolinea di tutte le linee) e Napoli Piazza Garibaldi (seconda fermata, collegata alla stazione centrale FS e metropolitana).",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      {/* Structured Data per FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <SEOBreadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Orari Treni Napoli", url: "/" },
          ]}
          currentPage="FAQ Treni Napoli"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 text-center">
          Domande frequenti sui treni a Napoli e provincia
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12 text-center">
          Tutto quello che devi sapere sui treni della Circumvesuviana, orari, biglietti e
          collegamenti nella provincia di Napoli
        </p>

        {/* FAQ Content */}
        <div className="space-y-12">
          {/* General Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
              Informazioni generali sulla Circumvesuviana
            </h2>

            <div className="space-y-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Cos&apos;è la Circumvesuviana?</h3>
                <p>
                  La <strong>Circumvesuviana</strong> è una rete ferroviaria che serve l&apos;area
                  vesuviana nella provincia di Napoli, gestita dall&apos;Ente Autonomo Volturno
                  (EAV). Collega Napoli con diverse località come Sorrento, Pompei, Ercolano e molte
                  altre città e paesi nell&apos;area del Vesuvio.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">
                  Quali sono le principali linee della Circumvesuviana?
                </h3>
                <p>Le principali linee della Circumvesuviana sono:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Napoli - Sorrento</strong>: la linea più utilizzata dai turisti
                  </li>
                  <li>
                    <strong>Napoli - Pompei - Poggiomarino</strong>: per Pompei Scavi e comuni
                    vesuviani
                  </li>
                  <li>
                    <strong>Napoli - Ottaviano - Sarno</strong>: serve la zona nord-orientale
                  </li>
                  <li>
                    <strong>Napoli - Baiano</strong>: collega con l&apos;area nolana
                  </li>
                  <li>
                    <strong>Napoli - San Giorgio a Cremano</strong>: linea metropolitana
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">
                  Dove si trova la stazione principale a Napoli?
                </h3>
                <p>A Napoli ci sono due stazioni principali per la Circumvesuviana:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Napoli Porta Nolana</strong>: capolinea di tutte le linee
                    Circumvesuviana
                  </li>
                  <li>
                    <strong>Napoli Piazza Garibaldi</strong>: seconda fermata, situata sotto la
                    stazione centrale FS
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Routes Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
              Collegamenti e destinazioni turistiche
            </h2>

            <div className="space-y-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Come arrivare a Pompei da Napoli?</h3>
                <p>
                  Per raggiungere gli <strong>Scavi di Pompei</strong> da Napoli:
                </p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Prendi un treno della Circumvesuviana dalla stazione di Napoli Porta Nolana o
                    Piazza Garibaldi
                  </li>
                  <li>Scegli un treno diretto a Sorrento o Poggiomarino</li>
                  <li>
                    Scendi alla fermata <strong>Pompei Scavi - Villa dei Misteri</strong> (circa 35
                    minuti di viaggio)
                  </li>
                  <li>
                    L&apos;ingresso agli scavi archeologici è a pochi passi dall&apos;uscita della
                    stazione
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Come andare da Napoli a Sorrento?</h3>
                <p>
                  Per raggiungere <strong>Sorrento</strong> da Napoli:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Prendi un treno della linea Napoli-Sorrento dalla stazione di Napoli Porta
                    Nolana o Piazza Garibaldi
                  </li>
                  <li>Il viaggio dura circa 1 ora e 15 minuti</li>
                  <li>I treni partono ogni 30 minuti circa durante il giorno</li>
                  <li>
                    È disponibile anche il <strong>Campania Express</strong>, un servizio turistico
                    più veloce e confortevole
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Come arrivare a Ercolano Scavi?</h3>
                <p>
                  Per raggiungere gli <strong>Scavi di Ercolano</strong>:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Prendi un treno della Circumvesuviana dalla stazione di Napoli Porta Nolana o
                    Piazza Garibaldi
                  </li>
                  <li>Scegli qualsiasi treno diretto a Sorrento o Poggiomarino</li>
                  <li>
                    Scendi alla fermata <strong>Ercolano Scavi</strong> (circa 20 minuti di viaggio)
                  </li>
                  <li>
                    Dall&apos;uscita della stazione, segui le indicazioni per gli scavi (circa 10
                    minuti a piedi in discesa)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tickets and Fares Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">
              Biglietti, orari e informazioni pratiche
            </h2>

            <div className="space-y-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">
                  Quanto costa un biglietto della Circumvesuviana?
                </h3>
                <p>I prezzi variano in base alla distanza:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Napoli - Pompei Scavi</strong>: circa 2,80€ (biglietto standard)
                  </li>
                  <li>
                    <strong>Napoli - Sorrento</strong>: circa 3,60€ (biglietto standard)
                  </li>
                  <li>
                    <strong>Campania Express</strong> (treno turistico): prezzo maggiorato (circa 8€
                    per Pompei, 15€ per Sorrento)
                  </li>
                </ul>
                <p className="mt-2">
                  I biglietti si acquistano presso le biglietterie automatiche o gli sportelli nelle
                  stazioni.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">
                  Qual è l&apos;orario dell&apos;ultimo treno da Sorrento a Napoli?
                </h3>
                <p>
                  Generalmente, l&apos;ultimo treno da Sorrento a Napoli parte intorno alle 21:00.
                  Gli orari possono variare in base al giorno della settimana e alla stagione.
                  Controlla sempre gli orari aggiornati su VesuviaSearch prima di pianificare il
                  viaggio.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2">Che cos&apos;è il Campania Express?</h3>
                <p>
                  Il <strong>Campania Express</strong> è un servizio ferroviario turistico che
                  collega Napoli con le principali mete turistiche come Pompei, Ercolano e Sorrento.
                  Offre:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Carrozze moderne e climatizzate</li>
                  <li>Fermate limitate solo alle principali attrazioni</li>
                  <li>Tempi di percorrenza ridotti</li>
                  <li>Posto garantito a sedere</li>
                  <li>Maggiore sicurezza e comfort</li>
                </ul>
                <p className="mt-2">
                  Il servizio è disponibile principalmente durante la stagione turistica
                  (marzo-ottobre).
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Disclaimer Prezzi */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">ℹ️ Informazioni sui Prezzi</h3>
          <p className="text-yellow-700 text-sm leading-relaxed">
            Per informazioni aggiornate sui prezzi dei biglietti EAV e Circumvesuviana, ti invitiamo
            a consultare i punti vendita ufficiali EAV, le stazioni o il sito web ufficiale. I
            prezzi possono variare e VesuviaSearch fornisce esclusivamente informazioni sugli orari
            dei treni.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 bg-blue-100 py-8 px-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Pianifica subito il tuo viaggio con VesuviaSearch
          </h2>
          <p className="text-lg mb-6">
            Trova gli orari dei treni in tempo reale per Napoli e tutta la provincia
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Cerca orari dei treni
          </Link>
        </div>
      </div>
    </main>
  );
}
