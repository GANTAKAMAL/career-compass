import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, LogIn } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — CareerGraph Career Intelligence" },
      {
        name: "description",
        content:
          "Sign in to CareerGraph to explore your career domain, skills, job matches and assessments.",
      },
      { property: "og:title", content: "Sign in — CareerGraph Career Intelligence" },
      {
        property: "og:description",
        content: "Access your career domain intelligence workspace.",
      },
    ],
  }),
  component: LoginPage,
});

interface FieldErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isRestoring } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isRestoring && isAuthenticated) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isRestoring, isAuthenticated, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email";
    if (!password) nextErrors.password = "Password is required";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError(null);
      return;
    }

    setFormError(
      "Sign-in is not connected yet. This screen will call the platform authentication service once the backend is wired up.",
    );
  }

  return (
    <AuthShell title="Sign in" subtitle="Use your platform account to continue.">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError ? (
          <div
            role="alert"
            className="flex gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-foreground"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <span>{formError}</span>
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
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password ? <p className="text-xs text-destructive">{errors.password}</p> : null}
        </div>

        <Button type="submit" className="w-full">
          <LogIn className="h-4 w-4" />
          Sign in
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
