"use client";

import { useMemo } from "react";
import type { Station } from "@/lib/eav/types";
import type { TranslationKey } from "@/lib/i18n";
import { normalize } from "@/lib/search";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Hardcoded by NORMALIZED NAME (never ids) and resolved against the live list:
 * an exact match wins, otherwise the first station whose name starts with it
 * (EAV writes e.g. "Pompei Scavi Villa dei Misteri"). Unresolved ones are skipped.
 */
const POPULAR: { name: string; label: string; tagline: TranslationKey; gradient: string }[] = [
  { name: "sorrento", label: "Sorrento", tagline: "destSorrento", gradient: "linear-gradient(135deg,#F0C04A,#D98E1E)" },
  { name: "pompei scavi", label: "Pompei Scavi", tagline: "destPompei", gradient: "linear-gradient(135deg,#C9733F,#8E3B1F)" },
  { name: "ercolano scavi", label: "Ercolano Scavi", tagline: "destErcolano", gradient: "linear-gradient(135deg,#3E8FB0,#1D4E6B)" },
  { name: "pozzuoli", label: "Pozzuoli", tagline: "destPozzuoli", gradient: "linear-gradient(135deg,#2BA59A,#0F5E63)" },
  { name: "vico equense", label: "Vico Equense", tagline: "destVico", gradient: "linear-gradient(135deg,#8C7AC4,#4E3A86)" },
];

const SHADE = "linear-gradient(180deg, transparent 30%, rgba(0,0,0,.45))";

export function PopularDestinations({
  stations,
  isLoading,
  onPick,
}: {
  stations: Station[];
  isLoading: boolean;
  onPick: (s: Station) => void;
}) {
  const { t } = useLanguage();

  const resolved = useMemo(() => {
    const norm = stations.map((s) => [normalize(s.name), s] as const);
    return POPULAR.flatMap((p) => {
      const hit =
        norm.find(([n]) => n === p.name)?.[1] ?? norm.find(([n]) => n.startsWith(p.name + " "))?.[1];
      return hit ? [{ ...p, station: hit }] : [];
    });
  }, [stations]);

  if (!isLoading && resolved.length === 0) return null;

  return (
    <section aria-labelledby="popular-title">
      <SectionTitle id="popular-title">{t("popularDestinations")}</SectionTitle>
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-5 px-5 pb-1">
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <li key={i} className="shrink-0">
                <Skeleton className="h-[112px] w-[132px] rounded-2xl" />
              </li>
            ))
          : resolved.map((d) => (
              <li key={d.name} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => onPick(d.station)}
                  className="flex h-[112px] w-[132px] flex-col justify-end rounded-2xl px-3 py-2.5 text-left text-white transition hover:-translate-y-0.5 hover:shadow-warm-sm md:w-[150px]"
                  style={{ background: `${SHADE}, ${d.gradient}` }}
                >
                  <span className="text-sm font-bold leading-tight">{d.label}</span>
                  <small className="mt-0.5 text-[11px] font-medium opacity-90">{t(d.tagline)}</small>
                </button>
              </li>
            ))}
      </ul>
    </section>
  );
}
