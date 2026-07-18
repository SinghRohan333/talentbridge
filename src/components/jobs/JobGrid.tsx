import { Job } from "@/types/job";
import { JobCard } from "./JobCard";
import { JobCardSkeleton } from "./JobCardSkeleton";

interface JobGridProps {
  jobs: Job[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function JobGrid({ jobs, isLoading, isError }: JobGridProps) {
  if (isError) {
    return (
      <p className="py-16 text-center text-sm text-slate">
        Couldn&apos;t load jobs right now. Please try again shortly.
      </p>
    );
  }

  if (!isLoading && jobs?.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-slate">
        No jobs match your filters — try adjusting or clearing them.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
        : jobs?.map((job) => <JobCard key={job._id} job={job} />)}
    </div>
  );
}
