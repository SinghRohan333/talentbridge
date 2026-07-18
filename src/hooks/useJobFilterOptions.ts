"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface FilterOptions {
  categories: string[];
  locations: string[];
}

export function useJobFilterOptions() {
  return useQuery({
    queryKey: ["job-filter-options"],
    queryFn: async () => {
      const { data } = await api.get<FilterOptions>("/api/jobs/meta/filters");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
