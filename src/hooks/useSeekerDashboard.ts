"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Job } from "@/types/job";

interface RecentApplication {
  _id: string;
  jobId: string;
  status: string;
  createdAt: string;
  job: Job | null;
}

interface SeekerDashboardData {
  savedJobsCount: number;
  applicationsCount: number;
  recentApplications: RecentApplication[];
  recentlyViewedJobs: Job[];
}

export function useSeekerDashboard() {
  return useQuery({
    queryKey: ["seeker-dashboard"],
    queryFn: async () => {
      const { data } = await api.get<SeekerDashboardData>(
        "/api/users/dashboard/seeker",
      );
      return data;
    },
  });
}
