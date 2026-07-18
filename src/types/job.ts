export type JobType = "full-time" | "part-time" | "contract" | "internship";
export type LocationType = "on-site" | "remote" | "hybrid";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";
export type JobStatus = "active" | "closed" | "draft" | "flagged";

export interface Job {
  _id: string;
  employerId: string;
  title: string;
  description: string;
  shortDescription: string;
  company: { name: string; logo: string | null };
  category: string;
  type: JobType;
  locationType: LocationType;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  skills: string[];
  requirements: string[];
  benefits: string[];
  experienceLevel: ExperienceLevel;
  applicationDeadline: string | null;
  status: JobStatus;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: PaginationMeta;
}
