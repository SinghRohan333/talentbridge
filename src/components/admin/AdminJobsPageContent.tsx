"use client";

import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { JobModerationTable } from "./JobModerationTable";

export function AdminJobsPageContent() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Job moderation
          </h1>
          <p className="mt-2 text-slate">
            Review, flag, or remove job postings across the platform.
          </p>
        </div>
        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-2xl bg-line" />}
        >
          <JobModerationTable />
        </Suspense>
      </main>
    </ProtectedRoute>
  );
}
