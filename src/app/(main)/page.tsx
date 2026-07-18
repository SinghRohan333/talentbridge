export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="rounded-full border border-line px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate">
        Scaffold check
      </span>
      <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
        Talent<span className="text-signal">Bridge</span>
      </h1>
      <p className="max-w-md font-body text-slate">
        Frontend scaffold is wired up — Tailwind v4 tokens, fonts, and providers
        are live. Real pages start next milestone.
      </p>
    </main>
  );
}
