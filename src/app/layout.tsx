import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import { structuredData } from "@/lib/structured-data";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VesuviaSearch - Ricerca Treni Circumvesuviana Napoli Sorrento",
  description:
    "Trova facilmente i treni della Circumvesuviana Napoli-Sorrento. Ricerca semplice e veloce degli orari dei treni EAV. Orari aggiornati, Campania Express, stazioni intermedie.",
  keywords: [
    "circumvesuviana",
    "treni napoli sorrento",
    "orari circumvesuviana",
    "EAV",
    "campania express",
    "vesuviana",
    "treni campania",
    "napoli sorrento treno",
    "orari treni vesuviana",
    "stazioni circumvesuviana",
    "pompei scavi",
    "ercolano",
    "torre annunziata",
    "castellammare",
    "vico equense",
    "meta",
    "piano di sorrento",
    "sant'agnello",
    "sorrento",
    "trasporto pubblico campania",
    "ricerca treni",
    "orari tempo reale",
  ],
  authors: [{ name: "VesuviaSearch" }],
  creator: "VesuviaSearch",
  publisher: "VesuviaSearch",
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
    title: "VesuviaSearch - Ricerca Treni Circumvesuviana",
    description:
      "Trova facilmente i treni della Circumvesuviana Napoli-Sorrento. Ricerca semplice e veloce degli orari dei treni.",
    url: "https://vesuvia-search.vercel.app",
    siteName: "VesuviaSearch",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VesuviaSearch - Ricerca Treni Circumvesuviana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VesuviaSearch - Ricerca Treni Circumvesuviana",
    description: "Trova facilmente i treni della Circumvesuviana Napoli-Sorrento",
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
    "Applicazione web per la ricerca degli orari dei treni della Circumvesuviana sulla linea Napoli-Sorrento",
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
    "DC.Title": "VesuviaSearch - Ricerca Treni Circumvesuviana",
    "DC.Creator": "VesuviaSearch",
    "DC.Subject": "Circumvesuviana, Treni, Napoli, Sorrento, Campania",
    "DC.Description": "Ricerca orari treni Circumvesuviana Napoli-Sorrento",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <QueryProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
