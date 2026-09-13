import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  GraduationCap,
  ListChecks,
  Target,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { BackendPending } from "@/components/common/BackendPending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CareerGraph" },
      {
        name: "description",
        content: "Your career domain overview: skills, recommendations, gaps and assessments.",
      },
      { property: "og:title", content: "Dashboard — CareerGraph" },
      { property: "og:description", content: "Career domain overview at a glance." },
    ],
  }),
  component: DashboardPage,
});

const profileFields = [
  { label: "Career goal", icon: Target },
  { label: "Education", icon: GraduationCap },
  { label: "Experience", icon: BriefcaseBusiness },
];

function DashboardPage() {
  const { user } = useAuth();
  const firstName = (user?.fullName ?? "there").split(" ")[0];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="A single view of your career domain, skills and readiness."
        actions={
          <Button asChild variant="outline">
            <Link to="/profile">Complete profile</Link>
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Skills tracked" value={null} hint="From your profile" icon={ListChecks} />
        <StatCard label="Job matches" value={null} hint="Ranked by model" icon={TrendingUp} />
        <StatCard label="Skill gaps" value={null} hint="Against target role" icon={Target} />
        <StatCard label="Assessments taken" value={null} hint="Scored attempts" icon={Brain} />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Profile summary</CardTitle>
            <CardDescription>Details used to compute your matches.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p>
              <p className="truncate text-sm font-medium text-foreground">
                {user?.fullName ?? "—"}
              </p>
            </div>
            <Separator />
            {profileFields.map((field) => (
              <div key={field.label} className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <field.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {field.label}
                  </p>
                  <p className="text-sm text-muted-foreground">Not set yet</p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/profile">
                Edit profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recommended jobs</CardTitle>
            <CardDescription>Roles ranked by skill match percentage.</CardDescription>
          </CardHeader>
          <CardContent>
            <BackendPending
              title="No recommendations yet"
              description="Recommendations appear here once your skills are saved and the recommendation service responds."
            />
            <div className="mt-4 flex justify-end">
              <Button asChild variant="ghost" size="sm">
                <Link to="/recommendations">
                  Open recommendations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Skills summary</CardTitle>
            <CardDescription>Skills on your profile, grouped by domain.</CardDescription>
          </CardHeader>
          <CardContent>
            <BackendPending
              title="No skills added"
              description="Add the skills you already have so the platform can compute matches and gaps."
            />
            <div className="mt-4 flex justify-end">
              <Button asChild variant="ghost" size="sm">
                <Link to="/skills">
                  Manage skills
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Skill gap summary</CardTitle>
            <CardDescription>Missing skills for your target role.</CardDescription>
          </CardHeader>
          <CardContent>
            <BackendPending
              title="No gap analysis yet"
              description="Pick a target job to see the skills you still need to learn."
            />
            <div className="mt-4 flex justify-end">
              <Button asChild variant="ghost" size="sm">
                <Link to="/skill-gaps">
                  Open skill gaps
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Assessment performance</CardTitle>
          <CardDescription>Scores across your completed assessments.</CardDescription>
        </CardHeader>
        <CardContent>
          <BackendPending
            title="No assessment data"
            description="Take an assessment to start tracking your performance over time."
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/assessment-results">View history</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/assessments">Start assessment</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
