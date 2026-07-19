"use client";

import { usePublicStats } from "@/hooks/usePublicStats";
import { useCountUp } from "@/hooks/useCountUp";

function Stat({ value, label }: { value: number; label: string }) {
  const animated = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-display text-3xl font-semibold text-ink">
        {animated.toLocaleString()}+
      </span>
      <span className="text-sm text-slate">{label}</span>
    </div>
  );
}

export function AboutStats() {
  const { data } = usePublicStats();

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-line bg-white/60 p-8 sm:grid-cols-3">
      <Stat value={data?.activeJobs ?? 0} label="Active job openings" />
      <Stat value={data?.companies ?? 0} label="Companies hiring" />
      <Stat
        value={data?.totalApplications ?? 0}
        label="Applications submitted"
      />
    </div>
  );
}
