export function JobCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-11 w-11 animate-pulse rounded-lg bg-line" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 animate-pulse rounded bg-line" />
          <div className="h-2.5 w-1/2 animate-pulse rounded bg-line" />
        </div>
      </div>
      <div className="mb-2 h-4 w-4/5 animate-pulse rounded bg-line" />
      <div className="mb-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-line" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-line" />
      </div>
      <div className="mb-4 flex gap-2">
        <div className="h-6 w-20 animate-pulse rounded-full bg-line" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-line" />
      </div>
      <div className="flex items-center justify-between border-t border-line pt-4">
        <div className="h-4 w-24 animate-pulse rounded bg-line" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-line" />
      </div>
    </div>
  );
}
