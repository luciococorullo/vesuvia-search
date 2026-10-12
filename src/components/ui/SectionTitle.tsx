import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  action,
  className,
  id,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mx-5 mb-2.5 mt-6 flex items-baseline justify-between", className)}>
      <h2 id={id} className="text-[19px] font-semibold tracking-[-0.01em]">
        {children}
      </h2>
      {action}
    </div>
  );
}
