"use client";

import { useId } from "react";
import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { addDays, cn, formatDateShort, romeNow } from "@/lib/utils";

export type WhenMode = "now" | "today" | "tomorrow" | "custom";

export interface When {
  mode: WhenMode;
  /** YYYY-MM-DD, used in "custom" mode */
  date: string;
  /** HH:MM, used in every mode except "now" */
  time: string;
}

export function initialWhen(): When {
  const { date, time } = romeNow();
  return { mode: "now", date, time };
}

/** Concrete Rome date/time for a `When` (evaluated at call time for "now"). */
export function resolveWhen(when: When): { date: string; time: string } {
  const now = romeNow();
  switch (when.mode) {
    case "now":
      return now;
    case "today":
      return { date: now.date, time: when.time };
    case "tomorrow":
      return { date: addDays(now.date, 1), time: when.time };
    case "custom":
      return { date: when.date, time: when.time };
  }
}

export function WhenChips({ value, onChange }: { value: When; onChange: (w: When) => void }) {
  const { t, locale } = useLanguage();
  const uid = useId();

  const select = (mode: WhenMode) => {
    const now = romeNow();
    if (mode === "now") return onChange({ ...value, mode, ...now });
    if (mode === "today") return onChange({ ...value, mode, time: value.mode === "now" ? now.time : value.time });
    if (mode === "tomorrow")
      return onChange({ ...value, mode, time: value.mode === "now" ? "08:00" : value.time });
    return onChange({
      ...value,
      mode,
      date: value.mode === "custom" ? value.date : addDays(now.date, value.mode === "tomorrow" ? 1 : 0),
    });
  };

  const chips: { mode: WhenMode; label: React.ReactNode; aria: string }[] = [
    { mode: "now", label: t("now"), aria: t("now") },
    {
      mode: "today",
      label: value.mode === "today" ? `${t("today")} ${value.time}` : t("today"),
      aria: t("today"),
    },
    {
      mode: "tomorrow",
      label: value.mode === "tomorrow" ? `${t("tomorrow")} ${value.time}` : t("tomorrow"),
      aria: t("tomorrow"),
    },
    {
      mode: "custom",
      label:
        value.mode === "custom" ? (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDateShort(value.date, locale)} {value.time}
          </span>
        ) : (
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
        ),
      aria: t("pickDate"),
    },
  ];

  const today = romeNow().date;

  return (
    <div>
      <div role="radiogroup" aria-label={t("when")} className="flex flex-wrap gap-1.5">
        {chips.map((c) => {
          const on = value.mode === c.mode;
          return (
            <button
              key={c.mode}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={c.mode === "custom" ? c.aria : undefined}
              onClick={() => select(c.mode)}
              className={cn(
                "inline-flex min-h-[34px] items-center rounded-full px-3 text-[12.5px] font-semibold tnum transition-colors",
                on ? "bg-ink text-white" : "bg-sand text-ink-soft hover:bg-sand-2",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {value.mode !== "now" && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2 animate-fade-in">
          {value.mode === "custom" && (
            <>
              <label htmlFor={`${uid}-date`} className="sr-only">
                {t("date")}
              </label>
              <input
                id={`${uid}-date`}
                type="date"
                className="chip-input"
                min={today}
                value={value.date}
                onChange={(e) => e.target.value && onChange({ ...value, date: e.target.value })}
              />
            </>
          )}
          <label htmlFor={`${uid}-time`} className="sr-only">
            {t("time")}
          </label>
          <input
            id={`${uid}-time`}
            type="time"
            className="chip-input"
            value={value.time}
            step={300}
            onChange={(e) => e.target.value && onChange({ ...value, time: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
