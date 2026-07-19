"use client";

import { useState } from "react";
import {
  UserPlus,
  Sparkles,
  Send,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const seekerSteps = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Sign up and add your skills, experience, and preferences in minutes.",
  },
  {
    icon: Sparkles,
    title: "Get matched",
    description:
      "Our AI surfaces roles that actually fit — not just keyword matches.",
  },
  {
    icon: Send,
    title: "Apply with confidence",
    description:
      "Apply directly and track every application from one dashboard.",
  },
];

const employerSteps = [
  {
    icon: FileText,
    title: "Post your role",
    description: "Publish a job in minutes with our guided posting form.",
  },
  {
    icon: Users,
    title: "Reach qualified candidates",
    description:
      "Your listing reaches seekers actively matched to your requirements.",
  },
  {
    icon: TrendingUp,
    title: "Manage & hire",
    description: "Review applicants and manage every posting from one place.",
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"seeker" | "employer">("seeker");
  const steps = activeTab === "seeker" ? seekerSteps : employerSteps;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          How it works
        </h2>
        <div className="mt-5 inline-flex rounded-full border border-line bg-white/60 p-1">
          {(["seeker", "employer"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-signal text-paper"
                  : "text-ink hover:text-signal",
              )}
            >
              {tab === "seeker" ? "For Job Seekers" : "For Employers"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-line bg-white/60 p-6"
          >
            <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-ember text-xs font-semibold text-ink">
              {i + 1}
            </span>
            <step.icon className="mb-3 h-6 w-6 text-signal" />
            <h3 className="mb-1.5 font-medium text-ink">{step.title}</h3>
            <p className="text-sm text-slate">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
