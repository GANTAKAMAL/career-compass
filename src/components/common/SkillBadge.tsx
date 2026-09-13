import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SkillTone = "neutral" | "match" | "missing";

const toneStyles: Record<SkillTone, string> = {
  neutral: "border-border bg-secondary text-secondary-foreground",
  match: "border-success/30 bg-success/10 text-success",
  missing: "border-warning/40 bg-warning/10 text-warning-foreground",
};

interface SkillBadgeProps {
  label: string;
  tone?: SkillTone;
  onRemove?: () => void;
  className?: string;
}

export function SkillBadge({ label, tone = "neutral", onRemove, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneStyles[tone],
        className,
      )}
    >
      <span className="max-w-[14rem] truncate">{label}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="-mr-1 grid h-4 w-4 shrink-0 place-items-center rounded-full transition-colors hover:bg-foreground/10"
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </span>
  );
}
