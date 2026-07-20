"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RecommendationsGrid } from "./RecommendationsGrid";

export function RecommendationsPageContent() {
  return (
    <ProtectedRoute allowedRoles={["seeker"]}>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Recommended for you
          </h1>
          <p className="mt-2 text-slate">
            Personalized matches based on your profile and activity.
          </p>
        </div>
        <RecommendationsGrid />
      </main>
    </ProtectedRoute>
  );
}
