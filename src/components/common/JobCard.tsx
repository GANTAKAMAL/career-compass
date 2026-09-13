import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MatchPercentage } from "./MatchPercentage";
import { SkillList } from "./SkillList";
import type { Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="shadow-card transition-shadow hover:shadow-elevated">
      <CardContent className="p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Briefcase className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-foreground">{job.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Required skills
          </p>
          <div className="mt-2">
            <SkillList skills={job.requiredSkills} emptyLabel="Not provided" />
          </div>
        </div>

        {typeof job.matchPercentage === "number" ? (
          <MatchPercentage className="mt-4" value={job.matchPercentage} />
        ) : null}

        <div className="mt-5 flex justify-end">
          <Button asChild size="sm">
            <Link to="/jobs/$jobId" params={{ jobId: job.id }}>
              View details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
