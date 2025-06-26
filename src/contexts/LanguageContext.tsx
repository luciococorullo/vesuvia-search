/**
 * @fileoverview Language Context for internationalization
 *
 * This context provides language state management and translation functions
 * throughout the VesuviaSearch application. It handles:
 * - Language persistence in localStorage
 * - Browser language detection
 * - Translation function with fallbacks
 * - Language switching functionality
 *
 * @author VesuviaSearch Team
 * @version 1.0.0
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "@/lib/i18n";

/**
 * Interface for the Language Context
 */
interface LanguageContextType {
  language: Language; // Current active language
  setLanguage: (lang: Language) => void; // Function to change language
  t: (key: TranslationKey) => string; // Translation function
  isLoaded: boolean; // Loading state for hydration
}

/**
 * Language Context - provides language state to the app
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language Provider Component
 *
 * Manages language state, persistence, and translation functionality.
 * Features:
 * - Automatic browser language detection
 * - localStorage persistence
 * - Fallback to English if translation missing
 * - Hydration-safe loading state
 *
 * @param children - Child components that need access to language context
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Load saved language from localStorage on component mount
   * Also detects browser language as fallback
   */
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;

    if (savedLanguage && translations[savedLanguage]) {
      // Use saved language if valid
      setLanguage(savedLanguage);
    } else {
      // Detect browser language and use if supported
      const browserLang = navigator.language.split("-")[0] as Language;
      if (translations[browserLang]) {
        setLanguage(browserLang);
      }
      // Otherwise defaults to "en" from useState
    }

    setIsLoaded(true);
  }, []);

  /**
   * Save language preference to localStorage when it changes
   * (but not on initial load to avoid hydration issues)
   */
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("language", language);
    }
  }, [language, isLoaded]);

  /**
   * Translation function with fallback support
   *
   * @param key - Translation key to look up
   * @returns Translated string in current language, fallback to English, or key itself
   */
  const t = (key: TranslationKey): string => {
    // Handle nested translation keys with dot notation (e.g., 'routePages.common.metaTitle')
    const keys = key.split(".");
    let currentValue: any = translations[language];
    let englishValue: any = translations["en"];

    // Navigate through nested objects based on the key path
    for (const k of keys) {
      currentValue = currentValue?.[k];
      englishValue = englishValue?.[k];
    }

    return typeof currentValue === "string"
      ? currentValue
      : typeof englishValue === "string"
      ? englishValue
      : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to use the Language Context
 *
 * Provides type-safe access to language functionality.
 * Must be used within a LanguageProvider.
 *
 * @returns LanguageContextType object with language state and functions
 * @throws Error if used outside of LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
