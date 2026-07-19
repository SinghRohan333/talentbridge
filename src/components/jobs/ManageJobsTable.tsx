"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Trash2, Plus, Pencil, Users } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { getErrorMessage, cn } from "@/lib/utils";
import { formatSalaryRange } from "@/lib/format";
import { Job, JobsResponse } from "@/types/job";
import { Button } from "@/components/ui/Button";
import { useMyJobs } from "@/hooks/useMyJobs";

const statusStyles: Record<Job["status"], string> = {
  active: "bg-green-100 text-green-700",
  closed: "bg-slate/10 text-slate",
  draft: "bg-amber-100 text-amber-700",
  flagged: "bg-red-100 text-red-700",
};

export function ManageJobsTable() {
  const { data, isLoading, isError } = useMyJobs();
  const queryClient = useQueryClient();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (jobId: string) => {
    if (confirmingId !== jobId) {
      setConfirmingId(jobId);
      setTimeout(
        () =>
          setConfirmingId((current) => (current === jobId ? null : current)),
        3000,
      );
      return;
    }

    setDeletingId(jobId);
    try {
      await api.delete(`/api/jobs/${jobId}`);
      toast.success("Job deleted");
      queryClient.setQueryData<JobsResponse | undefined>(["my-jobs"], (prev) =>
        prev
          ? { ...prev, jobs: prev.jobs.filter((j) => j._id !== jobId) }
          : prev,
      );
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not delete job"));
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-line" />
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="py-16 text-center text-sm text-slate">
        Couldn&apos;t load your jobs right now.
      </p>
    );

  if (!data || data.jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-16 text-center">
        <p className="text-slate">You haven&apos;t posted any jobs yet.</p>
        <Link
          href="/jobs/post"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-signal px-4 py-2.5 text-sm font-medium text-paper hover:bg-signal-dark"
        >
          <Plus className="h-4 w-4" /> Post your first job
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="hidden bg-paper px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:gap-4">
        <span>Title</span>
        <span>Status</span>
        <span>Applicants</span>
        <span>Salary</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="divide-y divide-line bg-white/60">
        {data.jobs.map((job) => (
          <div
            key={job._id}
            className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-center sm:gap-4"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">{job.title}</p>
              <p className="truncate text-xs text-slate">
                {job.location} · {job.type}
              </p>
            </div>
            <div>
              <span
                className={cn(
                  "inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                  statusStyles[job.status],
                )}
              >
                {job.status}
              </span>
            </div>
            <div className="text-sm text-ink">
              {job.applicationCount} applicant
              {job.applicationCount === 1 ? "" : "s"}
            </div>
            <div className="text-sm text-ink">{formatSalaryRange(job)}</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Link
                href={`/jobs/${job._id}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-line/30"
                aria-label="View job"
              >
                <Eye className="h-4 w-4" />
              </Link>
              <Link
                href={`/jobs/manage/${job._id}/applicants`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-line/30"
                aria-label="View applicants"
              >
                <Users className="h-4 w-4" />
              </Link>
              <Link
                href={`/jobs/${job._id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-line/30"
                aria-label="Edit job"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <Button
                type="button"
                variant={confirmingId === job._id ? "primary" : "outline"}
                className={cn(
                  "h-9 px-3 text-xs",
                  confirmingId === job._id && "bg-red-500 hover:bg-red-600",
                )}
                isLoading={deletingId === job._id}
                onClick={() => handleDelete(job._id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {confirmingId === job._id ? "Confirm?" : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
