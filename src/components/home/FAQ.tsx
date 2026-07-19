import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    question: "Is TalentBridge free to use?",
    answer:
      "Yes — creating an account, browsing jobs, and applying is completely free for job seekers. Employers can post jobs at no cost during our current launch period.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "As you view, save, and apply to jobs, TalentBridge builds a picture of what you're looking for and surfaces roles that fit — available from your Recommendations page once you're signed in.",
  },
  {
    question: "Can I apply without a resume?",
    answer:
      "Yes, a cover letter alone is enough to apply. Uploading a resume lets our AI extract your skills automatically and improves your recommendations.",
  },
  {
    question: "How do employers verify their company?",
    answer:
      "Every employer signs up with a dedicated employer account tied to their company profile, which is visible on every job they post.",
  },
  {
    question: "Can I edit or remove a job after posting it?",
    answer:
      "Yes — employers can view or remove any of their postings anytime from the Manage Jobs page.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
        Frequently asked questions
      </h2>
      <Accordion items={faqs} defaultOpenIndex={0} />
    </section>
  );
}
