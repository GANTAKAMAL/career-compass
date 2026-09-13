import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MatchPercentageProps {
  value: number | null | undefined;
  label?: string;
  className?: string;
}

export function MatchPercentage({ value, label = "Skill match", className }: MatchPercentageProps) {
  const hasValue = typeof value === "number" && Number.isFinite(value);
  const clamped = hasValue ? Math.max(0, Math.min(100, value)) : 0;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate text-muted-foreground">{label}</span>
        <span className="shrink-0 font-semibold text-foreground">
          {hasValue ? `${Math.round(clamped)}%` : "—"}
        </span>
      </div>
      <Progress value={clamped} className="mt-2 h-2" />
    </div>
  );
}
