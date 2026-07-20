import { Job, PaginationMeta } from "./job";

export interface AdminStats {
  totalUsers: number;
  totalSeekers: number;
  totalEmployers: number;
  totalAdmins: number;
  totalJobs: number;
  activeJobs: number;
  flaggedJobs: number;
  totalApplications: number;
  userGrowth: { date: string; count: number }[];
  jobsOverTime: { date: string; count: number }[];
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "seeker" | "employer" | "admin";
  isActive: boolean;
  createdAt: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  pagination: PaginationMeta;
}

export interface AdminJobsResponse {
  jobs: Job[];
  pagination: PaginationMeta;
}
