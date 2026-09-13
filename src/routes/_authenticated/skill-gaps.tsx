import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { MatchPercentage } from "@/components/common/MatchPercentage";
import { SkillList } from "@/components/common/SkillList";
import { BackendPending } from "@/components/common/BackendPending";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/skill-gaps")({
  head: () => ({
    meta: [
      { title: "Skill Gaps — CareerGraph" },
      {
        name: "description",
        content: "Compare your skills against a target role and see what to learn next.",
      },
      { property: "og:title", content: "Skill Gaps — CareerGraph" },
      { property: "og:description", content: "Gap analysis against your target role." },
    ],
  }),
  component: SkillGapPage,
});

function SkillGapPage() {
  return (
    <>
      <PageHeader
        title="Skill Gaps"
        description="See how your current skills compare to the requirements of a target role."
        actions={
          <Select>
            <SelectTrigger className="w-full sm:w-64" aria-label="Select target job">
              <SelectValue placeholder="Select a target job" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No jobs available yet
              </div>
            </SelectContent>
          </Select>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Target job</CardTitle>
            <CardDescription>The role you're comparing against.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">No target role selected.</p>
            <MatchPercentage value={null} label="Overall match" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Matching skills</CardTitle>
            <CardDescription>Requirements you already meet.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillList skills={[]} tone="match" emptyLabel="Nothing to show yet." />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Missing skills</CardTitle>
            <CardDescription>Requirements not yet on your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillList skills={[]} tone="missing" emptyLabel="Nothing to show yet." />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Skills to learn</CardTitle>
          <CardDescription>Prioritised learning path towards the target role.</CardDescription>
        </CardHeader>
        <CardContent>
          <BackendPending
            title="No gap analysis yet"
            description="Select a target role once the job catalogue is connected to generate the analysis."
          />
        </CardContent>
      </Card>
    </>
  );
}
