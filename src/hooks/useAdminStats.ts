"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminStats } from "@/types/admin";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await api.get<AdminStats>("/api/admin/stats");
      return data;
    },
  });
}
