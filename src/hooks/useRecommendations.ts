"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { RecommendationsResponse } from "@/types/recommendation";

export function useRecommendations() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const { data } = await api.get<RecommendationsResponse>(
        "/api/recommendations",
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRefreshRecommendations() {
  const queryClient = useQueryClient();
  return async () => {
    const { data } = await api.get<RecommendationsResponse>(
      "/api/recommendations",
      { params: { refresh: "true" } },
    );
    queryClient.setQueryData(["recommendations"], data);
    return data;
  };
}
