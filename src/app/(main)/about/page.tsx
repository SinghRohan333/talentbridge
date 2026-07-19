import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Zap, Users } from "lucide-react";
import { AboutStats } from "@/components/about/AboutStats";

export const metadata: Metadata = {
  title: "About — TalentBridge",
  description: "Why we built TalentBridge and how we think about hiring.",
};

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Salary ranges are visible upfront on every listing — no guessing games before you apply.",
  },
  {
    icon: Zap,
    title: "Signal over noise",
    description:
      "AI matching learns from how you actually use the platform, so listings get more relevant over time, not less.",
  },
  {
    icon: Users,
    title: "Built for both sides",
    description:
      "We design equally for the person searching and the team hiring — neither side is an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Built to make hiring feel less like guesswork.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate">
          TalentBridge exists because job searching and hiring both take too
          long to get right. We paired straightforward tools — search, filters,
          one-click applications — with AI that actually learns what you're
          looking for, so job seekers spend less time scrolling and employers
          spend less time sorting through mismatched applicants.
        </p>
      </div>

      <div className="mb-12">
        <AboutStats />
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-center font-display text-xl font-semibold text-ink">
          How we think about hiring
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-line bg-white/60 p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-signal/10">
                <value.icon className="h-5 w-5 text-signal" />
              </div>
              <h3 className="mb-1.5 font-medium text-ink">{value.title}</h3>
              <p className="text-sm text-slate">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-8 text-center">
        <h2 className="font-display text-lg font-semibold text-ink">
          Ready to see it in action?
        </h2>
        <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg bg-signal px-5 py-2.5 text-sm font-medium text-paper hover:bg-signal-dark"
          >
            Create free account
          </Link>
          <Link
            href="/jobs"
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-line/30"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
