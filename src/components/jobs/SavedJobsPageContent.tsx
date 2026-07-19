"use client";

import { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SavedJobsExplorer } from "./SavedJobsExplorer";
import { JobGrid } from "./JobGrid";

export function SavedJobsPageContent() {
  return (
    <ProtectedRoute allowedRoles={["seeker"]}>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Saved jobs
          </h1>
          <p className="mt-2 text-slate">
            Jobs you&apos;ve bookmarked to review later.
          </p>
        </div>
        <Suspense
          fallback={<JobGrid jobs={undefined} isLoading isError={false} />}
        >
          <SavedJobsExplorer />
        </Suspense>
      </main>
    </ProtectedRoute>
  );
}
