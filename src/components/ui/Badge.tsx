import { cn } from "@/lib/utils";

type Tone = "ok" | "late" | "neutral";

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[11px] font-bold leading-tight tnum",
        tone === "ok" && "bg-okbg text-ok",
        tone === "late" && "bg-latebg text-late",
        tone === "neutral" && "bg-sand text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PlatformBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-md border-[1.5px] border-ink px-1.5 py-px text-[11px] font-bold leading-tight tnum">
      {children}
    </span>
  );
}
