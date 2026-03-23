import { Skeleton } from "@modernstores/ui";

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      {/* Search */}
      <Skeleton className="h-11 w-full rounded-xl" />

      {/* Tabs */}
      <Skeleton className="h-10 w-full max-w-xl rounded-xl" />

      {/* Order cards */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 dark:border-border bg-card/70 dark:bg-card/70 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-dashed border-border/50">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-lg" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="px-5 py-4 space-y-3">
              <Skeleton className="h-4 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-3/4" />
              </div>
            </div>
            <div className="px-5 py-2.5 bg-muted/30 border-t border-border/30">
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
