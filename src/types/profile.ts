import { UserRole } from "./auth";

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Company {
  name: string;
  logo: string | null;
  website: string | null;
  description: string | null;
  size: string | null;
  industry: string | null;
}

export interface FullUser {
  _id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  skills: string[];
  experience: Experience[];
  education: Education[];
  resumeUrl: string | null;
  resumeSummary: string | null;
  preferredJobTypes: string[];
  preferredLocations: string[];
  preferredCategories: string[];
  company: Company | null;
  createdAt: string;
  updatedAt: string;
}
