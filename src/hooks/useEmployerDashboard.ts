"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { EmployerDashboardData } from "@/types/employer-dashboard";

export function useEmployerDashboard() {
  return useQuery({
    queryKey: ["employer-dashboard"],
    queryFn: async () => {
      const { data } = await api.get<EmployerDashboardData>(
        "/api/stats/employer/dashboard",
      );
      return data;
    },
  });
}
