/**
 * @fileoverview Dynamic route pages for popular train connections
 *
 * Creates SEO-optimized landing pages for specific train routes
 * targeting long-tail keywords like "napoli sorrento treno orari"
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";

// Popular routes data for SEO optimization
const popularRoutes = {
  "napoli-sorrento": {
    title: "Orari Treno Napoli Sorrento | Circumvesuviana | VesuviaSearch",
    description:
      "🚆 Orari treni da Napoli a Sorrento oggi. Circumvesuviana e Campania Express. Tempo di viaggio, fermate. Pianifica il tuo viaggio!",
    from: "Napoli",
    to: "Sorrento",
    duration: "65 minuti",
    frequency: "Ogni 30 minuti",
    keywords: [
      "napoli sorrento treno",
      "circumvesuviana napoli sorrento",
      "orari treno napoli sorrento",
      "campania express napoli sorrento",
      "tempo viaggio napoli sorrento",
      "ultimo treno napoli sorrento",
    ],
  },
  "napoli-pompei": {
    title: "Orari Treno Napoli Pompei Scavi | Come Arrivare | VesuviaSearch",
    description:
      "🏛️ Come arrivare a Pompei da Napoli in treno. Orari Circumvesuviana per Pompei Scavi. Fermate, tempo di viaggio. Guida completa per turisti.",
    from: "Napoli",
    to: "Pompei Scavi",
    duration: "45 minuti",
    frequency: "Ogni 30 minuti",
    keywords: [
      "come arrivare a pompei da napoli",
      "napoli pompei treno",
      "circumvesuviana pompei scavi",
      "orari treno pompei",
      "treno napoli pompei scavi",
    ],
  },
  "napoli-ercolano": {
    title: "Orari Treno Napoli Ercolano Scavi | Circumvesuviana | VesuviaSearch",
    description:
      "🏛️ Orari treni da Napoli a Ercolano Scavi. Circumvesuviana per visitare gli scavi di Ercolano. Fermate, consigli di viaggio.",
    from: "Napoli",
    to: "Ercolano Scavi",
    duration: "25 minuti",
    frequency: "Ogni 30 minuti",
    keywords: [
      "napoli ercolano treno",
      "ercolano scavi come arrivare",
      "circumvesuviana ercolano",
      "orari treno ercolano scavi",
    ],
  },
  "sorrento-pompei": {
    title: "Treno Sorrento Pompei | Orari Circumvesuviana | VesuviaSearch",
    description:
      "🚆 Orari treni da Sorrento a Pompei Scavi. Collegamenti diretti Circumvesuviana. Ideale per tour Costiera Amalfitana e siti archeologici.",
    from: "Sorrento",
    to: "Pompei Scavi",
    duration: "30 minuti",
    frequency: "Ogni 30 minuti",
    keywords: [
      "sorrento pompei treno",
      "circumvesuviana sorrento pompei",
      "tour costiera amalfitana pompei",
    ],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = popularRoutes[slug as keyof typeof popularRoutes];

  if (!route) {
    return {
      title: "Pagina non trovata | VesuviaSearch",
      description: "La pagina che stai cercando non è disponibile.",
    };
  }

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    openGraph: {
      title: route.title,
      description: route.description,
      type: "website",
      locale: "it_IT",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
    alternates: {
      canonical: `https://vesuvia-search.vercel.app/route/${slug}`,
    },
  };
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = popularRoutes[slug as keyof typeof popularRoutes];

  if (!route) {
    notFound();
  }

  // Structured data for the route
  const routeStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Come andare da ${route.from} a ${route.to} in treno`,
    description: `Guida completa per viaggiare da ${route.from} a ${route.to} con la Circumvesuviana`,
    totalTime: `PT${route.duration.replace(" minuti", "M")}`,
    supply: [
      {
        "@type": "HowToSupply",
        name: "Biglietto Circumvesuviana",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "VesuviaSearch App",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Raggiungi la stazione di partenza",
        text: `Recati alla stazione di ${route.from}`,
        url: `https://vesuvia-search.vercel.app/route/${slug}#step1`,
      },
      {
        "@type": "HowToStep",
        name: "Acquista il biglietto",
        text: `Compra il biglietto per ${route.to}`,
        url: `https://vesuvia-search.vercel.app/route/${slug}#step2`,
      },
      {
        "@type": "HowToStep",
        name: "Prendi il treno",
        text: `Treni ogni ${route.frequency.toLowerCase()}, durata ${route.duration}`,
        url: `https://vesuvia-search.vercel.app/route/${slug}#step3`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(routeStructuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🚆 Treno da {route.from} a {route.to}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Tutte le informazioni per viaggiare da {route.from} a {route.to} con la
              Circumvesuviana. Orari aggiornati e consigli di viaggio.
            </p>

            {/* Quick Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">⏱️ Durata Viaggio</h3>
                <p className="text-blue-600 text-xl font-bold">{route.duration}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">🚆 Frequenza</h3>
                <p className="text-green-600 text-xl font-bold">{route.frequency}</p>
              </div>
            </div>
          </div>

          {/* Guide Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Come raggiungere {route.to} da {route.from}
            </h2>

            <div className="space-y-6">
              <div id="step1" className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">1. Raggiungi la stazione</h3>
                <p className="text-gray-700">
                  La stazione di partenza è <strong>{route.from}</strong>.
                  {route.from === "Napoli" && (
                    <>
                      Le stazioni principali sono Napoli Porta Nolana e Napoli Piazza Garibaldi,
                      entrambe ben collegate con metro e autobus.
                    </>
                  )}
                </p>
              </div>

              <div id="step2" className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">2. Acquista il biglietto</h3>
                <p className="text-gray-700">
                  Il biglietto da {route.from} a {route.to} può essere acquistato alle biglietterie
                  automatiche o presso gli sportelli.
                </p>
              </div>

              <div id="step3" className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">3. Prendi il treno</h3>
                <p className="text-gray-700">
                  I treni partono <strong>{route.frequency.toLowerCase()}</strong> e il viaggio dura
                  circa <strong>{route.duration}</strong>. Controlla sempre gli orari aggiornati
                  prima di partire.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Controlla gli orari in tempo reale</h2>
            <p className="mb-6">
              Usa il nostro tool di ricerca per verificare gli orari aggiornati e pianificare al
              meglio il tuo viaggio.
            </p>
            <Link
              href={`/?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              🔍 Cerca Orari {route.from} → {route.to}
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(popularRoutes).map((slug) => ({
    slug,
  }));
}
