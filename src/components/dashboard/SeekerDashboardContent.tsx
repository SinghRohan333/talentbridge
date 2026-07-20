"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, Send, ArrowRight } from "lucide-react";
import { useSeekerDashboard } from "@/hooks/useSeekerDashboard";
import { StatCard } from "./StatCard";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { JobCard } from "@/components/jobs/JobCard";
import { RecommendationsPreview } from "./RecommendationsPreview";

export function SeekerDashboardContent() {
  const { data, isPending } = useSeekerDashboard();

  if (isPending || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="h-24 animate-pulse rounded-2xl bg-line" />
          <div className="h-24 animate-pulse rounded-2xl bg-line" />
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          icon={Bookmark}
          label="Saved jobs"
          value={data.savedJobsCount}
        />
        <StatCard
          icon={Send}
          label="Applications submitted"
          value={data.applicationsCount}
        />
      </div>

      <RecommendationsPreview />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Recent applications
          </h2>
          <Link
            href="/applications"
            className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-dark"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {data.recentApplications.length > 0 ? (
          <div className="divide-y divide-line rounded-2xl border border-line bg-white/60">
            {data.recentApplications.map((app) => (
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
                  <p className="text-xs text-slate">
                    {app.job?.company.name} · Applied{" "}
                    {formatDistanceToNow(new Date(app.createdAt))} ago
                  </p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-10 text-center">
            <p className="text-slate">No applications yet.</p>
            <Link
              href="/jobs"
              className="mt-3 inline-block text-sm font-medium text-signal hover:text-signal-dark"
            >
              Browse jobs to get started
            </Link>
          </div>
        )}
      </section>

      {data.recentlyViewedJobs.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">
            Recently viewed
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.recentlyViewedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
