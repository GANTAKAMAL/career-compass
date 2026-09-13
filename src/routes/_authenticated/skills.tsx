import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListChecks, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/states";
import { SkillBadge } from "@/components/common/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/skills")({
  head: () => ({
    meta: [
      { title: "My Skills — CareerGraph" },
      { name: "description", content: "Add, search and remove the skills on your profile." },
      { property: "og:title", content: "My Skills — CareerGraph" },
      { property: "og:description", content: "Manage the skills used for job matching." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => skills.filter((skill) => skill.toLowerCase().includes(query.trim().toLowerCase())),
    [skills, query],
  );

  function addSkill(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    if (skills.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
      toast("Skill already added");
      return;
    }
    setSkills((prev) => [...prev, value]);
    setDraft("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((item) => item !== skill));
  }

  return (
    <>
      <PageHeader
        title="My Skills"
        description="Skills you add here are used for matching, gap analysis and recommendations."
      />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Add a skill</CardTitle>
          <CardDescription>Enter one skill at a time, e.g. “Spring Boot”.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addSkill} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="space-y-2">
              <Label htmlFor="skill" className="sr-only">
                Skill name
              </Label>
              <Input
                id="skill"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Skill name"
              />
            </div>
            <Button type="submit" className="sm:self-start">
              <Plus className="h-4 w-4" />
              Add skill
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <CardTitle className="text-base">Current skills</CardTitle>
            <CardDescription>
              {skills.length} skill{skills.length === 1 ? "" : "s"} on your profile
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills"
              className="pl-9"
              aria-label="Search skills"
            />
          </div>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <EmptyState
              icon={ListChecks}
              title="No skills yet"
              description="Add your first skill above to unlock matches, gaps and recommendations."
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No matching skills"
              description={`Nothing matches “${query}”.`}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {filtered.map((skill) => (
                <SkillBadge key={skill} label={skill} onRemove={() => removeSkill(skill)} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
