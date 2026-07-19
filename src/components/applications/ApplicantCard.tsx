"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { JobApplicant } from "@/types/application";
import { Select } from "@/components/ui/Select";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

export function ApplicantCard({
  applicant,
  jobId,
}: {
  applicant: JobApplicant;
  jobId: string;
}) {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = async (status: string) => {
    setIsUpdating(true);
    try {
      await api.patch(`/api/applications/${applicant._id}/status`, { status });
      queryClient.setQueryData<{ applications: JobApplicant[] } | undefined>(
        ["job-applicants", jobId],
        (prev) =>
          prev
            ? {
                ...prev,
                applications: prev.applications.map((a) =>
                  a._id === applicant._id
                    ? { ...a, status: status as JobApplicant["status"] }
                    : a,
                ),
              }
            : prev,
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update status"));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-paper">
            {applicant.seeker?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={applicant.seeker.avatar}
                alt={applicant.seeker.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-sm font-semibold text-signal">
                {(applicant.seeker?.name ?? "?").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-ink">
              {applicant.seeker?.name ?? "Unknown applicant"}
            </p>
            <p className="text-xs text-slate">{applicant.seeker?.email}</p>
            <p className="mt-0.5 text-xs text-slate">
              Applied {formatDistanceToNow(new Date(applicant.createdAt))} ago
            </p>
          </div>
        </div>

        <div className="w-full sm:w-44">
          <Select
            value={applicant.status}
            disabled={isUpdating}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {applicant.seeker && applicant.seeker.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {applicant.seeker.skills.slice(0, 8).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-line px-2 py-0.5 text-xs text-ink"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {(applicant.coverLetter || applicant.resumeUrl) && (
        <div className="mt-3 border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dark"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
            {isExpanded ? "Hide details" : "View cover letter & resume"}
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-3">
              {applicant.coverLetter && (
                <p className="whitespace-pre-line rounded-lg bg-paper p-3 text-sm text-slate">
                  {applicant.coverLetter}
                </p>
              )}
              {applicant.resumeUrl && (
                <a
                  href={applicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:text-signal-dark"
                >
                  <FileText className="h-4 w-4" /> View resume
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
