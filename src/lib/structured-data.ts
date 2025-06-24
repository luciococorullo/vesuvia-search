export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vesuvia-search.vercel.app/#website",
            "url": "https://vesuvia-search.vercel.app/",
            "name": "VesuviaSearch - Orari Treni Napoli e Provincia",
            "description": "Ricerca treni rete EAV Circumvesuviana Napoli e provincia. Trova gli orari in tempo reale.",
            "inLanguage": "it-IT",
            "potentialAction": [
                {
                    "@type": "SearchAction",
                    "target": "https://vesuvia-search.vercel.app/?from={search_term_string}&to={search_term_string}",
                    "query-input": "required name=search_term_string"
                },
                {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://vesuvia-search.vercel.app/search?from={from}&to={to}&time={time}"
                    },
                    "query-input": [
                        {
                            "@type": "PropertyValueSpecification",
                            "valueRequired": true,
                            "valueName": "from"
                        },
                        {
                            "@type": "PropertyValueSpecification",
                            "valueRequired": true,
                            "valueName": "to"
                        },
                        {
                            "@type": "PropertyValueSpecification",
                            "valueRequired": false,
                            "valueName": "time"
                        }
                    ]
                }
            ]
        },
        {
            "@type": "Organization",
            "@id": "https://vesuvia-search.vercel.app/#organization",
            "name": "VesuviaSearch",
            "url": "https://vesuvia-search.vercel.app/",
            "logo": {
                "@type": "ImageObject",
                "url": "https://vesuvia-search.vercel.app/logo.png",
                "width": 512,
                "height": 512
            },
            "sameAs": [
                "https://twitter.com/vesuviasearch"
            ],
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Campania",
                "addressCountry": "IT",
                "addressLocality": "Napoli"
            },
            "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.8518,
                    "longitude": 14.2681
                },
                "geoRadius": "50000"
            }
        },
        {
            "@type": "WebApplication",
            "@id": "https://vesuvia-search.vercel.app/#webapp",
            "name": "VesuviaSearch",
            "description": "Applicazione web per la ricerca degli orari dei treni della Circumvesuviana",
            "url": "https://vesuvia-search.vercel.app/",
            "applicationCategory": "TravelApplication",
            "operatingSystem": "Any",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
            },
            "about": {
                "@type": "Service",
                "name": "Ricerca Orari Treni EAV Circumvesuviana",
                "description": "Servizio di ricerca orari e informazioni sui treni della rete EAV Circumvesuviana in Campania"
            }
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
                }
            ]
        },
        {
            "@type": "Place",
            "name": "Napoli",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.8518,
                "longitude": 14.2681
            }
        },
        {
            "@type": "Place",
            "name": "Sorrento",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.6264,
                "longitude": 14.3755
            }
        },
        {
            "@type": "TransportationCompany",
            "name": "EAV - Ente Autonomo Volturno",
            "url": "https://www.eavsrl.it/",
            "description": "Società di trasporto pubblico che gestisce la Circumvesuviana"
        },
        {
            "@type": "FAQPage",
            "@id": "https://vesuvia-search.vercel.app/#faq",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Come cercare un treno da Napoli a Sorrento?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Seleziona 'Napoli' come stazione di partenza e 'Sorrento' come destinazione. Scegli data e ora e clicca su 'Cerca Treni' per vedere tutti gli orari disponibili in tempo reale."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Come funziona VesuviaSearch?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "VesuviaSearch offre informazioni in tempo reale sugli orari dei treni della rete EAV Circumvesuviana. Basta selezionare la stazione di partenza, la destinazione, la data e l'ora per visualizzare tutti i collegamenti disponibili."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Quali stazioni sono coperte dal servizio?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "VesuviaSearch copre tutte le stazioni della rete EAV Circumvesuviana, incluse le linee Napoli-Sorrento, Napoli-Sarno, Napoli-Baiano e Napoli-Poggiomarino."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Come raggiungere Pompei con la Circumvesuviana?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Per raggiungere gli scavi di Pompei, cerca un treno per la stazione 'Pompei Scavi - Villa dei Misteri' sulla linea Napoli-Sorrento. Il sito archeologico è a pochi passi dalla stazione."
                    }
                }
            ]
        },
        {
            "@type": "ItemList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "TouristAttraction",
                        "name": "Scavi di Pompei",
                        "url": "https://vesuvia-search.vercel.app/search?from=Napoli&to=Pompei%20Scavi",
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 40.7510,
                            "longitude": 14.4842
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "TouristAttraction",
                        "name": "Sorrento",
                        "url": "https://vesuvia-search.vercel.app/search?from=Napoli&to=Sorrento",
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 40.6264,
                            "longitude": 14.3755
                        }
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "TouristAttraction",
                        "name": "Ercolano",
                        "url": "https://vesuvia-search.vercel.app/search?from=Napoli&to=Ercolano",
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 40.8058,
                            "longitude": 14.3479
                        }
                    }
                }
            ]
        },
        {
            "@type": "LocalBusiness",
            "@id": "https://vesuvia-search.vercel.app/#localbusiness",
            "name": "VesuviaSearch - Servizio di Ricerca Treni Napoli",
            "image": "https://vesuvia-search.vercel.app/logo.png",
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Campania",
                "addressCountry": "IT",
                "addressLocality": "Napoli"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.8518,
                "longitude": 14.2681
            },
            "url": "https://vesuvia-search.vercel.app/",
            "telephone": "",
            "priceRange": "Gratuito",
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            },
            "servesCuisine": "Informazioni treni",
            "areaServed": "Provincia di Napoli"
        }
    ]
}
