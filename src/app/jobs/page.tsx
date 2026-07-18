import type { Metadata } from "next";
import { JobGrid } from "@/components/jobs/JobGrid";

export const metadata: Metadata = {
  title: "Browse Jobs — TalentBridge",
  description: "Explore the latest job openings on TalentBridge.",
};

export default function JobsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Browse jobs
        </h1>
        <p className="mt-2 text-slate">
          Search and filters land next milestone — here are the latest active
          postings.
        </p>
      </div>
      <JobGrid />
    </main>
  );
}
