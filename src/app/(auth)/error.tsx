"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
        <AlertTriangle className="h-7 w-7 text-red-600" />
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Something went wrong
      </h1>
      <p className="max-w-sm text-slate">Please try again.</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-signal px-5 py-2.5 text-sm font-medium text-paper hover:bg-signal-dark"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-line/30"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
