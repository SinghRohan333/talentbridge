"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Job, PaginationMeta } from "@/types/job";

export interface ApplicationWithJob {
  _id: string;
  jobId: string;
  employerId: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted";
  createdAt: string;
  updatedAt: string;
  job: Job | null;
}

interface MyApplicationsResponse {
  applications: ApplicationWithJob[];
  pagination: PaginationMeta;
}

export function useMyApplications() {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: async () => {
      const { data } = await api.get<MyApplicationsResponse>(
        "/api/applications/mine",
        { params: { limit: 50 } },
      );
      return data;
    },
  });
}
