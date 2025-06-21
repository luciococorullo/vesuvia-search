/**
 * @fileoverview Root layout component for VesuviaSearch
 *
 * This is the main layout component that wraps all pages in the application.
 * It provides:
 * - Global font configuration (Space Grotesk)
 * - SEO metadata and structured data
 * - Language context provider for i18n
 * - TanStack Query provider for data fetching
 * - Analytics integration
 * - Global CSS styles
 * - Footer component
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import { structuredData } from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import PWAInit from "@/components/PWAInit";
// import PWADebug from "@/components/PWADebug";

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
  title: "VesuviaSearch - Ricerca Treni EAV Circumvesuviana Campania",
  description:
    "Trova facilmente i treni della rete EAV Circumvesuviana in Campania. Ricerca semplice e veloce degli orari dei treni su tutte le linee. Orari aggiornati, Campania Express, stazioni e destinazioni.",

  // PWA Configuration
  manifest: "/manifest.json",

  // SEO keywords for better search visibility
  keywords: [
    "circumvesuviana",
    "treni eav campania",
    "orari circumvesuviana",
    "EAV",
    "campania express",
    "vesuviana",
    "treni campania",
    "rete eav",
    "orari treni vesuviana",
    "stazioni circumvesuviana",
    "napoli",
    "sorrento",
    "pompei scavi",
    "ercolano",
    "torre annunziata",
    "castellammare",
    "vico equense",
    "meta",
    "piano di sorrento",
    "sant'agnello",
    "caserta",
    "sarno",
    "poggiomarino",
    "nola",
    "baiano",
    "trasporto pubblico campania",
    "ricerca treni",
    "orari tempo reale",
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
    title: "VesuviaSearch - Ricerca Treni EAV Circumvesuviana Campania",
    description:
      "Trova facilmente i treni della rete EAV Circumvesuviana in Campania. Ricerca semplice e veloce degli orari dei treni su tutte le linee.",
    url: "https://vesuvia-search.vercel.app",
    siteName: "VesuviaSearch",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VesuviaSearch - Ricerca Treni EAV Circumvesuviana Campania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VesuviaSearch - Ricerca Treni EAV Circumvesuviana Campania",
    description: "Trova facilmente i treni della rete EAV Circumvesuviana in Campania",
    images: ["/og-image.jpg"],
    creator: "@vesuviasearch",
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
    "apple-mobile-web-app-title": "VesuviaSearch",
    "application-name": "VesuviaSearch",
    "geo.region": "IT-72",
    "geo.placename": "Napoli, Campania",
    "geo.position": "40.8518;14.2681",
    ICBM: "40.8518, 14.2681",
    language: "Italian",
    coverage: "Worldwide",
    distribution: "Global",
    rating: "General",
    "revisit-after": "1 day",
    target: "all",
    audience: "all",
    subject: "Treni Circumvesuviana, Trasporto Pubblico Campania",
    copyright: "© 2025 VesuviaSearch",
    "reply-to": "contact@vesuvia-search.com",
    owner: "VesuviaSearch",
    url: "https://vesuvia-search.vercel.app",
    "identifier-URL": "https://vesuvia-search.vercel.app",
    directory: "submission",
    pagename: "VesuviaSearch",
    category: "transportation, travel, italy, campania, trains",
    "resource-type": "document",
    classification: "Travel and Transportation",
    "DC.Title": "VesuviaSearch - Ricerca Treni EAV Circumvesuviana Campania",
    "DC.Creator": "VesuviaSearch",
    "DC.Subject": "Circumvesuviana, Treni, EAV, Campania, Trasporti",
    "DC.Description": "Ricerca orari treni rete EAV Circumvesuviana Campania",
    "DC.Publisher": "VesuviaSearch",
    "DC.Date": "2025",
    "DC.Type": "Service",
    "DC.Format": "text/html",
    "DC.Language": "it",
    "DC.Coverage": "Italy",
    "DC.Rights": "© 2025 VesuviaSearch",
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
      </head>
      <body className={`${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
        <PWAInit />
        {/* <PWADebug /> */}
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
