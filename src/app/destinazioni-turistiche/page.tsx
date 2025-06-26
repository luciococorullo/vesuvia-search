/**
 * @fileoverview Destinazioni Turistiche page
 *
 * Dedicated page for tourist destinations reachable from Naples via Circumvesuviana,
 * optimized for tourism-related SEO queries about trains to Pompeii, Sorrento, Herculaneum, etc.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import Navbar from "../components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🚆 Destinazioni Turistiche da Napoli | Circumvesuviana | VesuviaSearch",
  description:
    "Scopri come raggiungere Pompei, Sorrento, Ercolano e altre meraviglie della Campania da Napoli con la Circumvesuviana. Orari e consigli utili per turisti.",
  keywords: [
    "come arrivare a pompei da napoli",
    "come andare a sorrento da napoli",
    "treno napoli ercolano scavi",
    "circumvesuviana destinazioni turistiche",
    "pompei come arrivare treno",
    "sorrento come raggiungere da napoli",
    "ercolano scavi come arrivare",
    "vico equense da napoli",
    "castellammare di stabia treno",
    "meta sorrento circumvesuviana",
    "mete turistiche circumvesuviana",
    "gita fuori porta da napoli treno",
    "turismo napoli treni",
    "escursioni da napoli in treno",
  ],
  openGraph: {
    title: "🚆 Destinazioni Turistiche da Napoli | Circumvesuviana",
    description:
      "Pompei, Sorrento, Ercolano: scopri come raggiungerle facilmente da Napoli con la Circumvesuviana. Guida completa per turisti.",
    images: [
      {
        url: "/og-destinazioni.jpg",
        width: 1200,
        height: 630,
        alt: "Destinazioni turistiche raggiungibili da Napoli con la Circumvesuviana",
      },
    ],
  },
};

export default function DestinazioniTuristichePage() {
  const destinazioni = [
    {
      nome: "Pompei Scavi",
      durata: "35 minuti",
      frequenza: "Ogni 30 minuti",
      descrizione:
        "Il sito archeologico più famoso del mondo. I resti dell&apos;antica città romana sepolta dal Vesuvio nel 79 d.C.",
      attrazioni: [
        "Casa del Fauno",
        "Teatro Grande",
        "Anfiteatro",
        "Villa dei Misteri",
        "Lupanare",
      ],
      consigli: [
        "Scendi alla fermata &apos;Pompei Scavi - Villa dei Misteri&apos;",
        "L&apos;ingresso agli scavi è a 100 metri dalla stazione",
        "Prenota online per evitare code, soprattutto in alta stagione",
        "Porta acqua e cappello, il sito è molto esposto al sole",
      ],
      ultimoTreno: "21:40 da Napoli",
    },
    {
      nome: "Sorrento",
      durata: "1 ora 15 minuti",
      frequenza: "Ogni 30 minuti",
      descrizione:
        "Perla della Penisola Sorrentina, famosa per i limoni, il limoncello e le viste mozzafiato sul Golfo di Napoli.",
      attrazioni: [
        "Centro storico",
        "Marina Grande",
        "Villa Comunale",
        "Museo Correale",
        "Chiostro di San Francesco",
      ],
      consigli: [
        "Il Campania Express è più veloce e confortevole",
        "Da Sorrento partono traghetti per Capri e Ischia",
        "Il centro è raggiungibile a piedi dalla stazione",
        "Assaggia il limoncello e i dolci tipici",
      ],
      ultimoTreno: "21:00 da Sorrento",
    },
    {
      nome: "Ercolano Scavi",
      durata: "20 minuti",
      frequenza: "Ogni 20 minuti",
      descrizione:
        "Sito archeologico meglio conservato di Pompei, con strutture in legno e mosaici intatti.",
      attrazioni: [
        "Casa dei Cervi",
        "Terme",
        "Casa del Rilievo di Telefo",
        "Villa dei Papiri",
        "Teatro",
      ],
      consigli: [
        "Scendi alla fermata &apos;Ercolano Scavi&apos;",
        "Gli scavi sono in discesa, circa 10 minuti a piedi",
        "Visita anche il MAV (Museo Archeologico Virtuale)",
        "Combinabile con la visita al Vesuvio",
      ],
      ultimoTreno: "22:30 da Napoli",
    },
    {
      nome: "Vico Equense",
      durata: "50 minuti",
      frequenza: "Ogni 30 minuti",
      descrizione:
        "Borgo marinaro con splendide spiagge e il famoso &apos;cuoppo&apos; di pizza fritta.",
      attrazioni: [
        "Centro storico",
        "Spiaggia di Marina di Vico",
        "Chiesa dell&apos;Annunziata",
        "Castello Giusso",
      ],
      consigli: [
        "Famoso per la pizza a portafoglio e il cuoppo",
        "Belle spiagge raggiungibili a piedi",
        "Punto di partenza per escursioni sui Monti Lattari",
        "Vista panoramica sul Golfo di Napoli",
      ],
      ultimoTreno: "21:20 da Napoli",
    },
    {
      nome: "Castellammare di Stabia",
      durata: "40 minuti",
      frequenza: "Ogni 30 minuti",
      descrizione:
        "Città termale con spiagge e il porto per Capri. Punto di partenza della funivia del Monte Faito.",
      attrazioni: ["Terme Stabiane", "Villa San Marco", "Porto turistico", "Funivia Monte Faito"],
      consigli: [
        "Le terme sono aperte tutto l&apos;anno",
        "Da qui partono traghetti per Capri",
        "La funivia del Monte Faito offre viste spettacolari",
        "Spiagge libere e stabilimenti balneari",
      ],
      ultimoTreno: "21:50 da Napoli",
    },
    {
      nome: "Torre Annunziata",
      durata: "30 minuti",
      frequenza: "Ogni 20 minuti",
      descrizione: "Città industriale con importanti siti archeologici e spiagge.",
      attrazioni: ["Villa di Poppea (Oplontis)", "Spiaggia libera", "Centro storico"],
      consigli: [
        "Visita la Villa di Poppea, patrimonio UNESCO",
        "Ottimo punto di partenza per Pompei",
        "Spiagge meno affollate rispetto ad altre località",
        "Combinabile con visita a Pompei",
      ],
      ultimoTreno: "22:10 da Napoli",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 text-center">
          Destinazioni Turistiche da Napoli con la Circumvesuviana
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12 text-center">
          Scopri le meraviglie della Campania facilmente raggiungibili da Napoli con i treni della
          Circumvesuviana. Dai siti archeologici di fama mondiale alle perle della costiera.
        </p>

        {/* Sezione introduttiva */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Perché scegliere la Circumvesuviana per le tue gite turistiche
          </h2>
          <div className="prose max-w-none">
            <p>
              La <strong>Circumvesuviana</strong> è il mezzo di trasporto ideale per esplorare le
              destinazioni turistiche più famose della provincia di Napoli. Economica, frequente e
              ben collegata, ti permette di raggiungere siti archeologici patrimonio
              dell&apos;UNESCO, borghi marinari incantevoli e paesaggi mozzafiato.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800">Economico</h3>
                <p className="text-sm">Biglietti per le principali destinazioni</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800">Frequente</h3>
                <p className="text-sm">Treni ogni 20-30 minuti durante il giorno</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800">Diretto</h3>
                <p className="text-sm">Collegamenti diretti senza cambi da Napoli</p>
              </div>
            </div>
          </div>
        </div>

        {/* Griglia delle destinazioni */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {destinazioni.map((dest, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <div className="bg-gradient-to-r from-blue-800 to-red-600 text-white p-6">
                <h3 className="text-2xl font-bold">{dest.nome}</h3>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="opacity-75">Durata viaggio:</span>
                    <div className="font-semibold">{dest.durata}</div>
                  </div>
                  <div>
                    <span className="opacity-75">Frequenza:</span>
                    <div className="font-semibold">{dest.frequenza}</div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 mb-4">{dest.descrizione}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Principali attrazioni:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {dest.attrazioni.map((attr, i) => (
                      <li key={i}>{attr}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Consigli utili:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {dest.consigli.map((consiglio, i) => (
                      <li key={i}>{consiglio}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Ultimo treno:</span>
                      <div className="font-semibold text-orange-600">{dest.ultimoTreno}</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href={`/search?from=Napoli&to=${encodeURIComponent(dest.nome)}`}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors inline-block"
                  >
                    Trova orari per {dest.nome}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sezione consigli generali */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Consigli per una gita perfetta con la Circumvesuviana
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-blue-700">Prima di partire</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Controlla gli orari aggiornati su VesuviaSearch</li>
                <li>Acquista i biglietti in anticipo nelle stazioni principali</li>
                <li>Verifica l&apos;orario dell&apos;ultimo treno di ritorno</li>
                <li>Porta con te acqua e snack per il viaggio</li>
                <li>In alta stagione (luglio-agosto) parti presto al mattino</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-blue-700">Durante il viaggio</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Tieni i tuoi effetti personali sempre sotto controllo</li>
                <li>Nelle ore di punta i treni possono essere molto affollati</li>
                <li>Scendi sempre alla fermata giusta (alcune hanno nomi simili)</li>
                <li>Conserva il biglietto fino alla fine del viaggio</li>
                <li>Goditi il panorama, soprattutto verso Sorrento!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA finale */}
        <div className="text-center bg-gradient-to-r from-blue-100 to-red-100 py-8 px-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Inizia la tua avventura dalla Circumvesuviana
          </h2>
          <p className="text-lg mb-6">
            Trova gli orari dei treni per tutte le destinazioni turistiche da Napoli
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
          >
            Cerca orari dei treni
          </Link>
        </div>
      </div>
    </main>
  );
}
