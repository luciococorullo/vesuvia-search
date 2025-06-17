"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0] as Language;
      if (translations[browserLang]) {
        setLanguage(browserLang);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save language to localStorage when it changes (but not on initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("language", language);
    }
  }, [language, isLoaded]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
