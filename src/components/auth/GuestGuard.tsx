"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <span className="text-sm text-slate">Loading…</span>
      </div>
    );
  }

  return <>{children}</>;
}
