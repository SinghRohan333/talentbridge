"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const quickFilters = [
  { label: "Remote", param: "locationType=remote" },
  { label: "Engineering", param: "category=Engineering" },
  { label: "Design", param: "category=Design" },
  { label: "Internships", param: "type=internship" },
];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-paper px-4 py-16 sm:min-h-[65vh] sm:px-6 lg:min-h-[70vh]">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-ember/10 blur-3xl sm:h-80 sm:w-80"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <span className="inline-block rounded-full border border-line bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate">
          AI-powered job matching
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Find work that <span className="text-signal">moves you</span> forward.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate sm:text-lg">
          TalentBridge connects job seekers with roles that actually fit —
          powered by AI matching, real company data, and a search that gets out
          of your way.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill, or company…"
              className="min-h-12 w-full rounded-xl border border-line bg-white px-10 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
            />
          </div>
          <button
            type="submit"
            className="min-h-12 shrink-0 rounded-xl bg-signal px-6 text-sm font-medium text-paper transition-colors hover:bg-signal-dark"
          >
            Search Jobs
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {quickFilters.map((filter) => (
            <a
              key={filter.label}
              href={`/jobs?${filter.param}`}
              className="rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {filter.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
