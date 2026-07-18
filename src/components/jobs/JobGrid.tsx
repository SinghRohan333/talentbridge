"use client";

import { useJobs, JobsQueryParams } from "@/hooks/useJobs";
import { JobCard } from "./JobCard";
import { JobCardSkeleton } from "./JobCardSkeleton";

export function JobGrid({ params = {} }: { params?: JobsQueryParams }) {
  const { data, isLoading, isError } = useJobs(params);

  if (isError) {
    return (
      <p className="py-16 text-center text-sm text-slate">
        Couldn&apos;t load jobs right now. Please try again shortly.
      </p>
    );
  }

  if (!isLoading && data?.jobs.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-slate">
        No jobs match right now — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
        : data?.jobs.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
}
