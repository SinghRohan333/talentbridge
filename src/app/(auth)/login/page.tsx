import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in — TalentBridge",
  description:
    "Log in to TalentBridge to continue your job search or manage your postings.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-ink"
          >
            Talent<span className="text-signal">Bridge</span>
          </Link>
          <p className="mt-2 text-sm text-slate">
            Log in to continue your search or manage your postings.
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-slate">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-signal hover:text-signal-dark"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
