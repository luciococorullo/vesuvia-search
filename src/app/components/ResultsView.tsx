"use client";

import {
  CalendarDays,
  ChevronLeft,
  Clock,
  Footprints,
  RefreshCw,
  Star,
  TrainFront,
} from "lucide-react";
import type {
  CrossNetworkPlan,
  Journey,
  JourneySearchRequest,
  Station,
} from "@/lib/eav/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useJourneys } from "@/hooks/useJourneys";
import { useFavorites } from "@/hooks/useStorage";
import { useNow } from "@/hooks/useNow";
import { isFavoriteRoute, toggleFavoriteRoute } from "@/lib/storage";
import { addDays, cn, formatDateShort, romeNow } from "@/lib/utils";
import { EmptyState, TextButton } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { JourneyCard, JourneyCardSkeleton } from "./JourneyCard";

type ResolveByName = (name: string) => Station | undefined;

interface Props {
  request: JourneySearchRequest;
  from?: Station;
  to?: Station;
  resolveByName: ResolveByName;
  onEdit: () => void;
  onLater: (date: string, time: string) => void;
}

function JourneyList({
  journeys,
  resolveByName,
  now,
  openFirst,
}: {
  journeys: Journey[];
  resolveByName: ResolveByName;
  now: number | null;
  openFirst?: boolean;
}) {
  return (
    <div>
      {journeys.map((j, i) => (
        <JourneyCard
          key={j.id}
          journey={j}
          resolveByName={resolveByName}
          now={now}
          defaultOpen={openFirst && i === 0}
        />
      ))}
    </div>
  );
}

function StepHeading({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mx-5 mb-1 mt-6 flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.01em]">
      <span
        aria-hidden="true"
        className="grid h-6 w-6 place-items-center rounded-full bg-ink font-sans text-xs font-bold text-white"
      >
        {n}
      </span>
      {children}
    </h2>
  );
}

function CrossNetworkView({
  plan,
  fromName,
  toName,
  resolveByName,
  now,
}: {
  plan: CrossNetworkPlan;
  fromName: string;
  toName: string;
  resolveByName: ResolveByName;
  now: number | null;
}) {
  const { t } = useLanguage();
  const { transfer } = plan;
  // When origin/destination already is the interchange, that train step doesn't exist.
  const hasFirst = plan.first.fromId !== plan.first.toId;
  const hasSecond = plan.second.fromId !== plan.second.toId;
  let step = 0;

  return (
    <div>
      <div className="mx-4 rounded-[18px] border border-sea/20 bg-sea/[0.06] px-4 py-3.5 md:mx-5">
        <p className="text-[17px] font-semibold text-sea">
          {t("crossTitle")}
        </p>
        <p className="mt-1 text-[13px] text-ink-soft">
          {t("crossBody", { from: fromName, to: toName })}
        </p>
      </div>

      {hasFirst && (
        <section
          aria-label={t("crossStep1", { station: transfer.fromStation })}
        >
          <StepHeading n={++step}>
            {t("crossStep1", { station: transfer.fromStation })}
          </StepHeading>
          {plan.first.journeys.length ? (
            <JourneyList
              journeys={plan.first.journeys}
              resolveByName={resolveByName}
              now={now}
            />
          ) : (
            <EmptyState
              className="mt-2"
              title={t("noTrainsTitle")}
              body={t("noTrainsBody")}
            />
          )}
        </section>
      )}

      <section aria-label={t("crossTransfer")}>
        <StepHeading n={++step}>{t("crossTransfer")}</StepHeading>
        <div className="mx-4 mt-2 flex items-start gap-3 rounded-[18px] border border-dashed border-[#cdbfb0] bg-sand px-4 py-3.5 md:mx-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-ink-soft">
            <Footprints aria-hidden="true" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {transfer.fromStation} <span className="text-muted">→</span>{" "}
              {transfer.toStation}
            </p>
            <p className="mt-0.5 text-[13px] text-ink-soft">
              {transfer.description}
            </p>
            <p className="mt-1 text-xs font-semibold text-muted">
              {t("aboutMin", { n: transfer.minutes })}
            </p>
          </div>
        </div>
      </section>

      {hasSecond && (
        <section aria-label={t("crossStep2", { station: transfer.toStation })}>
          <StepHeading n={++step}>
            {t("crossStep2", { station: transfer.toStation })}
          </StepHeading>
          {hasFirst && (
            <p className="mx-5 mb-1 text-xs text-muted">
              {t("crossHint", {
                n: transfer.minutes,
                station: transfer.fromStation,
              })}
            </p>
          )}
          {plan.second.journeys.length ? (
            <JourneyList
              journeys={plan.second.journeys}
              resolveByName={resolveByName}
              now={now}
            />
          ) : (
            <EmptyState
              className="mt-2"
              title={t("noTrainsTitle")}
              body={t("noTrainsBody")}
            />
          )}
        </section>
      )}
    </div>
  );
}

export function ResultsView({
  request,
  from,
  to,
  resolveByName,
  onEdit,
  onLater,
}: Props) {
  const { t, locale } = useLanguage();
  const q = useJourneys(request);
  const now = useNow(30_000);
  const favorites = useFavorites();
  const fav = isFavoriteRoute(favorites, request);

  const today = romeNow().date;
  const dayLabel =
    request.date === today
      ? t("today")
      : request.date === addDays(today, 1)
        ? t("tomorrow")
        : formatDateShort(request.date, locale);

  const journeys = q.data?.journeys ?? [];
  const cross = q.data?.crossNetwork;
  const count = journeys.length;

  const later = () => {
    const last = journeys[journeys.length - 1];
    if (!last) return;
    const next = romeNow(new Date(new Date(last.departure).getTime() + 60_000));
    onLater(next.date, next.time);
  };

  return (
    <div className="animate-fade-in">
      <div className="px-5 pb-3.5 pt-[max(env(safe-area-inset-top),16px)]">
        <div className="flex items-center justify-between pt-3">
          <button
            type="button"
            onClick={onEdit}
            className="-ml-1.5 inline-flex items-center gap-0.5 rounded-full px-1.5 py-1 text-[13px] font-semibold text-muted hover:text-ink"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            {t("edit")}
          </button>
          {from && to && (
            <button
              type="button"
              aria-pressed={fav}
              onClick={() =>
                toggleFavoriteRoute({
                  from: { id: from.id, name: from.name },
                  to: { id: to.id, name: to.name },
                })
              }
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-sand"
            >
              <Star
                aria-hidden="true"
                className={cn(
                  "h-5 w-5",
                  fav ? "fill-sun text-sun" : "text-muted",
                )}
              />
              <span className="sr-only">
                {fav ? t("removeFavorite") : t("addFavorite")}
              </span>
            </button>
          )}
        </div>
        {from && to ? (
          <h1 className="mt-2.5 text-[25px] font-semibold leading-[1.12] tracking-[-0.02em] md:text-[30px]">
            {from.name} <span className="font-medium text-muted">→</span>
            <br />
            {to.name}
          </h1>
        ) : (
          <div className="mt-3 space-y-2" aria-hidden="true">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-7 w-36" />
          </div>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-[13px] tnum">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 font-semibold text-ink-soft">
            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-muted" />
            {dayLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 font-semibold text-ink-soft">
            <Clock aria-hidden="true" className="h-3.5 w-3.5 text-muted" />
            {t("fromTime", { time: request.time })}
          </span>
          <span className="ml-auto font-medium text-muted" aria-live="polite">
            {q.isSuccess && !cross &&
              (count === 1 ? t("oneSolution") : t("nSolutions", { n: count }))}
          </span>
        </div>
      </div>

      {q.isLoading ? (
        <div aria-busy="true">
          {Array.from({ length: 4 }, (_, i) => (
            <JourneyCardSkeleton key={i} />
          ))}
        </div>
      ) : q.isError ? (
        <EmptyState
          role="alert"
          icon={<TrainFront aria-hidden="true" className="h-5 w-5" />}
          title={t("errorTitle")}
          body={t("errorBody")}
          action={
            <TextButton onClick={() => q.refetch()}>
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
              {t("retry")}
            </TextButton>
          }
        />
      ) : (
        <>
          {count > 0 && (
            <JourneyList
              journeys={journeys}
              resolveByName={resolveByName}
              now={now}
              openFirst
            />
          )}
          {cross && (
            <CrossNetworkView
              plan={cross}
              fromName={from?.name ?? ""}
              toName={to?.name ?? ""}
              resolveByName={resolveByName}
              now={now}
            />
          )}
          {count === 0 && !cross && (
            <EmptyState
              role="status"
              icon={<TrainFront aria-hidden="true" className="h-5 w-5" />}
              title={t("noTrainsTitle")}
              body={t("noTrainsBody")}
              action={<TextButton onClick={onEdit}>{t("edit")}</TextButton>}
            />
          )}
          {count > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={later}
                className="rounded-full border border-line bg-card px-4 py-2 text-[13px] font-semibold text-sea hover:bg-sand/60"
              >
                {t("laterTrains")} →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
