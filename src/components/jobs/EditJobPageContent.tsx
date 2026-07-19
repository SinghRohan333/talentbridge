"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import { useJobDetails } from "@/hooks/useJobDetails";
import { JobForm } from "@/components/jobs/JobForm";

export function EditJobPageContent({ jobId }: { jobId: string }) {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <EditJobContent jobId={jobId} />
    </ProtectedRoute>
  );
}

function EditJobContent({ jobId }: { jobId: string }) {
  const { user } = useAuth();
  const { data, isPending, isError } = useJobDetails(jobId);

  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="space-y-4">
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
          Job not found
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
          You don&apos;t have permission to edit this job.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Edit job
        </h1>
        <p className="mt-2 text-slate">
          Update details or change the status of this posting.
        </p>
      </div>
      <JobForm mode="edit" job={data.job} />
    </main>
  );
}
