"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useMyApplications } from "@/hooks/useMyApplications";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

export function ApplicationsList() {
  const { data, isPending, isError } = useMyApplications();

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-line" />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="py-16 text-center text-sm text-slate">
        Couldn&apos;t load your applications right now.
      </p>
    );

  if (data.applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-16 text-center">
        <p className="text-slate">You haven&apos;t applied to any jobs yet.</p>
        <Link
          href="/jobs"
          className="mt-4 inline-block text-sm font-medium text-signal hover:text-signal-dark"
        >
          Browse jobs to get started
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white/60">
      {data.applications.map((app) => (
        <div
          key={app._id}
          className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <Link
              href={app.job ? `/jobs/${app.job._id}` : "#"}
              className="truncate font-medium text-ink hover:text-signal"
            >
              {app.job?.title ?? "Job no longer available"}
            </Link>
            <p className="mt-0.5 truncate text-xs text-slate">
              {app.job?.company.name}
            </p>
            <p className="mt-0.5 text-xs text-slate">
              Applied {formatDistanceToNow(new Date(app.createdAt))} ago
            </p>
          </div>
          <ApplicationStatusBadge status={app.status} />
        </div>
      ))}
    </div>
  );
}
