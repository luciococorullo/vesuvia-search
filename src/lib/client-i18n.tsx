"use client";

/**
 * @fileoverview Client-side internationalization hooks
 *
 * This file provides React hooks for accessing translations in client components.
 * It works with the translations defined in i18n.ts but provides client-side
 * functionality for language selection and translation.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { languages, translations, Language } from "./i18n";

// Context for language selection
const LanguageContext = createContext<{
  language: Language;
  setLanguage?: (lang: Language) => void;
}>({ language: "it" });

/**
 * Hook to access translations and current language
 * Returns:
 * - t: Translation function
 * - language: Current language code
 * - setLanguage: Function to change the language
 * - languageData: Language name and flag information
 */
export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext);

  // Translation function that looks up a key in the translations object
  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = translations[language] || translations.it;

    for (const k of keys) {
      result = result?.[k as keyof typeof result];
      if (result === undefined) break;
    }

    if (result === undefined) {
      // Fallback to English, then to key itself
      let fallback: any = translations.en;
      for (const k of keys) {
        fallback = fallback?.[k as keyof typeof fallback];
        if (fallback === undefined) break;
      }

      result = fallback || key;
    }

    return result;
  };

  return {
    t,
    language,
    setLanguage,
    languageData: languages[language] || languages.it,
  };
}
