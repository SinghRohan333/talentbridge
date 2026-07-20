"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminJobsResponse } from "@/types/admin";

export interface AdminJobsParams {
  search?: string;
  status?: string;
  page?: number;
}

export function useAdminJobs(params: AdminJobsParams) {
  return useQuery({
    queryKey: ["admin-jobs", params],
    queryFn: async () => {
      const { data } = await api.get<AdminJobsResponse>("/api/admin/jobs", {
        params: { ...params, limit: 15 },
      });
      return data;
    },
  });
}
