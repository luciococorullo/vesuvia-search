export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://vesuvia-search.vercel.app/#website",
            "url": "https://vesuvia-search.vercel.app/",
            "name": "VesuviaSearch",
            "description": "Ricerca treni rete EAV Circumvesuviana Campania",
            "inLanguage": "it-IT",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vesuvia-search.vercel.app/?from={search_term_string}&to={search_term_string}",
                "query-input": "required name=search_term_string"
            }
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
            ]
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
        }
    ]
}
