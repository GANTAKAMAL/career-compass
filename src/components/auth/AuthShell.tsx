import type { ReactNode } from "react";
import { GitBranch, ShieldCheck, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";

const highlights = [
  {
    icon: GitBranch,
    title: "Knowledge graph driven",
    text: "Jobs and skills modelled as connected entities, not flat lists.",
  },
  {
    icon: Sparkles,
    title: "ML recommendations",
    text: "Role suggestions explained by the skills behind each match.",
  },
  {
    icon: ShieldCheck,
    title: "Secure sessions",
    text: "Token-based authentication handled by the platform backend.",
  },
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hero-gradient relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex">
        <BrandMark className="[&_p]:text-primary-foreground" />
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold leading-tight">
            Career Domain Intelligence Platform
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Understand your career domain, close skill gaps and explore roles backed by knowledge
            graphs and machine learning.
          </p>
          <ul className="mt-10 space-y-6">
            {highlights.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
                  <item.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-sm text-primary-foreground/75">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">
          Final-year B.Tech project · Knowledge Graphs &amp; Machine Learning
        </p>
      </aside>

      <main className="surface-gradient flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <BrandMark />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
