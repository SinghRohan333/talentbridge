import { z } from "zod";

export const companyFormSchema = z.object({
  name: z.string().trim().min(1, "Company name is required"),
  logo: z.string().trim().optional(),
  website: z.string().trim().optional(),
  description: z
    .string()
    .trim()
    .max(1000, "Keep under 1000 characters")
    .optional(),
  size: z.string().trim().optional(),
  industry: z.string().trim().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
