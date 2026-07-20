import Link from "next/link";
import { Sparkles } from "lucide-react";
import { formatSalaryRange } from "@/lib/format";
import { RecommendationItem } from "@/types/recommendation";

export function RecommendationCard({ item }: { item: RecommendationItem }) {
  const { job, score, reasoning } = item;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white/70 p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-paper">
            {job.company.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="h-full w-full object-cover"
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
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal-dark">
          {score}% match
        </span>
      </div>

      <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-ink">
        {job.title}
      </h3>

      <div className="mb-4 flex items-start gap-2 rounded-lg bg-signal/5 px-3 py-2.5 text-xs text-signal-dark">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>{reasoning}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-4">
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
