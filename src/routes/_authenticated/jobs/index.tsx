import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { JobCard } from "@/components/common/JobCard";
import { BackendPending } from "@/components/common/BackendPending";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Job } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/jobs/")({
  head: () => ({
    meta: [
      { title: "Jobs — CareerGraph" },
      { name: "description", content: "Browse job roles and the skills each one requires." },
      { property: "og:title", content: "Jobs — CareerGraph" },
      { property: "og:description", content: "Browse roles and required skills." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [query, setQuery] = useState("");
  const jobs: Job[] = [];

  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Jobs"
        description="Explore roles in your career domain and the skills they require."
      />

      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job titles"
              className="pl-9"
              aria-label="Search jobs"
            />
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <BackendPending
          title="No jobs to show"
          description="The job catalogue loads here once the platform service is connected."
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
