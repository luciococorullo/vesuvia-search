"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, Star, X } from "lucide-react";
import type { Station } from "@/lib/eav/types";
import { NETWORKS } from "@/lib/eav/types";
import { highlightRanges, searchStations } from "@/lib/search";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn, mergeRanges } from "@/lib/utils";
import { LineDots } from "@/components/ui/LinePill";
import { Skeleton } from "@/components/ui/Skeleton";

export interface StationPickerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  stations: Station[];
  favoriteIds?: number[];
  selectedId?: number | null;
  onSelect: (station: Station) => void;
  /** Return a reason to show the station greyed out and non-selectable. */
  disabledReason?: (station: Station) => string | null;
  /** Optional small tag next to the name (e.g. "altra rete"). */
  tag?: (station: Station) => string | null;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

interface Item {
  key: string;
  station: Station;
  disabled: string | null;
}

const RESULT_LIMIT = 12;

function Highlighted({ name, query }: { name: string; query: string }) {
  const ranges = query ? mergeRanges(highlightRanges(name, query)) : [];
  if (!ranges.length) return <>{name}</>;
  const parts: React.ReactNode[] = [];
  let pos = 0;
  ranges.forEach(([s, e], i) => {
    if (s > pos) parts.push(name.slice(pos, s));
    parts.push(
      <mark key={i} className="rounded-sm bg-sun/45 px-px text-inherit">
        {name.slice(s, e)}
      </mark>,
    );
    pos = e;
  });
  if (pos < name.length) parts.push(name.slice(pos));
  return <>{parts}</>;
}

export function StationPicker({
  open,
  onClose,
  title,
  stations,
  favoriteIds = [],
  selectedId,
  onSelect,
  disabledReason,
  tag,
  isLoading,
  isError,
  onRetry,
}: StationPickerProps) {
  const { t, locale } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const uid = useId();
  const listId = `${uid}-list`;

  // Open/close the native modal dialog in sync with `open`.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery("");
      setActive(0);
      d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const sorted = useMemo(
    () => [...stations].sort((a, b) => a.name.localeCompare(b.name, locale)),
    [stations, locale],
  );

  const sections = useMemo(() => {
    const q = query.trim();
    const mk = (prefix: string, s: Station): Item => ({
      key: `${prefix}-${s.id}`,
      station: s,
      disabled: disabledReason?.(s) ?? null,
    });
    if (q) {
      return [{ label: null as string | null, items: searchStations(q, stations, RESULT_LIMIT).map((s) => mk("r", s)) }];
    }
    const byId = new Map(stations.map((s) => [s.id, s]));
    const favs = favoriteIds.map((id) => byId.get(id)).filter((s): s is Station => !!s);
    const out: { label: string | null; items: Item[] }[] = [];
    if (favs.length) out.push({ label: t("favoriteStations"), items: favs.map((s) => mk("f", s)) });
    out.push({ label: t("allStations"), items: sorted.map((s) => mk("a", s)) });
    return out;
  }, [query, stations, sorted, favoriteIds, disabledReason, t]);

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  // Keep the active option valid when the list changes.
  const [activeFor, setActiveFor] = useState(flat);
  if (activeFor !== flat) {
    setActiveFor(flat);
    const firstEnabled = flat.findIndex((i) => !i.disabled);
    setActive(firstEnabled < 0 ? 0 : firstEnabled);
  }

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const move = (dir: 1 | -1) => {
    if (!flat.length) return;
    let i = active;
    for (let n = 0; n < flat.length; n++) {
      i = (i + dir + flat.length) % flat.length;
      if (!flat[i].disabled) break;
    }
    setActive(i);
  };

  const choose = (item: Item | undefined) => {
    if (!item || item.disabled) return;
    onSelect(item.station);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        if (!query) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "Enter":
        e.preventDefault();
        choose(flat[active]);
        break;
    }
  };

  let index = -1;
  const activeItem = flat[active];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${uid}-title`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className={cn(
        "m-0 mt-auto h-[88dvh] max-h-none w-full max-w-none overflow-hidden rounded-t-[24px] bg-bg p-0 text-ink shadow-warm",
        "open:flex open:flex-col open:animate-sheet-in",
        "md:m-auto md:h-[min(680px,85dvh)] md:max-w-[480px] md:rounded-[24px]",
      )}
    >
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-line md:hidden" />
        <h2 id={`${uid}-title`} className="text-[22px] font-semibold tracking-[-0.02em]">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full bg-sand text-ink-soft hover:bg-sand-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{t("close")}</span>
        </button>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-[14px] border border-line bg-card px-3.5 focus-within:border-sea2 focus-within:ring-2 focus-within:ring-sea2/25">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeItem ? `${uid}-${activeItem.key}` : undefined}
            aria-label={title}
            placeholder={t("searchStationPlaceholder")}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="h-12 w-full bg-transparent text-[16px] font-medium outline-none placeholder:text-faint"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-sand"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">{t("clear")}</span>
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-6">
        {isLoading ? (
          <div className="space-y-2 px-2 pt-1" aria-busy="true" aria-label={t("stationsLoading")}>
            {Array.from({ length: 7 }, (_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div role="alert" className="px-4 py-10 text-center text-sm text-muted">
            <p>{t("stationsError")}</p>
            {onRetry && (
              <button type="button" onClick={onRetry} className="mt-3 font-semibold text-sea underline">
                {t("retry")}
              </button>
            )}
          </div>
        ) : flat.length === 0 ? (
          <p role="status" className="px-4 py-10 text-center text-sm text-muted">
            {t("noStationsFound", { q: query.trim() })}
          </p>
        ) : (
          <ul ref={listRef} id={listId} role="listbox" aria-label={title} className="pb-2">
            {sections.map((section) => (
              <li key={section.label ?? "results"} role="presentation">
                {section.label && (
                  <p role="presentation" className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                    {section.label}
                  </p>
                )}
                <ul role="group" aria-label={section.label ?? undefined}>
                  {section.items.map((item) => {
                    index += 1;
                    const i = index;
                    const isActive = i === active;
                    const s = item.station;
                    const tg = tag?.(s);
                    const isFav = favoriteIds.includes(s.id);
                    return (
                      <li
                        key={item.key}
                        id={`${uid}-${item.key}`}
                        data-index={i}
                        role="option"
                        aria-selected={isActive}
                        aria-disabled={item.disabled ? true : undefined}
                        onMouseMove={() => !item.disabled && setActive(i)}
                        onClick={() => choose(item)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5",
                          isActive && !item.disabled && "bg-card shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
                          item.disabled && "cursor-not-allowed opacity-45",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-2.5 w-2.5 shrink-0 rounded-full border-[2.5px] border-ink",
                            s.id === selectedId && "bg-ink",
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold">
                            <Highlighted name={s.name} query={query.trim()} />
                          </span>
                          <span className="mt-0.5 flex items-center gap-2 text-[11.5px] text-muted">
                            <LineDots lines={s.lines} />
                            <span>{NETWORKS[s.network] ?? ""}</span>
                            {item.disabled && <span>· {item.disabled}</span>}
                          </span>
                        </span>
                        {tg && (
                          <span className="shrink-0 rounded-full bg-sand px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
                            {tg}
                          </span>
                        )}
                        {isFav && <Star aria-hidden="true" className="h-3.5 w-3.5 shrink-0 fill-sun text-sun" />}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
