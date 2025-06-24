/**
 * @fileoverview Stazioni di Napoli page
 *
 * Dedicated page for train stations in Napoli, optimized for local SEO.
 * Includes comprehensive information about all Circumvesuviana and EAV stations
 * in Napoli with details useful for both residents and tourists.
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import Navbar from '../components/Navbar';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Stazioni Circumvesuviana Napoli | Tutte le fermate EAV | VesuviaSearch",
  description: "Informazioni complete su tutte le stazioni della Circumvesuviana a Napoli. Orari, servizi e collegamenti per ogni fermata EAV. Guida per turisti e residenti.",
  keywords: [
    "stazioni circumvesuviana napoli",
    "fermate eav napoli",
    "stazione napoli porta nolana",
    "circumvesuviana napoli piazza garibaldi",
    "stazioni treni napoli",
    "fermate treno napoli provincia",
    "mappa stazioni circumvesuviana",
    "stazioni circumvesuviana napoli centro",
    "orari stazione circumvesuviana napoli"
  ]
};

export default function StazioniNapoliPage() {
  // Definizione delle stazioni della Circumvesuviana a Napoli e provincia
  const stazioniNapoli = [
    {
      nome: "Napoli Porta Nolana",
      descrizione: "Stazione principale e capolinea di tutte le linee della Circumvesuviana",
      servizi: ["Biglietteria", "Servizi igienici", "Bar", "Sala d&apos;attesa"],
      linee: ["Napoli-Sorrento", "Napoli-Sarno", "Napoli-Baiano", "Napoli-Poggiomarino"],
      collegamenti: ["Metro Linea 1", "Bus urbani"]
    },
    {
      nome: "Napoli Piazza Garibaldi",
      descrizione: "Seconda fermata principale, collegata con la stazione centrale FS e metropolitana",
      servizi: ["Biglietteria", "Servizi igienici", "Negozi", "Food court"],
      linee: ["Napoli-Sorrento", "Napoli-Sarno", "Napoli-Baiano", "Napoli-Poggiomarino"],
      collegamenti: ["Stazione Centrale FS", "Metro Linea 1 e 2", "Bus urbani e regionali"]
    },
    {
      nome: "Napoli Centro Direzionale",
      descrizione: "Fermata che serve il moderno quartiere degli affari di Napoli",
      servizi: ["Biglietteria automatica"],
      linee: ["Napoli-Sarno", "Napoli-Baiano", "Napoli-Poggiomarino"],
      collegamenti: ["Bus urbani"]
    },
    {
      nome: "Napoli Gianturco",
      descrizione: "Fermata che serve la zona industriale est di Napoli",
      servizi: ["Biglietteria automatica"],
      linee: ["Napoli-Sorrento", "Napoli-Sarno", "Napoli-Baiano", "Napoli-Poggiomarino"],
      collegamenti: ["Bus urbani"]
    },
    {
      nome: "Napoli San Giovanni-Barra",
      descrizione: "Fermata che serve il quartiere di San Giovanni a Teduccio",
      servizi: ["Biglietteria automatica"],
      linee: ["Napoli-Sorrento", "Napoli-Sarno", "Napoli-Poggiomarino"],
      collegamenti: ["Bus urbani"]
    },
    {
      nome: "Napoli Poggioreale",
      descrizione: "Fermata che serve il quartiere di Poggioreale e il cimitero monumentale",
      servizi: ["Biglietteria automatica"],
      linee: ["Napoli-Sarno", "Napoli-Baiano", "Napoli-Poggiomarino"],
      collegamenti: ["Bus urbani"]
    },
    {
      nome: "Napoli Ponticelli",
      descrizione: "Fermata che serve il quartiere periferico di Ponticelli",
      servizi: ["Biglietteria automatica"],
      linee: ["Napoli-Sarno", "Napoli-Baiano"],
      collegamenti: ["Bus urbani"]
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 text-center">
          Stazioni Circumvesuviana a Napoli
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12 text-center">
          Tutte le informazioni sulle stazioni della Circumvesuviana ed EAV a Napoli, 
          con dettagli su servizi, linee e collegamenti per facilitare i tuoi spostamenti
        </p>

        {/* Sezione introduttiva con info utili */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Informazioni generali sulle stazioni EAV a Napoli
          </h2>
          <div className="prose max-w-none">
            <p>
              La rete ferroviaria Circumvesuviana gestita da EAV (Ente Autonomo Volturno) ha diverse 
              stazioni nella città di Napoli che permettono ai residenti e ai turisti di spostarsi 
              facilmente in tutta l&apos;area metropolitana e verso le principali attrazioni turistiche della provincia.
            </p>
            <p className="mt-3">
              Le due stazioni principali sono <strong>Napoli Porta Nolana</strong> (capolinea) e 
              <strong> Napoli Piazza Garibaldi</strong> (collegata alla stazione centrale FS). 
              Da queste stazioni partono tutte le linee Circumvesuviana che collegano Napoli con 
              Sorrento, Pompei, Ercolano, Sarno e altri importanti centri della provincia.
            </p>
            <p className="mt-3">
              Le stazioni Circumvesuviana a Napoli sono generalmente aperte dalle <strong>6:00 alle 23:00</strong>, 
              con orari che possono variare leggermente nei giorni festivi.
            </p>
          </div>
        </div>
        
        {/* Elenco dettagliato delle stazioni */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {stazioniNapoli.map((stazione, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="bg-blue-800 text-white p-4">
                <h3 className="text-xl font-semibold">{stazione.nome}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{stazione.descrizione}</p>
                
                <div className="mb-3">
                  <h4 className="font-semibold text-blue-800">Linee:</h4>
                  <ul className="list-disc pl-5">
                    {stazione.linee.map((linea, i) => (
                      <li key={i} className="text-sm text-gray-600">{linea}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-semibold text-blue-800">Servizi disponibili:</h4>
                  <ul className="list-disc pl-5">
                    {stazione.servizi.map((servizio, i) => (
                      <li key={i} className="text-sm text-gray-600">{servizio}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-800">Collegamenti:</h4>
                  <ul className="list-disc pl-5">
                    {stazione.collegamenti.map((collegamento, i) => (
                      <li key={i} className="text-sm text-gray-600">{collegamento}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 text-center">
                  <Link href={`/search?from=${encodeURIComponent(stazione.nome)}`} className="text-sm bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors inline-block">
                    Trova treni in partenza
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Consigli per i viaggiatori */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Consigli utili per viaggiare sulla Circumvesuviana da Napoli
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Per i residenti</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Valutate l&apos;acquisto di abbonamenti settimanali o mensili se viaggiate regolarmente</li>
                <li>Nelle ore di punta (7:30-9:00 e 17:00-19:30) i treni possono essere molto affollati</li>
                <li>Scaricate l&apos;app EAV per controllare gli orari in tempo reale e eventuali ritardi</li>
                <li>Da Piazza Garibaldi potete facilmente cambiare per Metro e Ferrovie dello Stato</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Per i turisti</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Considerate il Campania Express per raggiungere le destinazioni turistiche principali con maggiore comfort</li>
                <li>Acquistate i biglietti in anticipo per evitare code, specialmente in alta stagione</li>
                <li>Fate attenzione ai vostri effetti personali, soprattutto nelle stazioni più affollate</li>
                <li>Verificate sempre gli orari dell&apos;ultimo treno per il rientro quando visitate mete turistiche</li>
                <li>Il servizio non è sempre puntuale, prevedete un margine di tempo nei vostri spostamenti</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA per la ricerca */}
        <div className="text-center bg-blue-100 py-8 px-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Pianifica il tuo viaggio da Napoli
          </h2>
          <p className="text-lg mb-6">
            Trova gli orari dei treni in tempo reale da qualsiasi stazione di Napoli
          </p>
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Cerca orari dei treni
          </Link>
        </div>
      </div>
    </main>
  );
}
