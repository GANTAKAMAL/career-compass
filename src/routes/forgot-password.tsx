import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Send } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password — CareerGraph" },
      {
        name: "description",
        content: "Request a password reset link for your CareerGraph account.",
      },
      { property: "og:title", content: "Reset password — CareerGraph" },
      { property: "og:description", content: "Request a CareerGraph password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      setNotice(null);
      return;
    }
    setError(null);
    setNotice(
      "Password reset is not connected yet. This form will call the platform account service once the backend is wired up.",
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send reset instructions to your registered email."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {notice ? (
          <div
            role="status"
            className="flex gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-foreground"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <span>{notice}</span>
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(error)}
          />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>

        <Button type="submit" className="w-full">
          <Send className="h-4 w-4" />
          Send reset link
        </Button>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </form>
    </AuthShell>
  );
}
