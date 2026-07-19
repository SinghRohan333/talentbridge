"use client";

import { Briefcase, Building2, Send } from "lucide-react";
import { usePublicStats } from "@/hooks/usePublicStats";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Briefcase;
  value: number;
  label: string;
}) {
  const animated = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="h-6 w-6 text-ember" />
      <span className="font-display text-3xl font-semibold text-paper sm:text-4xl">
        {animated.toLocaleString()}+
      </span>
      <span className="text-sm text-paper/70">{label}</span>
    </div>
  );
}

export function StatsBand() {
  const { data } = usePublicStats();

  return (
    <section className="bg-ink px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
        <StatCard
          icon={Briefcase}
          value={data?.activeJobs ?? 0}
          label="Active job openings"
        />
        <StatCard
          icon={Building2}
          value={data?.companies ?? 0}
          label="Companies hiring"
        />
        <StatCard
          icon={Send}
          value={data?.totalApplications ?? 0}
          label="Applications submitted"
        />
      </div>
    </section>
  );
}
