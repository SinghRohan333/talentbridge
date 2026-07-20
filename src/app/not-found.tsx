import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-4 py-16 text-center">
      <Link href="/" className="font-display text-2xl font-semibold text-ink">
        Talent<span className="text-signal">Bridge</span>
      </Link>
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-signal/10">
        <Compass className="h-7 w-7 text-signal" />
      </div>
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="max-w-sm text-slate">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-signal px-5 py-2.5 text-sm font-medium text-paper hover:bg-signal-dark"
        >
          Back to home
        </Link>
        <Link
          href="/jobs"
          className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-line/30"
        >
          Browse jobs
        </Link>
      </div>
    </main>
  );
}
