import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, UserPlus } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Create account — CareerGraph" },
      {
        name: "description",
        content: "Register for CareerGraph to track skills, job matches and skill gaps.",
      },
      { property: "og:title", content: "Create account — CareerGraph" },
      {
        property: "og:description",
        content: "Register for the career domain intelligence platform.",
      },
    ],
  }),
  component: RegisterPage,
});

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterPage() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required";
    if (!values.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email";
    if (!values.password) next.password = "Password is required";
    else if (values.password.length < 8) next.password = "Use at least 8 characters";
    if (!values.confirmPassword) next.confirmPassword = "Confirm your password";
    else if (values.confirmPassword !== values.password)
      next.confirmPassword = "Passwords do not match";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setFormError(null);
      return;
    }
    setFormError(
      "Registration is not connected yet. This form will submit to the platform account service once the backend is wired up.",
    );
  }

  return (
    <AuthShell title="Create your account" subtitle="Set up your career intelligence workspace.">
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
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Ananya Sharma"
            value={values.fullName}
            onChange={update("fullName")}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={values.password}
              onChange={update("password")}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={update("confirmPassword")}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            ) : null}
          </div>
        </div>

        <Button type="submit" className="w-full">
          <UserPlus className="h-4 w-4" />
          Create account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
