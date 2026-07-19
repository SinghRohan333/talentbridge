"use client";

import { useSearchParams } from "next/navigation";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { JobGrid } from "./JobGrid";
import { Pagination } from "./Pagination";

export function SavedJobsExplorer() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError } = useSavedJobs(page);

  return (
    <>
      <JobGrid
        jobs={data?.jobs}
        isLoading={isLoading}
        isError={isError}
        emptyMessage="You haven't saved any jobs yet — browse jobs and tap the bookmark icon to save one."
      />
      {data && data.pagination.totalPages > 1 && (
        <Pagination pagination={data.pagination} />
      )}
    </>
  );
}
