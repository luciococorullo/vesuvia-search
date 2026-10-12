/**
 * JSON-LD structured data (schema.org) injected in the root layout.
 * Only describes what actually exists: a free web app that shows live
 * EAV train departures and journeys.
 */

export const SITE_URL = "https://vesuvia-search.vercel.app";

export const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: "VesuviaSearch",
            description:
                "Orari in tempo reale dei treni della rete ferroviaria EAV in Campania",
            inLanguage: ["it-IT", "en"],
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "VesuviaSearch",
            url: `${SITE_URL}/`,
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/icons/icon-512x512.svg`,
                width: 512,
                height: 512,
            },
            sameAs: ["https://github.com/luciococorullo/vesuvia-search"],
        },
        {
            "@type": "WebApplication",
            "@id": `${SITE_URL}/#webapp`,
            name: "VesuviaSearch",
            description:
                "Web app gratuita e non ufficiale per consultare partenze e soluzioni di viaggio dei treni EAV in tempo reale",
            url: `${SITE_URL}/`,
            applicationCategory: "TravelApplication",
            operatingSystem: "Any",
            isAccessibleForFree: true,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
            },
            about: {
                "@type": "Organization",
                name: "EAV - Ente Autonomo Volturno",
                url: "https://www.eavsrl.it/",
            },
        },
    ],
};
