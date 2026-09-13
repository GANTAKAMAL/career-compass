import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { SkillList } from "@/components/common/SkillList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — CareerGraph" },
      {
        name: "description",
        content: "Manage your name, education, experience and career goal.",
      },
      { property: "og:title", content: "My Profile — CareerGraph" },
      { property: "og:description", content: "Manage your career profile details." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    education: "",
    experience: "",
    careerGoal: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditing(false);
    toast("Profile changes are stored locally", {
      description: "Saving to the platform service is added during backend integration.",
    });
  }

  return (
    <>
      <PageHeader
        title="My Profile"
        description="These details drive your job matches and gap analysis."
        actions={
          editing ? (
            <Button variant="outline" onClick={() => setEditing(false)}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          ) : (
            <Button onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4" />
              Edit profile
            </Button>
          )
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Personal details</CardTitle>
            <CardDescription>Basic information linked to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={update("fullName")}
                  disabled={!editing}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  disabled={!editing}
                  placeholder="you@college.edu"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={form.education}
                onChange={update("education")}
                disabled={!editing}
                placeholder="B.Tech Computer Science, 2026"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                value={form.experience}
                onChange={update("experience")}
                disabled={!editing}
                rows={3}
                placeholder="Internships, projects, years of experience"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="careerGoal">Career goal</Label>
              <Textarea
                id="careerGoal"
                value={form.careerGoal}
                onChange={update("careerGoal")}
                disabled={!editing}
                rows={3}
                placeholder="e.g. Backend engineer working on distributed systems"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={!editing}>
                <Save className="h-4 w-4" />
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Skills</CardTitle>
            <CardDescription>Skills currently linked to your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SkillList skills={[]} emptyLabel="No skills added yet." />
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/skills">Manage skills</Link>
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
