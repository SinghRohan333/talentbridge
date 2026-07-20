"use client";

import { Users, Briefcase, CheckCircle2, Flag } from "lucide-react";
import { useAdminStats } from "@/hooks/useAdminStats";
import { StatCard } from "@/components/dashboard/StatCard";
import { AdminCharts } from "./AdminCharts";

export function AdminDashboardContent() {
  const { data, isPending } = useAdminStats();

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-line" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-line" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Users} label="Total users" value={data.totalUsers} />
        <StatCard icon={Briefcase} label="Total jobs" value={data.totalJobs} />
        <StatCard
          icon={CheckCircle2}
          label="Active jobs"
          value={data.activeJobs}
        />
        <StatCard icon={Flag} label="Flagged jobs" value={data.flaggedJobs} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white/60 p-5">
          <p className="text-xs text-slate">Job seekers</p>
          <p className="font-display text-2xl font-semibold text-ink">
            {data.totalSeekers}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white/60 p-5">
          <p className="text-xs text-slate">Employers</p>
          <p className="font-display text-2xl font-semibold text-ink">
            {data.totalEmployers}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-white/60 p-5">
          <p className="text-xs text-slate">Applications submitted</p>
          <p className="font-display text-2xl font-semibold text-ink">
            {data.totalApplications}
          </p>
        </div>
      </div>

      <AdminCharts data={data} />
    </div>
  );
}
