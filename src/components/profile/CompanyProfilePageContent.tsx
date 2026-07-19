"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useProfile } from "@/hooks/useProfile";
import { CompanyProfileForm } from "./CompanyProfileForm";

export function CompanyProfilePageContent() {
  const { data: profile, isPending } = useProfile();

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Company profile
          </h1>
          <p className="mt-2 text-slate">
            This information appears on every job you post.
          </p>
        </div>
        {isPending || !profile ? (
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-line" />
            ))}
          </div>
        ) : (
          <CompanyProfileForm profile={profile} />
        )}
      </main>
    </ProtectedRoute>
  );
}
