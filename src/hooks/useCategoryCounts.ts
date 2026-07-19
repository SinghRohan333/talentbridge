"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface CategoryCount {
  _id: string;
  count: number;
}

export function useCategoryCounts() {
  return useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
      const { data } = await api.get<CategoryCount[]>(
        "/api/jobs/meta/categories",
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
