"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { FullUser } from "@/types/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get<{ user: FullUser }>("/api/auth/me");
      return data.user;
    },
  });
}
