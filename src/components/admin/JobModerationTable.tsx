"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Flag, ShieldCheck, Trash2, Eye } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage, cn } from "@/lib/utils";
import { useAdminJobs } from "@/hooks/useAdminJobs";
import { useDebounce } from "@/hooks/useDebounce";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/jobs/Pagination";
import { Job, JobsResponse } from "@/types/job";

const statusStyles: Record<Job["status"], string> = {
  active: "bg-green-100 text-green-700",
  closed: "bg-slate/10 text-slate",
  draft: "bg-amber-100 text-amber-700",
  flagged: "bg-red-100 text-red-700",
};

export function JobModerationTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebounce(searchInput, 400);
  const status = searchParams.get("status") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get("search") ?? "")) {
      updateParam("search", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: status || undefined,
    page,
  };
  const { data, isPending, isError } = useAdminJobs(queryParams);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleToggleFlag = async (job: Job) => {
    setBusyId(job._id);
    try {
      const endpoint = job.status === "flagged" ? "unflag" : "flag";
      await api.patch(`/api/admin/jobs/${job._id}/${endpoint}`);
      queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
      toast.success(job.status === "flagged" ? "Job unflagged" : "Job flagged");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update job"));
    } finally {
      setBusyId(null);
    }
  };

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
    setBusyId(jobId);
    try {
      await api.delete(`/api/admin/jobs/${jobId}`);
      toast.success("Job deleted");
      queryClient.setQueryData<JobsResponse | undefined>(
        ["admin-jobs", queryParams],
        (prev) =>
          prev
            ? { ...prev, jobs: prev.jobs.filter((j) => j._id !== jobId) }
            : prev,
      );
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not delete job"));
    } finally {
      setBusyId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by job title or company…"
          className="min-h-11 flex-1 rounded-lg border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
        />
        <Select
          value={status}
          onChange={(e) => updateParam("status", e.target.value)}
          className="sm:w-48"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
          <option value="flagged">Flagged</option>
        </Select>
      </div>

      {isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-line" />
          ))}
        </div>
      ) : isError || !data ? (
        <p className="py-16 text-center text-sm text-slate">
          Couldn&apos;t load jobs right now.
        </p>
      ) : data.jobs.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate">
          No jobs match your search.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="hidden bg-paper px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate sm:grid sm:grid-cols-[2fr_1fr_1fr_auto] sm:gap-4">
            <span>Job</span>
            <span>Company</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-line bg-white/60">
            {data.jobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{job.title}</p>
                  <p className="truncate text-xs text-slate">
                    {job.location} · {job.type}
                  </p>
                </div>
                <div className="truncate text-sm text-ink">
                  {job.company.name}
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
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-line/30"
                    aria-label="View job"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 px-3 text-xs"
                    isLoading={busyId === job._id && confirmingId !== job._id}
                    onClick={() => handleToggleFlag(job)}
                  >
                    {job.status === "flagged" ? (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Flag className="h-3.5 w-3.5" />
                    )}
                    {job.status === "flagged" ? "Unflag" : "Flag"}
                  </Button>
                  <Button
                    type="button"
                    variant={confirmingId === job._id ? "primary" : "outline"}
                    className={cn(
                      "h-9 px-3 text-xs",
                      confirmingId === job._id && "bg-red-500 hover:bg-red-600",
                    )}
                    isLoading={busyId === job._id && confirmingId === job._id}
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
      )}

      {data && data.pagination.totalPages > 1 && (
        <Pagination pagination={data.pagination} />
      )}
    </div>
  );
}
