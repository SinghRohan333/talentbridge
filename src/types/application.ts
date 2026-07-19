export interface ApplicantSeeker {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  resumeUrl: string | null;
  avatar: string | null;
}

export interface JobApplicant {
  _id: string;
  jobId: string;
  employerId: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted";
  createdAt: string;
  updatedAt: string;
  seeker: ApplicantSeeker | null;
}
