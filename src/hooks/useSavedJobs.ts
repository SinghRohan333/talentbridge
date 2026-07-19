"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { JobsResponse } from "@/types/job";

export function useSavedJobs(page = 1) {
  return useQuery({
    queryKey: ["saved-jobs", page],
    queryFn: async () => {
      const { data } = await api.get<JobsResponse>("/api/saved-jobs", {
        params: { page, limit: 12 },
      });
      return data;
    },
  });
}
