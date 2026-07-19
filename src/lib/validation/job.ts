import { z } from "zod";

const jobTypeEnum = z.enum([
  "full-time",
  "part-time",
  "contract",
  "internship",
]);
const locationTypeEnum = z.enum(["on-site", "remote", "hybrid"]);
const experienceLevelEnum = z.enum(["entry", "mid", "senior", "lead"]);
const statusEnum = z.enum(["active", "closed", "draft"]);

export const jobFormSchema = z
  .object({
    title: z.string().trim().min(5, "Title must be at least 5 characters"),
    shortDescription: z
      .string()
      .trim()
      .min(10, "At least 10 characters")
      .max(200, "Keep under 200 characters"),
    description: z
      .string()
      .trim()
      .min(50, "Description must be at least 50 characters"),
    category: z.string().trim().min(2, "Category is required"),
    type: jobTypeEnum,
    locationType: locationTypeEnum,
    location: z.string().trim().min(2, "Location is required"),
    salaryMin: z.string().trim().optional(),
    salaryMax: z.string().trim().optional(),
    skills: z.array(z.string()).min(1, "Add at least one skill"),
    requirementsText: z.string().trim().min(1, "Add at least one requirement"),
    benefitsText: z.string().trim().optional(),
    experienceLevel: experienceLevelEnum,
    applicationDeadline: z.string().trim().optional(),
    companyLogoUrl: z.string().trim().optional(),
    status: statusEnum.optional(),
  })
  .refine(
    (data) =>
      !data.salaryMin ||
      !data.salaryMax ||
      Number(data.salaryMax) >= Number(data.salaryMin),
    {
      message: "Maximum salary must be greater than or equal to minimum salary",
      path: ["salaryMax"],
    },
  )
  .refine(
    (data) =>
      !data.companyLogoUrl || /^https?:\/\/.+/.test(data.companyLogoUrl),
    {
      message: "Enter a valid URL starting with http:// or https://",
      path: ["companyLogoUrl"],
    },
  );

export type JobFormValues = z.infer<typeof jobFormSchema>;
