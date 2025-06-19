export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vesuvia-search.vercel.app/#website",
            "url": "https://vesuvia-search.vercel.app/",
            "name": "VesuviaSearch - Treni Circumvesuviana Napoli Sorrento",
            "alternateName": "VesuviaSearch",
            "description": "Trova facilmente i treni della Circumvesuviana tra Napoli e Sorrento. Orari aggiornati EAV, Campania Express, trasporto pubblico in Campania.",
            "inLanguage": ["it-IT", "en-US", "es-ES", "pt-PT", "fr-FR", "de-DE"],
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vesuvia-search.vercel.app/?from={search_term_string}&to={search_term_string}",
                "query-input": "required name=search_term_string"
            },
            "mainEntity": {
                "@type": "TravelAgency",
                "name": "VesuviaSearch",
                "description": "Servizio di ricerca orari treni Circumvesuviana"
            }
        },
        {
            "@type": "Organization",
            "@id": "https://vesuvia-search.vercel.app/#organization",
            "name": "VesuviaSearch",
            "alternateName": "Vesuvia Search",
            "url": "https://vesuvia-search.vercel.app/",
            "description": "Piattaforma digitale per la ricerca degli orari dei treni della Circumvesuviana",
            "foundingDate": "2025",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IT",
                "addressRegion": "Campania"
            },
            "logo": {
                "@type": "ImageObject",
                "url": "https://vesuvia-search.vercel.app/logo.png",
                "width": 512,
                "height": 512
            },
            "sameAs": [
                "https://twitter.com/vesuviasearch",
                "https://github.com/luciococorullo/vesuvia-search"
            ],
            "knowsAbout": [
                "Circumvesuviana",
                "Trasporto pubblico Campania",
                "Treni Napoli Sorrento",
                "EAV",
                "Campania Express"
            ]
        },
        {
            "@type": "WebApplication",
            "@id": "https://vesuvia-search.vercel.app/#webapp",
            "name": "VesuviaSearch",
            "description": "Applicazione web gratuita per la ricerca degli orari dei treni della Circumvesuviana tra Napoli e Sorrento",
            "url": "https://vesuvia-search.vercel.app/",
            "applicationCategory": ["TravelApplication", "TransportationApplication"],
            "operatingSystem": "Any",
            "browserRequirements": "Requires JavaScript enabled",
            "softwareVersion": "1.0.0",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "description": "Servizio gratuito"
            },
            "about": {
                "@type": "Service",
                "name": "Ricerca Orari Treni Circumvesuviana",
                "description": "Servizio di ricerca orari e informazioni sui treni della linea Circumvesuviana Napoli-Sorrento",
                "serviceType": "Transportation Information Service",
                "provider": {
                    "@type": "Organization",
                    "name": "VesuviaSearch"
                },
                "areaServed": {
                    "@type": "State",
                    "name": "Campania",
                    "containedInPlace": {
                        "@type": "Country",
                        "name": "Italy"
                    }
                }
            },
            "featureList": [
                "Ricerca orari treni in tempo reale",
                "Visualizzazione stazioni intermedie",
                "Informazioni Campania Express",
                "Interfaccia multilingue",
                "Ottimizzato per mobile"
            ]
        },
        {
            "@type": "BreadcrumbList",
            "@id": "https://vesuvia-search.vercel.app/#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://vesuvia-search.vercel.app/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Ricerca Treni",
                    "item": "https://vesuvia-search.vercel.app/search"
                }
            ]
        },
        {
            "@type": "Place",
            "@id": "https://vesuvia-search.vercel.app/#napoli",
            "name": "Napoli",
            "alternateName": ["Naples", "Nápoles"],
            "description": "Città metropolitana della Campania, punto di partenza della Circumvesuviana",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.8518,
                "longitude": 14.2681
            },
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Campania",
                "addressCountry": "IT"
            },
            "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "Campania"
            }
        },
        {
            "@type": "Place",
            "@id": "https://vesuvia-search.vercel.app/#sorrento",
            "name": "Sorrento",
            "description": "Destinazione turistica in Campania, capolinea della Circumvesuviana",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.6264,
                "longitude": 14.3755
            },
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Campania",
                "addressCountry": "IT"
            },
            "containedInPlace": {
                "@type": "AdministrativeArea",
                "name": "Campania"
            },
            "touristType": [
                "Cultural tourists",
                "Beach tourists",
                "Food tourists"
            ]
        },
        {
            "@type": "TransportationCompany",
            "@id": "https://vesuvia-search.vercel.app/#eav",
            "name": "EAV - Ente Autonomo Volturno",
            "alternateName": "EAV",
            "url": "https://www.eavsrl.it/",
            "description": "Società di trasporto pubblico che gestisce la Circumvesuviana e altri servizi di trasporto in Campania",
            "areaServed": {
                "@type": "State",
                "name": "Campania"
            },
            "serviceType": "Public Transportation"
        },
        {
            "@type": "PublicTransportation",
            "name": "Circumvesuviana",
            "description": "Ferrovia che collega Napoli con Sorrento e altre località della Campania",
            "provider": {
                "@type": "Organization",
                "name": "EAV"
            },
            "areaServed": [
                {
                    "@type": "City",
                    "name": "Napoli"
                },
                {
                    "@type": "City",
                    "name": "Sorrento"
                },
                {
                    "@type": "City",
                    "name": "Pompei"
                },
                {
                    "@type": "City",
                    "name": "Ercolano"
                }
            ]
        },
        {
            "@type": "TouristTrip",
            "name": "Napoli to Sorrento by Train",
            "description": "Viaggio turistico da Napoli a Sorrento con la Circumvesuviana",
            "touristType": [
                "Cultural tourists",
                "Independent travelers",
                "Budget travelers"
            ],
            "itinerary": [
                {
                    "@type": "City",
                    "name": "Napoli"
                },
                {
                    "@type": "City",
                    "name": "Ercolano"
                },
                {
                    "@type": "City",
                    "name": "Pompei"
                },
                {
                    "@type": "City",
                    "name": "Sorrento"
                }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Come arrivare a Sorrento da Napoli con i mezzi pubblici?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il modo migliore per arrivare a Sorrento da Napoli è prendere la Circumvesuviana dalla stazione di Napoli Porta Nolana o Napoli Garibaldi. Il viaggio dura circa 1 ora e 10 minuti."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quanto costa il biglietto della Circumvesuviana?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I prezzi variano in base alla destinazione. Per informazioni aggiornate sui prezzi consultare il sito ufficiale EAV."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Che cos'è il Campania Express?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il Campania Express è un servizio turistico della Circumvesuviana con fermate limitate che collega Napoli a Sorrento passando per Ercolano e Pompei."
                    }
                }
            ]
        }
    ]
}
