"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { JobsResponse } from "@/types/job";

export function useMyJobs() {
  return useQuery({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      const { data } = await api.get<JobsResponse>("/api/jobs/mine", {
        params: { limit: 50 },
      });
      return data;
    },
  });
}
