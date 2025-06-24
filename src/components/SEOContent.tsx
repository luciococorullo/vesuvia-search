/**
 * SEOContent Component
 * 
 * Questo componente aggiunge contenuti SEO friendly alla homepage.
 * Include informazioni rilevanti sui treni a Napoli e provincia con keyword ottimizzate
 * per migliorare il posizionamento nei motori di ricerca.
 */

import React from 'react';

const SEOContent = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-700 text-sm leading-relaxed">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Orari Treni Napoli e Provincia</h2>
          <p className="mb-3">
            <strong>VesuviaSearch</strong> è il servizio più aggiornato e completo per consultare gli 
            <strong> orari dei treni della Circumvesuviana</strong> ed EAV in tutta la provincia di Napoli. 
            Ideale per residenti, pendolari e turisti che desiderano spostarsi facilmente 
            tra Napoli, Sorrento, Pompei e tutte le destinazioni servite dalla rete EAV.
          </p>
          <p className="mb-3">
            Il nostro servizio fornisce orari in tempo reale per tutte le linee:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li><strong>Napoli - Sorrento</strong>: collegamento principale per la Penisola Sorrentina</li>
            <li><strong>Napoli - Pompei - Poggiomarino</strong>: accesso ai siti archeologici e ai comuni vesuviani</li>
            <li><strong>Napoli - Ottaviano - Sarno</strong>: collegamenti con l&apos;area nord-est della provincia</li>
            <li><strong>Napoli - Baiano</strong>: servizio per l&apos;area nolana</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Come Raggiungere Pompei e Sorrento da Napoli</h2>
          <p className="mb-3">
            La <strong>Circumvesuviana</strong> è il modo più comodo ed economico per raggiungere le principali
            attrazioni turistiche dalla città di Napoli:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Da <strong>Napoli a Pompei Scavi</strong>: circa 35 minuti di viaggio con treni frequenti</li>
            <li>Da <strong>Napoli a Sorrento</strong>: circa 1 ora di viaggio, con viste panoramiche sul Golfo</li>
            <li>Da <strong>Napoli a Ercolano Scavi</strong>: 20 minuti per raggiungere il sito archeologico</li>
          </ul>
          <p>
            Con VesuviaSearch puoi pianificare facilmente i tuoi spostamenti, visualizzare
            i tempi di percorrenza e conoscere in anticipo coincidenze e orari aggiornati.
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">Domande frequenti sui treni a Napoli</h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">Dove si prende la Circumvesuviana a Napoli?</h4>
            <p>La stazione principale della Circumvesuviana a Napoli è <strong>Napoli Porta Nolana</strong>, 
            seguita da <strong>Piazza Garibaldi</strong> (collegata alla stazione Centrale FS).</p>
          </div>
          <div>
            <h4 className="font-medium">Quanto costa il biglietto della Circumvesuviana da Napoli a Sorrento?</h4>
            <p>Il biglietto standard costa circa 3,60€. È disponibile anche il <strong>Campania Express</strong>, 
            un servizio turistico premium con costi maggiori ma più comfort.</p>
          </div>
          <div>
            <h4 className="font-medium">Qual è l&apos;orario dell&apos;ultimo treno da Napoli a Sorrento?</h4>
            <p>L&apos;ultimo treno parte generalmente intorno alle 21:40 da Napoli Porta Nolana. Verifica gli orari 
            aggiornati su VesuviaSearch per essere sicuro.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-500">
        <p>
          Ultimo aggiornamento orari: Giugno 2025 - VesuviaSearch offre gli orari più aggiornati 
          per tutti i treni della provincia di Napoli e della Circumvesuviana.
        </p>
      </div>
    </div>
  );
};

export default SEOContent;
