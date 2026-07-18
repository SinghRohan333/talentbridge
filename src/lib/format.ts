import { Job } from "@/types/job";

export function formatSalaryRange(
  job: Pick<Job, "salaryMin" | "salaryMax" | "salaryCurrency">,
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: job.salaryCurrency || "USD",
    maximumFractionDigits: 0,
  });

  if (job.salaryMin && job.salaryMax) {
    return `${formatter.format(job.salaryMin)} – ${formatter.format(job.salaryMax)}`;
  }
  if (job.salaryMin) return `From ${formatter.format(job.salaryMin)}`;
  if (job.salaryMax) return `Up to ${formatter.format(job.salaryMax)}`;
  return "Salary not disclosed";
}
