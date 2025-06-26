"use client";

/**
 * @fileoverview Language provider component for client-side usage
 *
 * This file provides the React context provider for language selection.
 */

import { createContext, useState, useEffect, ReactNode } from "react";
import { languages, Language } from "../lib/i18n";

// Context for language selection
export const LanguageContext = createContext<{
  language: Language;
  setLanguage?: (lang: Language) => void;
}>({ language: "it" });

/**
 * Provider component for language selection
 * Provides language context to all child components
 */
export default function LanguageProvider({
  children,
  defaultLanguage = "it",
}: {
  children: ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    try {
      // Try to load language preference from localStorage
      const savedLanguage = (localStorage.getItem("language") as Language) || defaultLanguage;
      if (savedLanguage && languages[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      // In case localStorage is not available (e.g. in SSR)
      console.warn("Could not access localStorage", error);
    }
  }, [defaultLanguage]);

  const handleSetLanguage = (lang: Language) => {
    if (languages[lang]) {
      setLanguage(lang);
      try {
        localStorage.setItem("language", lang);
      } catch (error) {
        console.warn("Could not write to localStorage", error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
