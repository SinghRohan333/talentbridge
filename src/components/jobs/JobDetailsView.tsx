"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  MapPin,
  Clock,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useJobDetails } from "@/hooks/useJobDetails";
import { formatSalaryRange } from "@/lib/format";
import { getErrorMessage } from "@/lib/utils";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/jobs/JobCard";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { Job } from "@/types/job";

const typeLabel: Record<Job["type"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const experienceLabel: Record<Job["experienceLevel"], string> = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior level",
  lead: "Lead / Manager",
};

function JobDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-10 sm:px-6">
      <div className="mb-6 h-6 w-32 rounded bg-line" />
      <div className="mb-8 h-40 rounded-2xl bg-line" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-64 rounded-2xl bg-line lg:col-span-2" />
        <div className="h-64 rounded-2xl bg-line" />
      </div>
    </div>
  );
}

export function JobDetailsView({ jobId }: { jobId: string }) {
  const { data, isPending, isError } = useJobDetails(jobId);
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  if (isPending) return <JobDetailsSkeleton />;

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Job not found
        </h1>
        <p className="mt-2 text-slate">
          This posting may have been closed or removed.
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex items-center gap-2 text-signal hover:text-signal-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all jobs
        </Link>
      </div>
    );
  }

  const { job, similar, isSaved, hasApplied } = data;
  const isSeeker = user?.role === "seeker";

  const requireLogin = () => {
    toast("Log in as a job seeker to do that", { icon: "🔒" });
    router.push("/login");
  };

  const handleSaveToggle = async () => {
    if (!user) return requireLogin();
    if (!isSeeker)
      return toast("Only job seeker accounts can save jobs", { icon: "🔒" });

    setIsSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/api/saved-jobs/${job._id}`);
        toast.success("Removed from saved jobs");
      } else {
        await api.post(`/api/saved-jobs/${job._id}`);
        toast.success("Job saved");
      }
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update saved jobs"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyClick = () => {
    if (!user) return requireLogin();
    if (!isSeeker)
      return toast("Only job seeker accounts can apply", { icon: "🔒" });
    setIsApplyOpen(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all jobs
      </Link>

      <div className="mb-8 rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-paper">
              {job.company.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-lg font-semibold text-signal">
                  {job.company.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {job.title}
              </h1>
              <p className="mt-1 text-slate">{job.company.name}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate">
                <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1">
                  <MapPin className="h-3 w-3" /> {job.location} ·{" "}
                  {job.locationType}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1">
                  <Briefcase className="h-3 w-3" /> {typeLabel[job.type]}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1">
                  <Clock className="h-3 w-3" /> Posted{" "}
                  {formatDistanceToNow(new Date(job.createdAt))} ago
                </span>
              </div>
            </div>
          </div>

          {(!user || isSeeker) && (
            <div className="flex flex-col gap-2 sm:w-44 sm:shrink-0">
              {hasApplied ? (
                <Button fullWidth disabled variant="outline">
                  <CheckCircle2 className="h-4 w-4 text-signal" /> Applied
                </Button>
              ) : (
                <Button fullWidth onClick={handleApplyClick}>
                  Apply Now
                </Button>
              )}
              <Button
                variant="outline"
                fullWidth
                isLoading={isSaving}
                onClick={handleSaveToggle}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-signal" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          )}
        </div>

        <p className="mt-6 text-lg font-semibold text-ink">
          {formatSalaryRange(job)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">
              Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate">
              {job.description}
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">
              Requirements
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {job.benefits.length > 0 && (
            <section className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
              <h2 className="mb-3 font-display text-lg font-semibold text-ink">
                Benefits
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-line bg-white/60 p-6">
            <h2 className="mb-4 font-display text-base font-semibold text-ink">
              Job overview
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Category</dt>
                <dd className="text-right font-medium text-ink">
                  {job.category}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Experience</dt>
                <dd className="text-right font-medium text-ink">
                  {experienceLabel[job.experienceLevel]}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Job type</dt>
                <dd className="text-right font-medium text-ink">
                  {typeLabel[job.type]}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Work setting</dt>
                <dd className="text-right font-medium capitalize text-ink">
                  {job.locationType}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate">Applicants</dt>
                <dd className="text-right font-medium text-ink">
                  {job.applicationCount}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-white/60 p-6">
            <h2 className="mb-3 font-display text-base font-semibold text-ink">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line px-2.5 py-1 text-xs text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 font-display text-xl font-semibold text-ink">
            Similar jobs
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((j) => (
              <JobCard key={j._id} job={j} />
            ))}
          </div>
        </section>
      )}

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        jobId={job._id}
        jobTitle={job.title}
      />
    </div>
  );
}
