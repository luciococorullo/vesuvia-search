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
  title: {
    default: "VesuviaSearch - Treni Circumvesuviana Napoli Sorrento | Orari EAV in Tempo Reale",
    template: "%s | VesuviaSearch - Treni Circumvesuviana",
  },
  description:
    "🚂 Trova facilmente i treni della Circumvesuviana tra Napoli e Sorrento. Orari aggiornati EAV, Campania Express, stazioni intermedie. Ricerca veloce e gratuita per trasporto pubblico in Campania.",

  // Enhanced SEO keywords targeting public transport searches
  keywords: [
    // Primary transport keywords
    "treni napoli sorrento",
    "circumvesuviana",
    "trasporto pubblico napoli",
    "trasporto pubblico sorrento",
    "vesuviana",
    "pubblico trasporto campania",
    "come arrivare sorrento napoli",
    "come raggiungere sorrento",
    "mezzi pubblici napoli sorrento",

    // EAV and official transport
    "orari circumvesuviana",
    "EAV",
    "ente autonomo volturno",
    "campania express",
    "orari treni vesuviana",
    "treni campania",
    "ferrovia circumvesuviana",

    // Specific routes and stations
    "napoli sorrento treno",
    "sorrento napoli treno",
    "stazioni circumvesuviana",
    "pompei scavi",
    "ercolano",
    "torre annunziata",
    "castellammare di stabia",
    "vico equense",
    "meta di sorrento",
    "piano di sorrento",
    "sant'agnello",

    // Tourist and travel keywords
    "come arrivare pompei",
    "treno per pompei",
    "come andare a sorrento",
    "trasporti costiera amalfitana",
    "turismo napoli sorrento",
    "viaggio napoli sorrento",

    // Real-time and search features
    "orari tempo reale",
    "ricerca treni",
    "biglietti circumvesuviana",
    "prezzi treni vesuviana",
    "app treni campania",
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
    title: "VesuviaSearch - Treni Circumvesuviana Napoli Sorrento | Orari EAV",
    description:
      "🚂 Trova facilmente i treni della Circumvesuviana tra Napoli e Sorrento. Orari aggiornati EAV, Campania Express. Il modo più veloce per pianificare il tuo viaggio in Campania.",
    url: "https://vesuvia-search.vercel.app",
    siteName: "VesuviaSearch",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VesuviaSearch - Ricerca Treni Circumvesuviana Napoli Sorrento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VesuviaSearch - Treni Circumvesuviana Napoli Sorrento",
    description:
      "🚂 Trova facilmente i treni della Circumvesuviana tra Napoli e Sorrento. Orari EAV aggiornati, ricerca veloce e gratuita.",
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
  manifest: "/site.webmanifest",
  category: "travel",
  classification: "transportation",
  referrer: "origin-when-cross-origin",
  bookmarks: ["https://vesuvia-search.vercel.app"],
  applicationName: "VesuviaSearch",
  generator: "Next.js",
  abstract:
    "Applicazione web gratuita per la ricerca degli orari dei treni della Circumvesuviana sulla linea Napoli-Sorrento. Trasporto pubblico in Campania con orari aggiornati EAV.",
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
    "geo.placename": "Napoli, Campania, Italia",
    "geo.position": "40.8518;14.2681",
    ICBM: "40.8518, 14.2681",
    language: "Italian",
    coverage: "Italy, Europe",
    distribution: "Global",
    rating: "General",
    "revisit-after": "1 day",
    target: "tourists, travelers, commuters, students",
    audience: "travelers to Campania, tourists visiting Naples and Sorrento",
    subject: "Treni Circumvesuviana, Trasporto Pubblico Campania, Orari EAV, Vesuviana",
    copyright: "© 2025 VesuviaSearch",
    "reply-to": "contact@vesuvia-search.com",
    owner: "VesuviaSearch",
    url: "https://vesuvia-search.vercel.app",
    "identifier-URL": "https://vesuvia-search.vercel.app",
    directory: "submission",
    pagename: "VesuviaSearch - Treni Circumvesuviana",
    category: "transportation, travel, italy, campania, trains, public transport",
    "resource-type": "interactive application",
    classification: "Travel and Transportation Services",

    // Enhanced Dublin Core metadata
    "DC.Title": "VesuviaSearch - Treni Circumvesuviana Napoli Sorrento",
    "DC.Creator": "VesuviaSearch",
    "DC.Subject": "Circumvesuviana, Treni, Napoli, Sorrento, Campania, Trasporto Pubblico, EAV",
    "DC.Description":
      "Applicazione web per la ricerca degli orari dei treni della Circumvesuviana tra Napoli e Sorrento",
    "DC.Publisher": "VesuviaSearch",
    "DC.Date": "2025",
    "DC.Type": "Interactive Resource",
    "DC.Format": "text/html",
    "DC.Language": "it",
    "DC.Coverage": "Campania, Italy",
    "DC.Rights": "© 2025 VesuviaSearch",

    // Additional SEO tags
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    googlebot: "index, follow",
    bingbot: "index, follow",
    slurp: "index, follow",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    viewport: "width=device-width, initial-scale=1",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}>
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
