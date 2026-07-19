"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PublicStats } from "@/types/stats";

export function usePublicStats() {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: async () => {
      const { data } = await api.get<PublicStats>("/api/stats/public");
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
