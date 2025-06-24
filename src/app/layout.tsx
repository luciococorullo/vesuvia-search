/**
 * @fileoverview Root layout component for VesuviaSearch
 *
 * This is the main layout component that wraps all pages in the application.
 * It provides:
 * - Global font configuration (Space Gro    "audience": "residenti Napoli, turisti, pendolari",
    
    // Meta tag per migliorare CTR
    "title": "Orari Treni Napoli | Circumvesuviana EAV | VesuviaSearch",
    "og:title": "🚆 Orari Treni Napoli | Circumvesuviana EAV in Tempo Reale",
    "twitter:title": "🚆 Orari Treni Napoli | Circumvesuviana EAV",
    
    // Breadcrumb navigation per SEO
    "breadcrumb": "Home > Orari Treni Napoli",
    
    // Schema.org additional markup
    "itemProp": "WebSite",
    
    // Additional local SEO
    "locality": "Napoli",
    "region": "Campania",
    "country": "Italia",esk)
 * - SEO metadata and structured data
 * - Language context provider for i18n
 * - TanStack Query provider for data fetching
 * - Analytics integration
 * - Global CSS styles
 * - PWA initialization and offline support
 * - Footer component
 *
 * @author VesuviaSearch Team
 * @version 2.0.0
 */

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import { structuredData } from "@/lib/structured-data";
import { enhancedStructuredData } from "@/lib/enhanced-structured-data";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import PWAInit from "@/components/PWAInit";

/**
 * Font configuration using Google Fonts
 * Space Grotesk provides a modern, clean look suitable for transportation apps
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

/**
 * SEO metadata configuration
 * Optimized for Italian users searching for Circumvesuviana train information
 */
export const metadata: Metadata = {
  title: "Orari Treni Napoli | Circumvesuviana EAV | VesuviaSearch",
  description:
    "Orari treni Napoli e provincia in tempo reale. Trova facilmente i treni della Circumvesuviana, linee EAV e Campania Express. Orari aggiornati per Sorrento, Pompei, Ercolano.",

  // PWA Configuration
  manifest: "/manifest.json",

  // SEO keywords for better search visibility
  keywords: [
    // Termini di ricerca primari per Napoli
    "orari treni napoli",
    "circumvesuviana orari",
    "orari circumvesuviana napoli sorrento",
    "treni napoli",
    "treni napoli provincia",
    "circumvesuviana napoli",
    "EAV napoli",
    "orari treni circumvesuviana",
    "circumvesuviana napoli orari",
    "treni vesuviana",
    
    // Domande frequenti di ricerca
    "come andare da napoli a sorrento",
    "come arrivare a pompei da napoli",
    "orario treno napoli pompei",
    "treno napoli sorrento quanto tempo",
    "orario ultimo treno napoli sorrento",
    
    // Località specifiche della provincia
    "circumvesuviana napoli sorrento",
    "napoli pompei treno",
    "ercolano scavi treno",
    "torre annunziata circumvesuviana",
    "castellammare di stabia treni",
    "vico equense treno",
    "meta di sorrento circumvesuviana",
    "piano di sorrento come arrivare",
    "sant'agnello treno da napoli",
    
    // Altre destinazioni EAV
    "sarno treno orari",
    "poggiomarino napoli treno",
    "nola circumvesuviana",
    "baiano eav orari",
    
    // Termini generici
    "trasporto pubblico napoli",
    "ricerca treni campania",
    "orari tempo reale circumvesuviana",
    "campania express orari",
    "app orari treni napoli",
    "treni campania orario",
    "circumvesuviana tempo reale",
  ],

  // Author and publisher information
  authors: [{ name: "VesuviaSearch" }],
  creator: "VesuviaSearch",
  publisher: "VesuviaSearch",

  // Disable automatic detection of contact information
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vesuvia-search.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/it",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Orari Treni Napoli | Circumvesuviana EAV | VesuviaSearch",
    description:
      "🚆 Orari treni Napoli e provincia in tempo reale. Raggiungi Sorrento, Pompei, Ercolano con la Circumvesuviana. Informazioni aggiornate e affidabili per residenti e turisti.",
    url: "https://vesuvia-search.vercel.app",
    siteName: "VesuviaSearch - Orari Treni Napoli",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VesuviaSearch - Orari Treni Napoli e Provincia in Tempo Reale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orari Treni Napoli | Circumvesuviana | VesuviaSearch",
    description: "🚆 Orari in tempo reale dei treni Circumvesuviana ed EAV per Napoli, Sorrento, Pompei e tutta la provincia",
    images: ["/og-image.jpg"],
    creator: "@vesuviasearch",
    site: "@vesuviasearch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#dc2626",
      },
    ],
  },
  category: "travel",
  classification: "transportation",
  referrer: "origin-when-cross-origin",
  bookmarks: ["https://vesuvia-search.vercel.app"],
  applicationName: "VesuviaSearch",
  generator: "Next.js",
  abstract:
    "Applicazione web per la ricerca degli orari dei treni della rete EAV Circumvesuviana in Campania",
  archives: ["https://vesuvia-search.vercel.app"],
  assets: ["https://vesuvia-search.vercel.app"],
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "yandex-verification": "your-yandex-verification-code",
    "theme-color": "#dc2626",
    "msapplication-TileColor": "#dc2626",
    "msapplication-config": "/browserconfig.xml",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Orari Treni Napoli",
    "application-name": "VesuviaSearch - Orari Treni Napoli",
    "geo.region": "IT-72",
    "geo.placename": "Napoli, Campania",
    "geo.position": "40.8518;14.2681",
    ICBM: "40.8518, 14.2681",
    language: "Italian",
    coverage: "Napoli e provincia",
    distribution: "Global",
    rating: "General",
    "revisit-after": "1 day",
    target: "all",
    audience: "residenti Napoli, turisti, pendolari",
    subject: "Orari Treni Napoli, Circumvesuviana, EAV, Trasporto Pubblico Campania",
    copyright: "© 2025 VesuviaSearch",
    "reply-to": "contact@vesuvia-search.com",
    owner: "VesuviaSearch",
    url: "https://vesuvia-search.vercel.app",
    "identifier-URL": "https://vesuvia-search.vercel.app",
    directory: "submission",
    pagename: "Orari Treni Napoli - VesuviaSearch",
    category: "transportation, travel, italy, napoli, campania, trains, orari treni",
    "resource-type": "document",
    classification: "Travel and Transportation",
    
    // Metadati Local Business per SEO locale
    "business:contact_data:locality": "Napoli",
    "business:contact_data:region": "Campania",
    "business:contact_data:country_name": "Italia",
    "DC.Title": "Orari Treni Napoli e Provincia - Circumvesuviana, EAV",
    "DC.Creator": "VesuviaSearch",
    "DC.Subject": "Orari Treni Napoli, Circumvesuviana, Treni EAV, Sorrento, Pompei, Ercolano, Trasporti Campania",
    "DC.Description": "Orari in tempo reale dei treni della Circumvesuviana ed EAV per Napoli e provincia, incluse destinazioni turistiche come Sorrento e Pompei",
    "DC.Publisher": "VesuviaSearch",
    "DC.Date": "2025",
    "DC.Type": "Service",
    "DC.Format": "text/html",
    "DC.Language": "it",
    "DC.Coverage": "Napoli e provincia, Campania, Italy",
    "DC.Rights": "© 2025 VesuviaSearch",
    "article:tag": "orari treni napoli, circumvesuviana, eav, sorrento, pompei",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="VesuviaSearch" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VesuviaSearch" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#dc2626" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.svg" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/icons/icon-72x72.svg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enhancedStructuredData),
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <PWAInit />
        <QueryProvider>
          <LanguageProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </LanguageProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
