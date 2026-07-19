"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import { useJobApplicants } from "@/hooks/useJobApplicants";
import { ApplicantCard } from "./ApplicantCard";

export function JobApplicantsPageContent({ jobId }: { jobId: string }) {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <JobApplicantsContent jobId={jobId} />
    </ProtectedRoute>
  );
}

function JobApplicantsContent({ jobId }: { jobId: string }) {
  const { user } = useAuth();
  const { data, isPending, isError } = useJobApplicants(jobId);

  if (isPending) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-line" />
          ))}
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Couldn&apos;t load applicants
        </h1>
      </main>
    );
  }

  if (data.job.employerId !== user?._id) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Access denied
        </h1>
        <p className="mt-2 text-slate">
          You don&apos;t have permission to view these applicants.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/jobs/manage"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Manage Jobs
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Applicants
        </h1>
        <p className="mt-2 text-slate">
          {data.applications.length} applicant
          {data.applications.length === 1 ? "" : "s"} for &quot;{data.job.title}
          &quot;
        </p>
      </div>

      {data.applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-white/50 px-6 py-16 text-center">
          <p className="text-slate">No applicants yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.applications.map((applicant) => (
            <ApplicantCard
              key={applicant._id}
              applicant={applicant}
              jobId={jobId}
            />
          ))}
        </div>
      )}
    </main>
  );
}
