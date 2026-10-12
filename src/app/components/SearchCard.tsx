"use client";

import { ArrowUpDown } from "lucide-react";
import type { Station } from "@/lib/eav/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { LineDots } from "@/components/ui/LinePill";
import { WhenChips, type When } from "./WhenChips";

interface Props {
  from?: Station;
  to?: Station;
  /** Name shown while stations are loading (from storage/URL). */
  fromFallback?: string;
  toFallback?: string;
  when: When;
  onWhenChange: (w: When) => void;
  onPickFrom: () => void;
  onPickTo: () => void;
  onSwap: () => void;
  onSubmit: () => void;
  error?: string | null;
  className?: string;
}

function Field({
  kind,
  label,
  station,
  fallback,
  placeholder,
  onClick,
}: {
  kind: "from" | "to";
  label: string;
  station?: Station;
  fallback?: string;
  placeholder: string;
  onClick: () => void;
}) {
  const name = station?.name ?? fallback;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      className={cn(
        "relative block w-full py-[13px] pl-6 pr-12 text-left",
        kind === "to" && "border-t border-line",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0.5 top-[28px] h-[9px] w-[9px] rounded-full border-[2.5px] border-ink",
          kind === "to" && "bg-ink",
        )}
      />
      <span className="block text-[11px] font-medium text-muted">{label}</span>
      <span className="flex items-center gap-2">
        <strong className={cn("truncate text-base font-semibold", !name && "font-medium text-faint")}>
          {name ?? placeholder}
        </strong>
        {station && <LineDots lines={station.lines} />}
      </span>
    </button>
  );
}

export function SearchCard({
  from,
  to,
  fromFallback,
  toFallback,
  when,
  onWhenChange,
  onPickFrom,
  onPickTo,
  onSwap,
  onSubmit,
  error,
  className,
}: Props) {
  const { t } = useLanguage();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn(
        "relative z-10 rounded-[22px] bg-card px-4 pb-3.5 pt-1.5 shadow-warm",
        className,
      )}
      aria-label={t("searchTrains")}
    >
      <div className="relative">
        <Field
          kind="from"
          label={t("from")}
          station={from}
          fallback={fromFallback}
          placeholder={t("chooseStation")}
          onClick={onPickFrom}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[5px] top-[44px] h-[42px] border-l-2 border-dotted border-[#cdbfb0]"
        />
        <Field
          kind="to"
          label={t("to")}
          station={to}
          fallback={toFallback}
          placeholder={t("chooseStation")}
          onClick={onPickTo}
        />
        <button
          type="button"
          onClick={onSwap}
          disabled={!from && !to}
          className="absolute right-0 top-1/2 grid h-[34px] w-[34px] -translate-y-1/2 place-items-center rounded-full border border-line bg-card text-muted transition hover:rotate-180 hover:text-ink disabled:opacity-40 disabled:hover:rotate-0"
        >
          <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("swap")}</span>
        </button>
      </div>

      <div className="mb-3 mt-1">
        <WhenChips value={when} onChange={onWhenChange} />
      </div>

      {error && (
        <p role="alert" className="mb-2 text-[12.5px] font-semibold text-late">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-[14px] bg-accent py-3.5 text-[15px] font-bold text-white transition hover:bg-accent-dark active:scale-[0.99]"
      >
        {t("searchTrains")}
      </button>
    </form>
  );
}
