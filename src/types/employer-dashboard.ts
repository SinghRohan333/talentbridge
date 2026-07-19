export interface StatusCount {
  status: string;
  count: number;
}

export interface TimeSeriesPoint {
  date: string;
  count: number;
}

export interface RecentApplicationSummary {
  _id: string;
  status: string;
  createdAt: string;
  job: { _id: string; title: string } | null;
  seekerName: string;
}

export interface EmployerDashboardData {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  statusBreakdown: StatusCount[];
  jobsOverTime: TimeSeriesPoint[];
  applicationsOverTime: TimeSeriesPoint[];
  recentApplications: RecentApplicationSummary[];
}
