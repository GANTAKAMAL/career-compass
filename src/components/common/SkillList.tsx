import { SkillBadge, type SkillTone } from "./SkillBadge";

interface SkillListProps {
  skills: string[];
  tone?: SkillTone;
  emptyLabel?: string;
  onRemove?: (skill: string) => void;
}

export function SkillList({
  skills,
  tone = "neutral",
  emptyLabel = "No skills yet",
  onRemove,
}: SkillListProps) {
  if (skills.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillBadge
          key={skill}
          label={skill}
          tone={tone}
          onRemove={onRemove ? () => onRemove(skill) : undefined}
        />
      ))}
    </div>
  );
}
