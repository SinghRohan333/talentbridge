"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { Job } from "@/types/job";

interface JobDetailsResponse {
  job: Job;
  similar: Job[];
  isSaved: boolean;
  hasApplied: boolean;
}

export function useJobDetails(jobId: string) {
  const { isLoading: isAuthLoading } = useAuth();

  return useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const { data } = await api.get<JobDetailsResponse>(`/api/jobs/${jobId}`);
      return data;
    },
    enabled: !!jobId && !isAuthLoading,
  });
}
