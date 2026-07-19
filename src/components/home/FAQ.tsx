"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is TalentBridge free to use?",
    a: "Yes — creating an account, browsing jobs, and applying is completely free for job seekers. Employers can post jobs at no cost during our current launch period.",
  },
  {
    q: "How does the AI matching work?",
    a: "As you view, save, and apply to jobs, TalentBridge builds a picture of what you're looking for and surfaces roles that fit — available from your Recommendations page once you're signed in.",
  },
  {
    q: "Can I apply without a resume?",
    a: "Yes, a cover letter alone is enough to apply. Uploading a resume lets our AI extract your skills automatically and improves your recommendations.",
  },
  {
    q: "How do employers verify their company?",
    a: "Every employer signs up with a dedicated employer account tied to their company profile, which is visible on every job they post.",
  },
  {
    q: "Can I edit or remove a job after posting it?",
    a: "Yes — employers can edit, close, or delete any of their postings anytime from the Manage Jobs page.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
        Frequently asked questions
      </h2>

      <div className="divide-y divide-line rounded-2xl border border-line bg-white/60">
        {faqs.map((faq, i) => (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-ink sm:text-base">
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-slate transition-transform",
                  openIndex === i && "rotate-180",
                )}
              />
            </button>
            {openIndex === i && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-slate">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
