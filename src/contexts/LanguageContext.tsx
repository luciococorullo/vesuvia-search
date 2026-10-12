"use client";

/**
 * Language state + translation function.
 *
 * Resolution order on first load: saved choice (localStorage) → browser
 * language if supported (so Italian browsers get Italian) → English.
 * Server render uses Italian (the site's primary audience) and switches
 * after hydration if needed.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  isLanguage,
  languages,
  translate,
  type Language,
  type TranslationKey,
  type TranslationVars,
} from "@/lib/i18n";

const STORAGE_KEY = "language";

interface LanguageContextType {
  language: Language;
  /** BCP-47 locale for Intl formatting (e.g. "it-IT"). */
  locale: string;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, vars?: TranslationVars) => string;
  isLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const noopSubscribe = () => () => {};

function detectLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const c of candidates) {
    const code = c?.split("-")[0]?.toLowerCase();
    if (isLanguage(code)) return code;
  }
  return FALLBACK_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server/hydration render uses DEFAULT_LANGUAGE; the client then reads the saved/browser language.
  const detected = useSyncExternalStore(noopSubscribe, detectLanguage, () => null);
  const [chosen, setChosen] = useState<Language | null>(null);
  const language = chosen ?? detected ?? DEFAULT_LANGUAGE;
  const isLoaded = detected !== null;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setChosen(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      locale: languages[language].locale,
      setLanguage,
      t: (key, vars) => translate(language, key, vars),
      isLoaded,
    }),
    [language, setLanguage, isLoaded],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
