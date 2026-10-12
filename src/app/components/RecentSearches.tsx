"use client";

import { ChevronRight, Clock } from "lucide-react";
import type { RouteRef } from "@/lib/storage";
import { clearRecents } from "@/lib/storage";
import { useRecents } from "@/hooks/useStorage";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function RouteList({
  routes,
  onPick,
  icon,
  trailing,
}: {
  routes: RouteRef[];
  onPick: (r: RouteRef) => void;
  icon?: React.ReactNode;
  trailing?: (r: RouteRef) => React.ReactNode;
}) {
  return (
    <ul className="mx-4 overflow-hidden rounded-2xl border border-line bg-card md:mx-5">
      {routes.map((r) => (
        <li key={`${r.from.id}-${r.to.id}`} className="flex items-center border-t border-line first:border-t-0">
          <button
            type="button"
            onClick={() => onPick(r)}
            className="flex min-w-0 flex-1 items-center gap-2.5 px-3.5 py-3 text-left text-sm font-medium hover:bg-sand/50"
          >
            {icon}
            <span className="truncate">{r.from.name}</span>
            <span aria-hidden="true" className="text-muted">
              →
            </span>
            <span className="sr-only">,</span>
            <span className="truncate">{r.to.name}</span>
            {!trailing && <ChevronRight aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-faint" />}
          </button>
          {trailing?.(r)}
        </li>
      ))}
    </ul>
  );
}

export function RecentSearches({ onPick }: { onPick: (r: RouteRef) => void }) {
  const { t } = useLanguage();
  const recents = useRecents();
  if (!recents.length) return null;

  return (
    <section aria-labelledby="recent-title">
      <SectionTitle
        id="recent-title"
        action={
          <button
            type="button"
            onClick={clearRecents}
            className="text-[12.5px] font-semibold text-sea hover:underline"
          >
            {t("clear")}
          </button>
        }
      >
        {t("recent")}
      </SectionTitle>
      <RouteList
        routes={recents}
        onPick={onPick}
        icon={<Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-faint" />}
      />
    </section>
  );
}
