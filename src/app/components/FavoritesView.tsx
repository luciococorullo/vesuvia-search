"use client";

import { Radio, Star, X } from "lucide-react";
import type { Station } from "@/lib/eav/types";
import type { RouteRef } from "@/lib/storage";
import { toggleFavoriteRoute, toggleFavoriteStation } from "@/lib/storage";
import { useFavorites } from "@/hooks/useStorage";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { LineDots } from "@/components/ui/LinePill";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RouteList } from "./RecentSearches";

interface Props {
  byId: Map<number, Station>;
  onPickRoute: (r: RouteRef) => void;
  onOpenBoard: (s: Station) => void;
  onStartFrom: (s: Station) => void;
}

export function FavoritesView({ byId, onPickRoute, onOpenBoard, onStartFrom }: Props) {
  const { t } = useLanguage();
  const fav = useFavorites();
  const empty = !fav.routes.length && !fav.stations.length;

  return (
    <div className="animate-fade-in">
      <div className="px-5 pb-1 pt-[max(env(safe-area-inset-top),16px)]">
        <h1 className="pt-3 font-serif text-[25px] font-semibold tracking-[-0.02em] md:text-[30px]">
          {t("tabFavorites")}
        </h1>
      </div>

      {empty && (
        <EmptyState
          className="mt-4"
          icon={<Star aria-hidden="true" className="h-5 w-5" />}
          title={t("favEmptyTitle")}
          body={t("favEmptyBody")}
        />
      )}

      {fav.routes.length > 0 && (
        <section aria-labelledby="fav-routes">
          <SectionTitle id="fav-routes">{t("favRoutes")}</SectionTitle>
          <RouteList
            routes={fav.routes}
            onPick={onPickRoute}
            icon={<Star aria-hidden="true" className="h-3.5 w-3.5 shrink-0 fill-sun text-sun" />}
            trailing={(r) => (
              <button
                type="button"
                onClick={() => toggleFavoriteRoute(r)}
                className="mr-2 grid h-9 w-9 shrink-0 place-items-center rounded-full text-faint hover:bg-sand hover:text-ink"
              >
                <X aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">
                  {t("remove")}: {r.from.name} → {r.to.name}
                </span>
              </button>
            )}
          />
        </section>
      )}

      {fav.stations.length > 0 && (
        <section aria-labelledby="fav-stations">
          <SectionTitle id="fav-stations">{t("favStations")}</SectionTitle>
          <ul className="mx-4 overflow-hidden rounded-2xl border border-line bg-card md:mx-5">
            {fav.stations.map((ref) => {
              const s = byId.get(ref.id);
              return (
                <li key={ref.id} className="border-t border-line px-3.5 py-3 first:border-t-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{s?.name ?? ref.name}</span>
                    {s && <LineDots lines={s.lines} />}
                    <button
                      type="button"
                      onClick={() => toggleFavoriteStation(ref)}
                      className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full text-faint hover:bg-sand hover:text-ink"
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">
                        {t("remove")}: {ref.name}
                      </span>
                    </button>
                  </div>
                  {s && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.board && (
                        <button
                          type="button"
                          onClick={() => onOpenBoard(s)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-sand-2"
                        >
                          <Radio aria-hidden="true" className="h-3.5 w-3.5 text-ok" />
                          {t("liveBoard")}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onStartFrom(s)}
                        className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-sand-2"
                      >
                        {t("startHere")}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
