"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton";

export function FeaturedJobs() {
  const { data, isLoading } = useJobs({ limit: 6, sort: "newest" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Latest openings
          </h2>
          <p className="mt-2 text-slate">
            Freshly posted roles from companies hiring on TalentBridge.
          </p>
        </div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dark"
        >
          View all jobs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
          : data?.jobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </section>
  );
}
