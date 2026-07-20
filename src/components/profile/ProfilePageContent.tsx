"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useProfile } from "@/hooks/useProfile";
import { ResumeUpload } from "./ResumeUpload";
import { ProfileForm } from "./ProfileForm";

export function ProfilePageContent() {
  const { data: profile, isPending } = useProfile();

  return (
    <ProtectedRoute allowedRoles={["seeker"]}>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Your profile
          </h1>
          <p className="mt-2 text-slate">
            Keep this up to date — it powers your job recommendations.
          </p>
        </div>
        {isPending || !profile ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-line" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <ResumeUpload currentResumeUrl={profile.resumeUrl} />
            <ProfileForm profile={profile} />
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
