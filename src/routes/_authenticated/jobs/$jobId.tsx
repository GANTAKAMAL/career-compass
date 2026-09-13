import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Brain, GitBranch } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { MatchPercentage } from "@/components/common/MatchPercentage";
import { SkillList } from "@/components/common/SkillList";
import { BackendPending } from "@/components/common/BackendPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/jobs/$jobId")({
  head: () => ({
    meta: [
      { title: "Job details — CareerGraph" },
      {
        name: "description",
        content: "Role description, required skills, match percentage and skill gap.",
      },
      { property: "og:title", content: "Job details — CareerGraph" },
      { property: "og:description", content: "Role requirements and your skill match." },
    ],
  }),
  component: JobDetailsPage,
});

function JobDetailsPage() {
  const { jobId } = Route.useParams();

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to="/jobs">
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>
      </Button>

      <PageHeader
        title="Job details"
        description={`Reference: ${jobId}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/knowledge-graph">
                <GitBranch className="h-4 w-4" />
                Knowledge graph
              </Link>
            </Button>
            <Button asChild>
              <Link to="/assessments">
                <Brain className="h-4 w-4" />
                Take assessment
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Description</CardTitle>
            <CardDescription>Role summary and responsibilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <BackendPending
              title="Job not loaded"
              description="Role details load here once the platform service is connected."
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Required skills
              </p>
              <div className="mt-2">
                <SkillList skills={[]} emptyLabel="Not available yet" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Your match</CardTitle>
              <CardDescription>Computed from the skills on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <MatchPercentage value={null} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Matching skills
                </p>
                <div className="mt-2">
                  <SkillList skills={[]} tone="match" emptyLabel="None yet" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Missing skills
                </p>
                <div className="mt-2">
                  <SkillList skills={[]} tone="missing" emptyLabel="None yet" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Skill gap</CardTitle>
              <CardDescription>What to learn to qualify for this role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SkillList skills={[]} tone="missing" emptyLabel="No gap analysis yet." />
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/skill-gaps">Open full gap analysis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
