"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Job, PaginationMeta } from "@/types/job";
import { JobApplicant } from "@/types/application";

interface JobApplicantsResponse {
  job: Job;
  applications: JobApplicant[];
  pagination: PaginationMeta;
}

export function useJobApplicants(jobId: string) {
  return useQuery({
    queryKey: ["job-applicants", jobId],
    queryFn: async () => {
      const { data } = await api.get<JobApplicantsResponse>(
        `/api/applications/job/${jobId}`,
        { params: { limit: 50 } },
      );
      return data;
    },
    enabled: !!jobId,
  });
}
