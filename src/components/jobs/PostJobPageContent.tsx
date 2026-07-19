"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { JobForm } from "@/components/jobs/JobForm";

export function PostJobPageContent() {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Post a job
          </h1>
          <p className="mt-2 text-slate">
            Fill in the details below — you can edit or delete it anytime from
            Manage Jobs.
          </p>
        </div>
        <JobForm mode="create" />
      </main>
    </ProtectedRoute>
  );
}
