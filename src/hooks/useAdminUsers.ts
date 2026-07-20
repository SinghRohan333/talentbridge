"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminUsersResponse } from "@/types/admin";

export interface AdminUsersParams {
  search?: string;
  role?: string;
  page?: number;
}

export function useAdminUsers(params: AdminUsersParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const { data } = await api.get<AdminUsersResponse>("/api/admin/users", {
        params: { ...params, limit: 15 },
      });
      return data;
    },
  });
}
