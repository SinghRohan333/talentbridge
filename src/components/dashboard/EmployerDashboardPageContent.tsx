"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";
import { EmployerDashboardContent } from "./EmployerDashboardContent";

export function EmployerDashboardPageContent() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["employer"]}>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-2 text-slate">
            Here&apos;s how your job postings are performing.
          </p>
        </div>
        <EmployerDashboardContent />
      </main>
    </ProtectedRoute>
  );
}
