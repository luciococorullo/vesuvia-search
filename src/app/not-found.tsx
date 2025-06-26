import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina non trovata - VesuviaSearch",
  description:
    "La pagina che stai cercando non esiste. Torna alla ricerca orari treni Circumvesuviana.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pagina non trovata</h2>

        <p className="text-gray-600 mb-8">
          Oops! La pagina che stai cercando non esiste o è stata spostata. Forse stavi cercando gli
          orari della Circumvesuviana?
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            🚆 Torna alla Ricerca Treni
          </Link>

          <Link
            href="/destinazioni-turistiche"
            className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            🏛️ Destinazioni Turistiche
          </Link>

          <Link
            href="/tempi-viaggio"
            className="inline-block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            ⏱️ Tempi di Viaggio
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Link utili:</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link href="/stazioni-napoli" className="text-blue-600 hover:underline">
              Stazioni Napoli
            </Link>
            <Link href="/accessibilita" className="text-blue-600 hover:underline">
              Accessibilità
            </Link>
            <Link href="/faq" className="text-blue-600 hover:underline">
              FAQ
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Suggerimento:</strong> Usa la ricerca nella pagina principale per trovare
            orari in tempo reale della Circumvesuviana.
          </p>
        </div>
      </div>
    </div>
  );
}
