"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ManageJobsTable } from "@/components/jobs/ManageJobsTable";

export function ManageJobsPageContent() {
  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Manage jobs
          </h1>
          <p className="mt-2 text-slate">All postings under your account.</p>
        </div>
        <ManageJobsTable />
      </main>
    </ProtectedRoute>
  );
}
