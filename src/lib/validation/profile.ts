import { z } from "zod";

export const experienceFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  company: z.string().trim().min(1, "Company is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

export const educationFormSchema = z.object({
  degree: z.string().trim().min(1, "Degree is required"),
  institution: z.string().trim().min(1, "Institution is required"),
  year: z.string().trim().min(1, "Year is required"),
});

export const profileFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  bio: z.string().trim().max(500, "Keep under 500 characters").optional(),
  skills: z.array(z.string()),
  preferredJobTypes: z.array(z.string()),
  preferredLocations: z.array(z.string()),
  preferredCategories: z.array(z.string()),
  experience: z.array(experienceFormSchema),
  education: z.array(educationFormSchema),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
