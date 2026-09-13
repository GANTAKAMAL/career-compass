import { PlugZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./states";

/**
 * Shown wherever a section is waiting on data from the platform service.
 * Replaced by real query results during the integration phase.
 */
export function BackendPending({
  title = "No data yet",
  description = "This section fills in once the platform service is connected.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      icon={PlugZap}
      title={title}
      description={description}
      className={className}
      action={
        onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
    />
  );
}
