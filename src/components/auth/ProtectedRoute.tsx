import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LoadingState } from "@/components/common/states";
import { useAuth } from "@/lib/auth/auth-context";

/**
 * Client-side session gate. Once the backend issues real tokens this keeps
 * working unchanged — it only reads the auth context.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isRestoring } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRestoring && !isAuthenticated) {
      navigate({ to: "/", replace: true });
    }
  }, [isRestoring, isAuthenticated, navigate]);

  if (isRestoring || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <LoadingState label="Checking your session…" className="w-full max-w-sm" />
      </div>
    );
  }

  return <>{children}</>;
}
