import { Network } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <span className="hero-gradient grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-card">
        <Network className="h-5 w-5" />
      </span>
      {!compact ? (
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-foreground">CareerGraph</p>
          <p className="truncate text-xs text-muted-foreground">Domain Intelligence</p>
        </div>
      ) : null}
    </div>
  );
}
