/**
 * Additional structured data for enhanced SEO and rich snippets
 * 
 * Questo file contiene dati strutturati aggiuntivi per migliorare la visibilità
 * nei risultati di ricerca con rich snippets.
 */

export const enhancedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            "@id": "https://vesuvia-search.vercel.app/#app",
            "name": "VesuviaSearch - Orari Treni Napoli",
            "operatingSystem": "Web Browser",
            "applicationCategory": "TravelApplication",
            "url": "https://vesuvia-search.vercel.app/",
            "description": "App web gratuita per consultare gli orari dei treni della Circumvesuviana e EAV in tempo reale per Napoli e provincia",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
            }
        },
        {
            "@type": "TravelAgency",
            "@id": "https://vesuvia-search.vercel.app/#travelagency",
            "name": "VesuviaSearch - Servizio Orari Treni Napoli",
            "url": "https://vesuvia-search.vercel.app/",
            "logo": "https://vesuvia-search.vercel.app/logo.png",
            "description": "Servizio di consulenza orari treni per la provincia di Napoli",
            "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Provincia di Napoli",
                "containedInPlace": {
                    "@type": "AdministrativeArea",
                    "name": "Campania, Italia"
                }
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servizi di ricerca orari treni",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Orari Circumvesuviana in tempo reale",
                            "description": "Consulta gli orari aggiornati dei treni Circumvesuviana per tutte le destinazioni"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Informazioni destinazioni turistiche",
                            "description": "Guide e informazioni per raggiungere Pompei, Sorrento, Ercolano e altre mete turistiche"
                        }
                    }
                ]
            }
        },
        {
            "@type": "Dataset",
            "@id": "https://vesuvia-search.vercel.app/#dataset",
            "name": "Orari Treni EAV Circumvesuviana Dataset",
            "description": "Database completo degli orari dei treni della rete EAV Circumvesuviana aggiornato in tempo reale",
            "url": "https://vesuvia-search.vercel.app/",
            "keywords": "circumvesuviana, orari, treni, napoli, eav, trasporti pubblici",
            "creator": {
                "@type": "Organization",
                "name": "VesuviaSearch"
            },
            "spatialCoverage": {
                "@type": "Place",
                "geo": {
                    "@type": "GeoShape",
                    "box": "40.7 14.1 40.9 14.6"
                },
                "name": "Provincia di Napoli, Campania"
            },
            "temporalCoverage": "2025/2026"
        },
        {
            "@type": "HowTo",
            "@id": "https://vesuvia-search.vercel.app/#howto-pompei",
            "name": "Come andare da Napoli a Pompei con la Circumvesuviana",
            "description": "Guida passo-passo per raggiungere gli Scavi di Pompei da Napoli utilizzando i treni della Circumvesuviana",
            "image": "https://vesuvia-search.vercel.app/images/pompei-guide.jpg",
            "totalTime": "PT45M",
            "supply": [
                {
                    "@type": "HowToSupply",
                    "name": "Biglietto Circumvesuviana"
                }
            ],
            "tool": [
                {
                    "@type": "HowToTool",
                    "name": "VesuviaSearch App"
                }
            ],
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Arriva alla stazione",
                    "text": "Recati alla stazione di Napoli Porta Nolana o Napoli Piazza Garibaldi"
                },
                {
                    "@type": "HowToStep",
                    "name": "Acquista il biglietto",
                    "text": "Compra un biglietto per Pompei Scavi - Villa dei Misteri (€2,80)"
                },
                {
                    "@type": "HowToStep",
                    "name": "Prendi il treno",
                    "text": "Sali su un treno diretto a Sorrento o Poggiomarino"
                },
                {
                    "@type": "HowToStep",
                    "name": "Scendi alla fermata giusta",
                    "text": "Scendi alla fermata 'Pompei Scavi - Villa dei Misteri' dopo circa 35 minuti"
                },
                {
                    "@type": "HowToStep",
                    "name": "Raggiungi gli scavi",
                    "text": "L'ingresso agli scavi archeologici è a 100 metri dalla stazione"
                }
            ]
        }
    ]
};

// Export per l'uso in componenti specifici
export const localBusinessData = {
    "@type": "LocalBusiness",
    "name": "VesuviaSearch - Orari Treni Napoli e Provincia",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Napoli",
        "addressRegion": "Campania",
        "addressCountry": "IT"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.8518,
        "longitude": 14.2681
    },
    "url": "https://vesuvia-search.vercel.app",
    "telephone": "",
    "priceRange": "Gratuito",
    "openingHours": "Mo-Su 00:00-23:59",
    "servesCuisine": "Servizi di trasporto",
    "acceptsReservations": false
};
