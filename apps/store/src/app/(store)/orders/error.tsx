"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@modernstores/ui";

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="text-base font-semibold mb-1.5">Something went wrong</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {error.message || "We couldn't load your orders. Please try again."}
      </p>
      <Button variant="outline" onClick={reset} className="rounded-xl">
        Try again
      </Button>
    </div>
  );
}
