import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";
import { Job } from "@/types/job";
import { formatSalaryRange } from "@/lib/format";

const typeLabel: Record<Job["type"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-5 transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-paper">
          {job.company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="font-display text-sm font-semibold text-signal">
              {job.company.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {job.company.name}
          </p>
          <p className="truncate text-xs text-slate">{job.location}</p>
        </div>
      </div>

      <h3 className="mb-1.5 line-clamp-2 font-display text-lg font-semibold text-ink">
        {job.title}
      </h3>
      <p className="mb-4 line-clamp-2 flex-1 text-sm text-slate">
        {job.shortDescription}
      </p>

      <div className="mb-4 flex flex-wrap gap-2 text-xs text-slate">
        <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1">
          <Briefcase className="h-3 w-3" /> {typeLabel[job.type]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1">
          <MapPin className="h-3 w-3" /> {job.locationType}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-line pt-4">
        <span className="text-sm font-semibold text-ink">
          {formatSalaryRange(job)}
        </span>
        <Link
          href={`/jobs/${job._id}`}
          className="shrink-0 rounded-lg bg-signal px-3.5 py-2 text-xs font-medium text-paper transition-colors hover:bg-signal-dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
