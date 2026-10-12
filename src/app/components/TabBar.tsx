"use client";

import { Radio, Route, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export type Tab = "trip" | "board" | "favorites";

const ITEMS: { tab: Tab; icon: typeof Route; key: "tabTrip" | "tabBoard" | "tabFavorites" }[] = [
  { tab: "trip", icon: Route, key: "tabTrip" },
  { tab: "board", icon: Radio, key: "tabBoard" },
  { tab: "favorites", icon: Star, key: "tabFavorites" },
];

export function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const { t } = useLanguage();
  return (
    <nav
      aria-label={t("mainNav")}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 backdrop-blur-md",
        "md:inset-x-auto md:bottom-5 md:left-1/2 md:w-[400px] md:-translate-x-1/2 md:rounded-full md:border md:pb-2 md:shadow-warm",
      )}
    >
      <ul className="flex justify-around">
        {ITEMS.map(({ tab, icon: Icon, key }) => {
          const on = tab === active;
          return (
            <li key={tab}>
              <button
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => onChange(tab)}
                className={cn(
                  "flex min-w-[76px] flex-col items-center gap-[3px] rounded-xl px-3 pb-1 text-[11px] font-semibold transition-colors",
                  on ? "text-ink" : "text-[#a2958a] hover:text-ink-soft",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("h-[3px] w-5 rounded-sm", on ? "bg-accent" : "bg-transparent")}
                />
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={on ? 2.4 : 2} />
                {t(key)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
