"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import { SeekerDashboardContent } from "./SeekerDashboardContent";

export function DashboardPageContent() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["seeker"]}>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-2 text-slate">
            Here&apos;s a snapshot of your job search.
          </p>
        </div>
        <SeekerDashboardContent />
      </main>
    </ProtectedRoute>
  );
}
