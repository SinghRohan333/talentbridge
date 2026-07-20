import type { Metadata } from "next";
import Link from "next/link";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up — TalentBridge",
  description: "Create a TalentBridge account to find jobs or start hiring.",
};

export default function RegisterPage() {
  return (
    <GuestGuard>
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
              Create an account to get started.
            </p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-slate">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-signal hover:text-signal-dark"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
    </GuestGuard>
  );
}
