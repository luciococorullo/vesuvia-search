"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";
import type { BoardStop, Journey, Leg, Station } from "@/lib/eav/types";
import { normalize } from "@/lib/search";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTrainStops } from "@/hooks/useTrainStops";
import {
  cn,
  formatDuration,
  formatTime,
  formatTimePlus,
  minutesBetween,
  minutesUntil,
} from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { LinePill, lineColor } from "@/components/ui/LinePill";

/** Live stops are only published on station boards shortly before departure. */
const LIVE_WINDOW_MIN = 180;
/** Above this many intermediate stops the middle part is collapsed. */
const COLLAPSE_OVER = 5;

type ResolveByName = (name: string) => Station | undefined;

export function StatusBadge({
  delayMinutes,
  cancelled,
  departure,
  now,
}: {
  delayMinutes: number;
  cancelled: boolean;
  departure: string;
  now: number | null;
}) {
  const { t } = useLanguage();
  if (cancelled) return <Badge tone="late">{t("cancelled")}</Badge>;
  if (delayMinutes > 0)
    return <Badge tone="late">{t("lateMin", { n: delayMinutes })}</Badge>;
  // "On time" only means something for trains running soon.
  if (now != null) {
    const m = minutesUntil(departure, now);
    if (m > -30 && m < LIVE_WINDOW_MIN)
      return <Badge tone="ok">{t("onTime")}</Badge>;
  }
  return null;
}

function changesLabel(t: ReturnType<typeof useLanguage>["t"], n: number) {
  if (n <= 0) return t("direct");
  return n === 1 ? t("oneChange") : t("nChanges", { n });
}

function StopRow({
  name,
  sub,
  time,
  kind,
  position,
}: {
  name: React.ReactNode;
  sub?: React.ReactNode;
  time?: string;
  kind: "major" | "minor" | "more";
  position?: "first" | "last";
}) {
  return (
    <li
      className={cn(
        "stop",
        kind === "major" && "major",
        kind === "more" && "more",
        position,
      )}
    >
      <div className="dot" aria-hidden="true" />
      <div
        className={cn(
          "pb-2.5 pt-1",
          kind === "major" && "font-bold",
          kind === "more" && "text-xs text-muted",
        )}
      >
        {name}
        {sub && (
          <small className="mt-px block text-[11.5px] font-medium text-muted">
            {sub}
          </small>
        )}
      </div>
      <div className="py-1 font-semibold text-ink-soft tnum">{time}</div>
    </li>
  );
}

function LegDiagram({
  leg,
  resolveByName,
  now,
  showLine,
}: {
  leg: Leg;
  resolveByName: ResolveByName;
  now: number | null;
  /** Show line pill + train under the origin (useful only for journeys with changes). */
  showLine: boolean;
}) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const origin = resolveByName(leg.from);
  const minsToDeparture =
    now == null ? Infinity : minutesUntil(leg.departure, now);
  const inWindow = minsToDeparture > -5 && minsToDeparture < LIVE_WINDOW_MIN;
  const stopsQ = useTrainStops(
    origin?.id,
    leg.trainNumber,
    inWindow && !leg.cancelled,
  );

  const intermediate = useMemo<BoardStop[] | null>(() => {
    const stops = stopsQ.data;
    if (!stops) return null;
    const target = normalize(leg.to);
    const targetId = resolveByName(leg.to)?.id;
    const end = stops.findIndex(
      (s) =>
        normalize(s.station) === target ||
        (targetId != null && resolveByName(s.station)?.id === targetId),
    );
    return end >= 0 ? stops.slice(0, end) : stops;
  }, [stopsQ.data, leg.to, resolveByName]);

  const delay = leg.delayMinutes > 0 ? leg.delayMinutes : 0;
  const depTime = formatTime(leg.departure);
  const arrTime = formatTime(leg.arrival);

  let middle: React.ReactNode;
  if (intermediate && intermediate.length) {
    const collapse = !showAll && intermediate.length > COLLAPSE_OVER;
    const head = collapse ? intermediate.slice(0, 2) : intermediate;
    const tail = collapse ? intermediate.slice(-2) : [];
    const hidden = intermediate.length - head.length - tail.length;
    middle = (
      <>
        {head.map((s, i) => (
          <StopRow key={`h${i}`} kind="minor" name={s.station} time={s.time} />
        ))}
        {collapse && (
          <StopRow
            kind="more"
            name={
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="font-semibold text-sea hover:underline"
              >
                {t("nStops", { n: hidden })}
              </button>
            }
          />
        )}
        {tail.map((s, i) => (
          <StopRow key={`t${i}`} kind="minor" name={s.station} time={s.time} />
        ))}
      </>
    );
  } else if (inWindow && stopsQ.isLoading) {
    middle = (
      <StopRow
        kind="more"
        name={<span className="animate-pulse">{t("stopsLoading")}</span>}
      />
    );
  } else if (!inWindow) {
    middle = <StopRow kind="more" name={t("stopsLater")} />;
  } else {
    middle = <StopRow kind="more" name="···" />;
  }

  return (
    <ol
      style={
        { "--c": lineColor(leg.line, leg.category) } as React.CSSProperties
      }
    >
      <StopRow
        kind="major"
        position="first"
        name={leg.from}
        sub={
          showLine && (
            <span className="mt-1 flex flex-wrap items-center gap-1.5">
              <LinePill
                line={leg.line}
                rawName={leg.lineName}
                category={leg.category}
              />
              <span className="tnum">
                {leg.trainNumber}
                {leg.category ? ` · ${leg.category}` : ""}
              </span>
            </span>
          )
        }
        time={depTime}
      />
      {middle}
      <StopRow
        kind="major"
        position="last"
        name={leg.to}
        time={delay ? formatTimePlus(leg.arrival, delay) : arrTime}
        sub={delay ? <s className="tnum">{arrTime}</s> : undefined}
      />
    </ol>
  );
}

export function JourneyCard({
  journey,
  resolveByName,
  now,
  defaultOpen = false,
}: {
  journey: Journey;
  resolveByName: ResolveByName;
  now: number | null;
  defaultOpen?: boolean;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const detailsId = `j-${journey.id}`;
  const first = journey.legs[0];

  // Distinct lines, in travel order.
  const pills = journey.legs.filter(
    (l, i, arr) =>
      arr.findIndex((x) => x.line === l.line && x.category === l.category) ===
      i,
  );
  const trains = journey.legs.map((l) => l.trainNumber).join(" + ");
  const category = journey.legs.length === 1 ? first?.category : undefined;

  return (
    <article
      className={cn(
        "mx-4 my-2.5 rounded-[18px] border border-line bg-card transition-shadow md:mx-5",
        open && "shadow-warm-sm",
        journey.cancelled && "opacity-70",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((o) => !o)}
        className="block w-full rounded-[18px] px-4 py-3.5 text-left"
      >
        <span className="flex items-baseline justify-between gap-3">
          <span
            className={cn(
              "text-[23px] font-bold tracking-[-0.02em] tnum",
              journey.cancelled && "line-through decoration-2",
            )}
          >
            {formatTime(journey.departure)}
            <em
              aria-hidden="true"
              className="mx-1.5 font-normal not-italic text-[#c9bcb0]"
            >
              →
            </em>
            <span className="sr-only"> – </span>
            {formatTime(journey.arrival)}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted">
            {formatDuration(journey.durationMinutes)}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-4 w-4 transition-transform",
                open && "rotate-180",
              )}
            />
          </span>
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-2 text-[12.5px] text-ink-soft">
          {pills.map((l) => (
            <LinePill
              key={`${l.line}-${l.category}`}
              line={l.line}
              rawName={l.lineName}
              category={l.category}
            />
          ))}
          <span className="tnum">
            {trains}
            {category ? ` · ${category}` : ""}
          </span>
          {journey.changes > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold">
              <ArrowRightLeft aria-hidden="true" className="h-3 w-3" />
              {changesLabel(t, journey.changes)}
            </span>
          )}
          <StatusBadge
            delayMinutes={journey.delayMinutes}
            cancelled={journey.cancelled}
            departure={journey.departure}
            now={now}
          />
        </span>
        <span className="sr-only">
          {open ? t("hideDetails") : t("showDetails")}
        </span>
      </button>

      {open && (
        <div id={detailsId} className="animate-fade-in px-4 pb-3">
          {journey.legs.map((leg, i) => {
            const next = journey.legs[i + 1];
            return (
              <div key={`${leg.trainNumber}-${i}`}>
                <LegDiagram
                  leg={leg}
                  resolveByName={resolveByName}
                  now={now}
                  showLine={journey.legs.length > 1}
                />
                {next && (
                  <p className="mb-2.5 ml-8 mt-0.5 rounded-[10px] bg-sand px-2.5 py-2 text-xs text-ink-soft">
                    <strong className="font-semibold text-ink">
                      {t("changeAt", { station: leg.to })}
                    </strong>
                    {" · "}
                    {t("waitMin", {
                      n: Math.max(
                        0,
                        minutesBetween(leg.arrival, next.departure),
                      ),
                    })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export function JourneyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-4 my-2.5 rounded-[18px] border border-line bg-card px-4 py-3.5 md:mx-5"
    >
      <div className="flex justify-between">
        <div className="skeleton h-7 w-40" />
        <div className="skeleton h-4 w-12" />
      </div>
      <div className="mt-3 flex gap-2">
        <div className="skeleton h-5 w-28" />
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  );
}
