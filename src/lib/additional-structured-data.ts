/**
 * @fileoverview Additional JSON-LD structured data for SEO enhancement
 * 
 * This file contains additional structured data schemas that help search engines
 * better understand the content and purpose of VesuviaSearch website.
 */

export const additionalStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
        // Local Business for geographic relevance
        {
            "@type": "LocalBusiness",
            "@id": "https://vesuvia-search.vercel.app/#localbusiness",
            "name": "VesuviaSearch",
            "description": "Servizio di ricerca orari treni Circumvesuviana",
            "url": "https://vesuvia-search.vercel.app",
            "areaServed": [
                {
                    "@type": "City",
                    "name": "Napoli",
                    "sameAs": "https://it.wikipedia.org/wiki/Napoli"
                },
                {
                    "@type": "City",
                    "name": "Sorrento",
                    "sameAs": "https://it.wikipedia.org/wiki/Sorrento"
                },
                {
                    "@type": "City",
                    "name": "Pompei",
                    "sameAs": "https://it.wikipedia.org/wiki/Pompei"
                }
            ],
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
            "serviceType": "Transportation Information Service"
        },

        // Travel route information
        {
            "@type": "TouristDestination",
            "@id": "https://vesuvia-search.vercel.app/#sorrento-destination",
            "name": "Sorrento",
            "description": "Bellissima destinazione turistica raggiungibile da Napoli con la Circumvesuviana",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.6264,
                "longitude": 14.3755
            },
            "touristType": [
                "Cultural tourists",
                "Nature tourists",
                "Food tourists"
            ],
            "includesAttraction": [
                {
                    "@type": "TouristAttraction",
                    "name": "Centro Storico Sorrento"
                },
                {
                    "@type": "TouristAttraction",
                    "name": "Marina Grande"
                }
            ]
        },

        // Archaeological site
        {
            "@type": "TouristDestination",
            "@id": "https://vesuvia-search.vercel.app/#pompei-destination",
            "name": "Pompei",
            "description": "Sito archeologico UNESCO raggiungibile da Napoli con la Circumvesuviana",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7489,
                "longitude": 14.4918
            },
            "touristType": [
                "Cultural tourists",
                "History enthusiasts"
            ],
            "includesAttraction": [
                {
                    "@type": "TouristAttraction",
                    "name": "Scavi di Pompei",
                    "sameAs": "https://www.pompeiisites.org/"
                }
            ]
        },

        // How-to schema for travel guidance
        {
            "@type": "HowTo",
            "@id": "https://vesuvia-search.vercel.app/#howto-sorrento",
            "name": "Come Arrivare a Sorrento da Napoli",
            "description": "Guida passo passo per raggiungere Sorrento da Napoli con i mezzi pubblici",
            "image": "https://vesuvia-search.vercel.app/og-image.jpg",
            "totalTime": "PT1H10M",
            "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": "5-10"
            },
            "supply": [
                {
                    "@type": "HowToSupply",
                    "name": "Biglietto Circumvesuviana"
                }
            ],
            "tool": [
                {
                    "@type": "HowToTool",
                    "name": "VesuviaSearch",
                    "url": "https://vesuvia-search.vercel.app"
                }
            ],
            "step": [
                {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Raggiungere la stazione",
                    "text": "Vai alla stazione Napoli Porta Nolana o Napoli Garibaldi"
                },
                {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Acquistare il biglietto",
                    "text": "Compra il biglietto per Sorrento alle biglietterie o distributori automatici"
                },
                {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Prendere il treno",
                    "text": "Sali sul treno della Circumvesuviana direzione Sorrento"
                },
                {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Arrivare a destinazione",
                    "text": "Il viaggio dura circa 1 ora e 10 minuti fino a Sorrento"
                }
            ]
        },

        // Service schema
        {
            "@type": "Service",
            "@id": "https://vesuvia-search.vercel.app/#service",
            "name": "Ricerca Orari Circumvesuviana",
            "description": "Servizio gratuito per la ricerca degli orari dei treni della Circumvesuviana",
            "provider": {
                "@type": "Organization",
                "name": "VesuviaSearch"
            },
            "serviceType": "Transportation Information Service",
            "areaServed": {
                "@type": "State",
                "name": "Campania"
            },
            "audience": {
                "@type": "Audience",
                "audienceType": "Travelers, Tourists, Commuters"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/OnlineOnly"
            }
        },

        // Route information
        {
            "@type": "Route",
            "@id": "https://vesuvia-search.vercel.app/#route-napoli-sorrento",
            "name": "Circumvesuviana Napoli-Sorrento",
            "description": "Linea ferroviaria che collega Napoli a Sorrento",
            "routeType": "Railway",
            "startLocation": {
                "@type": "Place",
                "name": "Napoli",
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.8518,
                    "longitude": 14.2681
                }
            },
            "endLocation": {
                "@type": "Place",
                "name": "Sorrento",
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.6264,
                    "longitude": 14.3755
                }
            },
            "distance": "48 km",
            "travelTime": "PT1H10M"
        }
    ]
};

// Specific structured data for travel pages
export const travelPageStructuredData = {
    sorrento: {
        "@context": "https://schema.org",
        "@type": "TravelAction",
        "name": "Viaggio da Napoli a Sorrento",
        "description": "Come raggiungere Sorrento da Napoli con la Circumvesuviana",
        "fromLocation": {
            "@type": "Place",
            "name": "Napoli"
        },
        "toLocation": {
            "@type": "Place",
            "name": "Sorrento"
        },
        "duration": "PT1H10M",
        "instrument": {
            "@type": "Vehicle",
            "name": "Circumvesuviana"
        }
    },

    pompei: {
        "@context": "https://schema.org",
        "@type": "TravelAction",
        "name": "Viaggio da Napoli a Pompei",
        "description": "Come raggiungere Pompei da Napoli con la Circumvesuviana",
        "fromLocation": {
            "@type": "Place",
            "name": "Napoli"
        },
        "toLocation": {
            "@type": "Place",
            "name": "Pompei"
        },
        "duration": "PT40M",
        "instrument": {
            "@type": "Vehicle",
            "name": "Circumvesuviana"
        }
    }
};
