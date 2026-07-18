"use client";

import { useSearchParams } from "next/navigation";
import { ExploreFilters } from "./ExploreFilters";
import { JobGrid } from "./JobGrid";
import { Pagination } from "./Pagination";
import { useJobs } from "@/hooks/useJobs";
import { parseJobsQueryParams } from "@/lib/jobQueryParams";

export function JobsExplorer() {
  const searchParams = useSearchParams();
  const params = parseJobsQueryParams(searchParams);
  const { data, isLoading, isError } = useJobs(params);

  return (
    <>
      <ExploreFilters />
      <JobGrid jobs={data?.jobs} isLoading={isLoading} isError={isError} />
      {data && data.pagination.totalPages > 1 && (
        <Pagination pagination={data.pagination} />
      )}
    </>
  );
}
