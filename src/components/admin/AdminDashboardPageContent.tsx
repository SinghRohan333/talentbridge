"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminDashboardContent } from "./AdminDashboardContent";

export function AdminDashboardPageContent() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Admin dashboard
          </h1>
          <p className="mt-2 text-slate">
            Platform-wide metrics across users and job postings.
          </p>
        </div>
        <AdminDashboardContent />
      </main>
    </ProtectedRoute>
  );
}
