import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { MatchPercentage } from "@/components/common/MatchPercentage";
import { SkillList } from "@/components/common/SkillList";
import { BackendPending } from "@/components/common/BackendPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Recommendation } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/recommendations")({
  head: () => ({
    meta: [
      { title: "Recommendations — CareerGraph" },
      {
        name: "description",
        content: "Job recommendations ranked by skill match, with matching and missing skills.",
      },
      { property: "og:title", content: "Recommendations — CareerGraph" },
      { property: "og:description", content: "Roles recommended for your skill profile." },
    ],
  }),
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const recommendations: Recommendation[] = [];

  return (
    <>
      <PageHeader
        title="Recommendations"
        description="Roles ranked for your profile, with the reasoning behind each match."
      />

      {recommendations.length === 0 ? (
        <BackendPending
          title="No recommendations yet"
          description="Once your skills are saved and the recommendation service responds, ranked roles appear here."
        />
      ) : (
        <div className="grid gap-4">
          {recommendations.map((item) => (
            <Card key={item.jobId} className="shadow-card">
              <CardContent className="p-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-foreground">
                      {item.jobTitle}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.explanation}</p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Matching skills
                        </p>
                        <div className="mt-2">
                          <SkillList skills={item.matchingSkills} tone="match" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Missing skills
                        </p>
                        <div className="mt-2">
                          <SkillList skills={item.missingSkills} tone="missing" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4 rounded-xl bg-muted/40 p-4">
                    <MatchPercentage value={item.matchPercentage} />
                    <Button asChild size="sm" className="w-full">
                      <Link to="/jobs/$jobId" params={{ jobId: item.jobId }}>
                        View job
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
