"use client";

import { useMemo } from "react";
import Image from "next/image";
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
const POPULAR: { name: string; label: string; tagline: TranslationKey; photo: string }[] = [
  { name: "sorrento", label: "Sorrento", tagline: "destSorrento", photo: "/destinations/sorrento.jpg" },
  { name: "pompei scavi", label: "Pompei Scavi", tagline: "destPompei", photo: "/destinations/pompei.jpg" },
  { name: "ercolano scavi", label: "Ercolano Scavi", tagline: "destErcolano", photo: "/destinations/ercolano.jpg" },
  { name: "pozzuoli", label: "Pozzuoli", tagline: "destPozzuoli", photo: "/destinations/pozzuoli.jpg" },
  { name: "vico equense", label: "Vico Equense", tagline: "destVico", photo: "/destinations/vico.jpg" },
];

const SHADE = "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.65))";

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
                  className="relative flex h-[112px] w-[132px] flex-col justify-end overflow-hidden rounded-2xl bg-sand px-3 py-2.5 text-left text-white transition hover:-translate-y-0.5 hover:shadow-warm-sm md:w-[150px]"
                >
                  <Image src={d.photo} alt="" fill sizes="150px" className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-0" style={{ background: SHADE }} />
                  <span className="relative text-sm font-bold leading-tight">{d.label}</span>
                  <small className="relative mt-0.5 text-[11px] font-medium opacity-90">{t(d.tagline)}</small>
                </button>
              </li>
            ))}
      </ul>
    </section>
  );
}
