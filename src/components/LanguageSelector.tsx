"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isLanguage, languages } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact "IT ▾" pill backed by a native <select> (accessible, native picker on mobile).
 * `tone="light"` for use on the hero gradient, `"dark"` on cream backgrounds.
 */
export function LanguageSelector({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[13px] font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-offset-2",
        tone === "light"
          ? "bg-white/18 text-white focus-within:outline-white"
          : "bg-sand text-ink focus-within:outline-sea2",
      )}
    >
      <span className="sr-only">{t("language")}</span>
      <span aria-hidden="true" suppressHydrationWarning>
        {languages[language].short}
      </span>
      <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 opacity-80" />
      <select
        value={language}
        onChange={(e) => isLanguage(e.target.value) && setLanguage(e.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {Object.entries(languages).map(([code, { name }]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSelector;
