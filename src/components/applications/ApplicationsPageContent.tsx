"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ApplicationsList } from "./ApplicationsList";

export function ApplicationsPageContent() {
  return (
    <ProtectedRoute allowedRoles={["seeker"]}>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            My applications
          </h1>
          <p className="mt-2 text-slate">
            Track the status of every job you&apos;ve applied to.
          </p>
        </div>
        <ApplicationsList />
      </main>
    </ProtectedRoute>
  );
}
