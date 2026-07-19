"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { useEmployerDashboard } from "@/hooks/useEmployerDashboard";
import { StatCard } from "./StatCard";
import { EmployerCharts } from "./EmployerCharts";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";

export function EmployerDashboardContent() {
  const { data, isPending } = useEmployerDashboard();

  if (isPending || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-line" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Briefcase}
          label="Total jobs posted"
          value={data.totalJobs}
        />
        <StatCard
          icon={CheckCircle2}
          label="Active postings"
          value={data.activeJobs}
        />
        <StatCard
          icon={Users}
          label="Total applicants"
          value={data.totalApplicants}
        />
      </div>

      <EmployerCharts data={data} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Recent applicants
          </h2>
          <Link
            href="/jobs/manage"
            className="inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-dark"
          >
            Manage jobs <ArrowRight className="h-3.5 w-3.5" />
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
                  <p className="truncate font-medium text-ink">
                    {app.seekerName}
                  </p>
                  <p className="truncate text-xs text-slate">
                    Applied to {app.job?.title ?? "a job"} ·{" "}
                    {formatDistanceToNow(new Date(app.createdAt))} ago
                  </p>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-10 text-center">
            <p className="text-slate">No applicants yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
