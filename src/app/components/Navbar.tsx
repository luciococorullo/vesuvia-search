"use client";

import Link from "next/link";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import InstallButton to avoid chunk loading issues
const InstallButton = dynamic(() => import("@/components/InstallButton"), {
  ssr: false,
  loading: () => null,
});

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 border-red-500 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <NavigationMenu className="flex items-center h-full">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-red-500 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-600 hover:drop-shadow-lg active:scale-105 interactive-bounce text-with-shadow">
              VesuviaSearch
            </h1>
          </Link>
        </div>
        <div className="hidden sm:flex items-center ml-8 space-x-6">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            Home
          </Link>
          <a 
            href="/stazioni-napoli" 
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            Stazioni Napoli
          </a>
          <a 
            href="/faq" 
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            FAQ Treni Napoli
          </a>
        </div>
      </NavigationMenu>

      <div className="flex items-center gap-3 animate-slide-in-left">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<div className="w-24 h-16 shimmer-loading rounded-lg" />}>
            <InstallButton />
          </Suspense>
        </ErrorBoundary>
        <LanguageSelector />
      </div>
    </div>
  );
}
