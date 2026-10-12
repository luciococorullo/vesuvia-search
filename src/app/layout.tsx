import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import { structuredData } from "@/lib/structured-data";
import Footer from "@/components/Footer";
import PWAInit from "@/components/PWAInit";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const TITLE = "Vesuvia Search — Orari treni EAV e Circumvesuviana";
const DESCRIPTION =
  "Orari in tempo reale dei treni EAV: Circumvesuviana, Cumana e Circumflegrea. Cerca il treno da Napoli a Sorrento, Pompei, Ercolano e Pozzuoli, con ritardi, binari e partenze live.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vesuvia-search.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Vesuvia Search",
  manifest: "/manifest.json",
  keywords: [
    "circumvesuviana",
    "orari circumvesuviana",
    "treni EAV",
    "cumana",
    "circumflegrea",
    "napoli sorrento treno",
    "pompei scavi treno",
    "partenze in tempo reale",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Vesuvia Search",
    locale: "it_IT",
    type: "website",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "Vesuvia", statusBarStyle: "default" },
  formatDetection: { telephone: false, email: false, address: false },
  icons: {
    icon: [{ url: "/icons/icon-72x72.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon-192x192.svg" }],
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#1F5F8B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col bg-bg font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PWAInit />
        <QueryProvider>
          <LanguageProvider>
            <ErrorBoundary>
              <div className="flex-1">{children}</div>
            </ErrorBoundary>
            <Footer />
          </LanguageProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
