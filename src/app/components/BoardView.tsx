"use client";

import { useId, useState } from "react";
import { ChevronDown, MapPin, RefreshCw, Star, TrainFront } from "lucide-react";
import type { BoardEntry, Station } from "@/lib/eav/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBoard, type BoardType } from "@/hooks/useBoard";
import { isNotFound } from "@/hooks/fetcher";
import { useFavorites } from "@/hooks/useStorage";
import { isFavoriteStation, toggleFavoriteStation } from "@/lib/storage";
import { addMinutesToHHMM, cn, formatTime } from "@/lib/utils";
import { Badge, PlatformBadge } from "@/components/ui/Badge";
import { EmptyState, TextButton } from "@/components/ui/EmptyState";
import { lineColor } from "@/components/ui/LinePill";
import { Skeleton } from "@/components/ui/Skeleton";

interface Props {
  station?: Station;
  stationLoading: boolean;
  type: BoardType;
  onTypeChange: (t: BoardType) => void;
  onPickStation: () => void;
}

function BoardRow({ entry, type }: { entry: BoardEntry; type: BoardType }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const late = entry.delayMinutes > 0;
  const expected = late ? addMinutesToHHMM(entry.time, entry.delayMinutes) : entry.time;
  const color = lineColor(entry.line, entry.category);
  const canExpand = type === "departures" && entry.stops.length > 0;
  const viaStops = entry.stops
    .slice(0, -1)
    .slice(0, 2)
    .map((s) => s.station)
    .join(", ");
  const detailsId = useId();

  const content = (
    <>
      <span aria-hidden="true" className="self-stretch" style={{ background: color }} />
      <span className={cn("text-lg font-bold leading-tight tracking-[-0.02em] tnum", entry.cancelled && "line-through")}>
        {expected}
        {late && (
          <s className="block text-[11px] font-medium text-faint">
            <span className="sr-only">{t("time")} </span>
            {entry.time}
          </s>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14.5px] font-semibold">{entry.endpoint}</span>
        <small className="mt-0.5 block truncate text-[11.5px] font-medium text-muted tnum">
          {entry.trainNumber}
          {viaStops ? ` · ${t("via", { stops: viaStops })}` : entry.category ? ` · ${entry.category}` : ""}
        </small>
      </span>
      <span className="flex flex-col items-end gap-1">
        {entry.platform && <PlatformBadge>{t("platformShort", { p: entry.platform })}</PlatformBadge>}
        {entry.cancelled ? (
          <Badge tone="late">{t("cancelled")}</Badge>
        ) : late ? (
          <Badge tone="late">+{entry.delayMinutes}</Badge>
        ) : (
          <Badge tone="ok">{t("ok")}</Badge>
        )}
      </span>
    </>
  );

  const gridCls = "grid w-full grid-cols-[4px_52px_1fr_auto] items-center gap-x-3 py-3 pr-3.5 text-left";

  return (
    <li className="border-t border-line first:border-t-0">
      {canExpand ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((o) => !o)}
          className={cn(gridCls, "hover:bg-sand/40")}
        >
          {content}
        </button>
      ) : (
        <div className={gridCls}>{content}</div>
      )}
      {canExpand && open && (
        <ol
          id={detailsId}
          className="animate-fade-in pb-3 pl-[72px] pr-4"
          style={{ "--c": color } as React.CSSProperties}
        >
          {entry.stops.map((s, i) => (
            <li
              key={`${s.station}-${i}`}
              className={cn("stop", i === 0 && "first", i === entry.stops.length - 1 && "last major")}
            >
              <div className="dot" aria-hidden="true" />
              <div className={cn("pb-2 pt-1 text-[13px]", i === entry.stops.length - 1 && "font-bold")}>
                {s.station}
              </div>
              <div className="py-1 text-[13px] font-semibold text-ink-soft tnum">{s.time}</div>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

function BoardSkeleton() {
  return (
    <ul aria-hidden="true" className="mx-4 overflow-hidden rounded-[18px] border border-line bg-card md:mx-5">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className="grid grid-cols-[4px_52px_1fr_auto] items-center gap-x-3 border-t border-line py-3.5 pr-3.5 first:border-t-0">
          <span className="self-stretch bg-line" />
          <Skeleton className="h-5 w-11" />
          <span className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </span>
          <Skeleton className="h-5 w-12" />
        </li>
      ))}
    </ul>
  );
}

export function BoardView({ station, stationLoading, type, onTypeChange, onPickStation }: Props) {
  const { t } = useLanguage();
  const q = useBoard(station?.board ? station.id : null, type);
  const favorites = useFavorites();
  const fav = station ? isFavoriteStation(favorites, station.id) : false;
  const uid = useId();
  const types: BoardType[] = ["departures", "arrivals"];

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = type === "departures" ? "arrivals" : "departures";
      onTypeChange(next);
      document.getElementById(`${uid}-tab-${next}`)?.focus();
    }
  };

  let body: React.ReactNode;
  if (!station) {
    body = stationLoading ? (
      <BoardSkeleton />
    ) : (
      <EmptyState
        icon={<MapPin aria-hidden="true" className="h-5 w-5" />}
        title={t("tabBoard")}
        body={t("boardPickStation")}
        action={<TextButton onClick={onPickStation}>{t("chooseStation")}</TextButton>}
      />
    );
  } else if (!station.board || isNotFound(q.error)) {
    body = (
      <EmptyState
        icon={<TrainFront aria-hidden="true" className="h-5 w-5" />}
        title={station.name}
        body={t("boardNoBoard")}
        action={<TextButton onClick={onPickStation}>{t("chooseStation")}</TextButton>}
      />
    );
  } else if (q.isLoading) {
    body = <BoardSkeleton />;
  } else if (q.isError && !q.data) {
    body = (
      <EmptyState
        role="alert"
        title={t("errorTitle")}
        body={t("errorBody")}
        action={
          <TextButton onClick={() => q.refetch()}>
            <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            {t("retry")}
          </TextButton>
        }
      />
    );
  } else if (q.data && q.data.entries.length === 0) {
    body = <EmptyState role="status" title={station.name} body={t("boardEmpty")} />;
  } else if (q.data) {
    body = (
      <ul className="mx-4 overflow-hidden rounded-[18px] border border-line bg-card md:mx-5">
        {q.data.entries.map((e, i) => (
          <BoardRow key={`${e.trainNumber}-${e.time}-${i}`} entry={e} type={type} />
        ))}
      </ul>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="px-5 pb-3.5 pt-[max(env(safe-area-inset-top),16px)]">
        <h1 className="pt-3 font-serif text-[25px] font-semibold tracking-[-0.02em] md:text-[30px]">
          {t(type)}
        </h1>
      </div>

      <div className="flex gap-2 px-5 pb-3">
        <button
          type="button"
          onClick={onPickStation}
          aria-haspopup="dialog"
          className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-[14px] border border-line bg-card px-3.5 py-2.5 text-left hover:border-[#e2d6c5]"
        >
          <span className="min-w-0">
            <small className="block text-[11px] font-medium text-muted">{t("station")}</small>
            <span className="block truncate text-[15px] font-semibold">
              {station?.name ?? (stationLoading ? "…" : t("chooseStation"))}
            </span>
          </span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
        </button>
        {station && (
          <button
            type="button"
            aria-pressed={fav}
            onClick={() => toggleFavoriteStation({ id: station.id, name: station.name })}
            className="grid w-12 place-items-center rounded-[14px] border border-line bg-card hover:bg-sand/50"
          >
            <Star aria-hidden="true" className={cn("h-5 w-5", fav ? "fill-sun text-sun" : "text-muted")} />
            <span className="sr-only">{fav ? t("removeFavorite") : t("addFavorite")}</span>
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label={t("tabBoard")}
        className="mx-5 mb-1.5 flex rounded-xl bg-sand-2 p-[3px]"
        onKeyDown={onTabKey}
      >
        {types.map((ty) => {
          const on = ty === type;
          return (
            <button
              key={ty}
              id={`${uid}-tab-${ty}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => onTypeChange(ty)}
              className={cn(
                "flex-1 rounded-[9px] py-2 text-[13px] font-semibold transition",
                on ? "bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : "text-muted hover:text-ink",
              )}
            >
              {t(ty)}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[30px] items-center justify-between px-5 pb-1 pt-1.5" aria-live="polite">
        {q.data && station?.board ? (
          <p className="flex items-center gap-2 text-[11.5px] font-semibold text-ok tnum">
            <span aria-hidden="true" className="live-dot" />
            {t("updatedAt", { time: formatTime(q.data.updatedAt) })} · {t("live")}
          </p>
        ) : (
          <span />
        )}
        {station?.board && q.data && (
          <button
            type="button"
            onClick={() => q.refetch()}
            disabled={q.isFetching}
            className="grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-sand disabled:opacity-60"
          >
            <RefreshCw aria-hidden="true" className={cn("h-3.5 w-3.5", q.isFetching && "animate-spin")} />
            <span className="sr-only">{t("refresh")}</span>
          </button>
        )}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${type}`}>
        {body}
      </div>
    </div>
  );
}
