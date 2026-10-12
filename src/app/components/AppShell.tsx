"use client";

/**
 * Single-page shell. All navigational state lives in the URL so views are
 * linkable and the back button works:
 *   /?from=ID&to=ID&date=YYYY-MM-DD&time=HH:MM   → results
 *   /?tab=board&station=ID&type=arrivals          → live board
 *   /?tab=favorites                               → favourites
 */

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { JourneySearchRequest, Station } from "@/lib/eav/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStations } from "@/hooks/useStations";
import { useFavorites } from "@/hooks/useStorage";
import type { BoardType } from "@/hooks/useBoard";
import {
  addRecent,
  getLastBoardStation,
  setLastBoardStation,
  subscribe as subscribeStorage,
  type RouteRef,
} from "@/lib/storage";
import { romeNow } from "@/lib/utils";
import { BoardView } from "./BoardView";
import { FavoritesView } from "./FavoritesView";
import { Hero } from "./Hero";
import { PopularDestinations } from "./PopularDestinations";
import { RecentSearches } from "./RecentSearches";
import { ResultsView } from "./ResultsView";
import { SearchCard } from "./SearchCard";
import { StationPicker } from "./StationPicker";
import { TabBar, type Tab } from "./TabBar";
import { initialWhen, resolveWhen, type When } from "./WhenChips";

type PickerTarget = "from" | "to" | "board" | null;
type Params = Record<string, string | number | undefined | null>;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function toId(v: string | null): number | null {
  if (!v) return null;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function AppShell() {
  const { t } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();
  const { stations, byId, resolveByName, isLoading, isError, refetch } = useStations();
  const favorites = useFavorites();

  /* ---------- URL state ---------- */
  const rawTab = params.get("tab");
  const tab: Tab = rawTab === "board" || rawTab === "favorites" ? rawTab : "trip";
  const urlFrom = toId(params.get("from"));
  const urlTo = toId(params.get("to"));
  const urlDate = params.get("date");
  const urlTime = params.get("time");
  const request = useMemo<JourneySearchRequest | null>(
    () =>
      tab === "trip" &&
      urlFrom &&
      urlTo &&
      urlFrom !== urlTo &&
      urlDate &&
      DATE_RE.test(urlDate) &&
      urlTime &&
      TIME_RE.test(urlTime)
        ? { fromId: urlFrom, toId: urlTo, date: urlDate, time: urlTime }
        : null,
    [tab, urlFrom, urlTo, urlDate, urlTime],
  );
  const boardType: BoardType = params.get("type") === "arrivals" ? "arrivals" : "departures";
  const urlStation = toId(params.get("station"));

  const go = useCallback(
    (p: Params) => {
      const sp = new URLSearchParams();
      for (const [k, v] of Object.entries(p)) if (v != null && v !== "") sp.set(k, String(v));
      const qs = sp.toString();
      router.push(qs ? `/?${qs}` : "/", { scroll: false });
      window.scrollTo({ top: 0 });
    },
    [router],
  );

  /* ---------- search form state ---------- */
  const [fromId, setFromId] = useState<number | null>(urlFrom);
  const [toIdState, setToId] = useState<number | null>(urlTo);
  const [when, setWhen] = useState<When>(initialWhen);
  const [formError, setFormError] = useState<string | null>(null);
  const [picker, setPicker] = useState<PickerTarget>(null);

  // Keep the form in sync with the URL (e.g. back/forward, shared links).
  const [syncedUrl, setSyncedUrl] = useState({ urlFrom, urlTo });
  if (syncedUrl.urlFrom !== urlFrom || syncedUrl.urlTo !== urlTo) {
    setSyncedUrl({ urlFrom, urlTo });
    if (urlFrom) setFromId(urlFrom);
    if (urlTo) setToId(urlTo);
  }

  const from = fromId != null ? byId.get(fromId) : undefined;
  const to = toIdState != null ? byId.get(toIdState) : undefined;

  /* ---------- board station (URL → last used) ---------- */
  const lastBoard = useSyncExternalStore(subscribeStorage, getLastBoardStation, () => null);
  const boardStationId = urlStation ?? lastBoard;
  const boardStation = boardStationId != null ? byId.get(boardStationId) : undefined;

  /* ---------- actions ---------- */
  const runSearch = useCallback(
    (route: RouteRef, date: string, time: string) => {
      addRecent(route);
      go({ from: route.from.id, to: route.to.id, date, time });
    },
    [go],
  );

  const submit = () => {
    if (!from || !to) return setFormError(t("selectBoth"));
    if (from.id === to.id) return setFormError(t("sameStation"));
    setFormError(null);
    const { date, time } = resolveWhen(when);
    runSearch({ from: { id: from.id, name: from.name }, to: { id: to.id, name: to.name } }, date, time);
  };

  const pickRoute = (r: RouteRef) => {
    setFromId(r.from.id);
    setToId(r.to.id);
    setWhen(initialWhen());
    const now = romeNow();
    runSearch(r, now.date, now.time);
  };

  const onSelectStation = (s: Station) => {
    setFormError(null);
    if (picker === "from") setFromId(s.id);
    else if (picker === "to") setToId(s.id);
    else if (picker === "board") {
      setLastBoardStation(s.id);
      go({ tab: "board", station: s.id, type: boardType === "arrivals" ? "arrivals" : undefined });
    }
  };

  const changeTab = (next: Tab) => {
    if (next === "trip") go({});
    else if (next === "board") go({ tab: "board", station: boardStationId ?? undefined });
    else go({ tab: "favorites" });
  };

  /* ---------- picker config ---------- */
  const pickerTitle = picker === "from" ? t("from") : picker === "to" ? t("to") : t("station");
  const disabledReason = useCallback(
    (s: Station) => (s.board ? null : t("noLiveBoard")),
    [t],
  );
  const otherNetworkTag = useCallback(
    (s: Station) => (from && s.network !== from.network ? t("otherNetwork") : null),
    [from, t],
  );
  const favoriteIds = useMemo(() => favorites.stations.map((s) => s.id), [favorites]);

  /* ---------- views ---------- */
  let view: React.ReactNode;
  if (tab === "board") {
    view = (
      <BoardView
        station={boardStation}
        stationLoading={isLoading && boardStationId != null}
        type={boardType}
        onTypeChange={(ty) =>
          go({ tab: "board", station: boardStationId ?? undefined, type: ty === "arrivals" ? ty : undefined })
        }
        onPickStation={() => setPicker("board")}
      />
    );
  } else if (tab === "favorites") {
    view = (
      <FavoritesView
        byId={byId}
        onPickRoute={pickRoute}
        onOpenBoard={(s) => {
          setLastBoardStation(s.id);
          go({ tab: "board", station: s.id });
        }}
        onStartFrom={(s) => {
          setFromId(s.id);
          go({});
        }}
      />
    );
  } else if (request) {
    view = (
      <ResultsView
        request={request}
        from={byId.get(request.fromId)}
        to={byId.get(request.toId)}
        resolveByName={resolveByName}
        onEdit={() => go({})}
        onLater={(date, time) => go({ from: request.fromId, to: request.toId, date, time })}
      />
    );
  } else {
    view = (
      <>
        <Hero />
        <div className="mx-auto max-w-[560px]">
          <SearchCard
            className="mx-4 -mt-[54px]"
            from={from}
            to={to}
            when={when}
            onWhenChange={setWhen}
            onPickFrom={() => setPicker("from")}
            onPickTo={() => setPicker("to")}
            onSwap={() => {
              setFromId(toIdState);
              setToId(fromId);
            }}
            onSubmit={submit}
            error={formError}
          />
          <PopularDestinations
            stations={stations}
            isLoading={isLoading}
            onPick={(s) => {
              setToId(s.id);
              setFormError(null);
              if (!from) setPicker("from");
            }}
          />
          <RecentSearches onPick={pickRoute} />
        </div>
      </>
    );
  }

  const isHome = tab === "trip" && !request;

  return (
    <>
      <main id="main" className={isHome ? "" : "mx-auto max-w-[560px]"}>
        {view}
      </main>

      <StationPicker
        open={picker !== null}
        onClose={() => setPicker(null)}
        title={pickerTitle}
        stations={stations}
        favoriteIds={favoriteIds}
        selectedId={picker === "from" ? fromId : picker === "to" ? toIdState : boardStationId}
        onSelect={onSelectStation}
        disabledReason={picker === "board" ? disabledReason : undefined}
        tag={picker === "to" ? otherNetworkTag : undefined}
        isLoading={isLoading}
        isError={isError}
        onRetry={refetch}
      />

      <TabBar active={tab} onChange={changeTab} />
    </>
  );
}
