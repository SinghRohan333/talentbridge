import type { Metadata } from "next";
import { Suspense } from "react";
import { JobsExplorer } from "@/components/jobs/JobsExplorer";
import { JobGrid } from "@/components/jobs/JobGrid";

export const metadata: Metadata = {
  title: "Browse Jobs — TalentBridge",
  description: "Search and filter the latest job openings on TalentBridge.",
};

export default function JobsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Browse jobs
        </h1>
        <p className="mt-2 text-slate">
          Search, filter, and sort to find the right opportunity.
        </p>
      </div>
      <Suspense
        fallback={<JobGrid jobs={undefined} isLoading isError={false} />}
      >
        <JobsExplorer />
      </Suspense>
    </main>
  );
}
