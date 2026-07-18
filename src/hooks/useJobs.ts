"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { JobsResponse } from "@/types/job";

export interface JobsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  type?: string;
  locationType?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  sort?: string;
}

export function useJobs(params: JobsQueryParams = {}) {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: async () => {
      const { data } = await api.get<JobsResponse>("/api/jobs", { params });
      return data;
    },
  });
}
