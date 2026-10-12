import { LINE_COLORS, LINE_LABELS } from "@/lib/eav/lines";
import type { LineKey } from "@/lib/eav/types";
import { cn, prettifyLineName } from "@/lib/utils";

const isExpress = (category?: string) => !!category && /EXP|EXPRESS/i.test(category);

export function lineLabel(line: LineKey, rawName?: string, category?: string): string {
  if (isExpress(category)) return "Campania Express";
  if (line !== "other") return LINE_LABELS[line];
  return rawName?.trim() ? prettifyLineName(rawName) : LINE_LABELS.other;
}

export function lineColor(line: LineKey, category?: string): string {
  return isExpress(category) ? "#D9572B" : LINE_COLORS[line];
}

export function LinePill({
  line,
  rawName,
  category,
  className,
}: {
  line: LineKey;
  rawName?: string;
  category?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-[3px] text-[11px] font-bold leading-tight text-white",
        className,
      )}
      style={{ background: lineColor(line, category) }}
    >
      {lineLabel(line, rawName, category)}
    </span>
  );
}

/** Small coloured dots for the lines serving a station. */
export function LineDots({ lines, className }: { lines: LineKey[]; className?: string }) {
  if (!lines.length) return null;
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      {lines.slice(0, 4).map((l) => (
        <i
          key={l}
          className="block h-2 w-2 rounded-full"
          style={{ background: LINE_COLORS[l] }}
          title={LINE_LABELS[l]}
        />
      ))}
    </span>
  );
}
