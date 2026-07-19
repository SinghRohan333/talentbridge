import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Help Center — TalentBridge",
  description: "Answers to common questions about using TalentBridge.",
};

const categories = [
  {
    title: "Getting Started",
    items: [
      {
        question: "How do I create an account?",
        answer:
          "Go to the Sign Up page and choose whether you're a Job Seeker or an Employer — this determines what you'll see across the site. You can also sign up instantly with Google.",
      },
      {
        question:
          "What's the difference between a Job Seeker and Employer account?",
        answer:
          "Job Seeker accounts can browse, save, and apply to jobs. Employer accounts can post and manage job listings. Each account has one role, chosen at sign-up.",
      },
      {
        question: "I can't log in — what should I do?",
        answer:
          'Double-check your email and password are correct. If you signed up with Google, use the "Sign in with Google" button rather than a password. Still stuck? Reach out through our Contact page and we\'ll help you get back in.',
      },
    ],
  },
  {
    title: "For Job Seekers",
    items: [
      {
        question: "How do I apply to a job?",
        answer:
          'Open any job listing and click "Apply Now." You can optionally include a cover letter with your application.',
      },
      {
        question: "How do I save a job for later?",
        answer:
          "Click the bookmark icon on any job card or job details page. You'll need to be logged in as a Job Seeker to save jobs.",
      },
      {
        question: "Can I apply to the same job twice?",
        answer:
          'No — once you\'ve applied, the Apply button is replaced with an "Applied" indicator so you always know where you stand.',
      },
    ],
  },
  {
    title: "For Employers",
    items: [
      {
        question: "How do I post a job?",
        answer:
          'From the navbar, select "Post a Job" and fill in the details — title, description, location, salary range, required skills, and requirements.',
      },
      {
        question: "Can I manage my job postings?",
        answer:
          'Yes — the "Manage Jobs" page lists everything you\'ve posted, where you can view or remove any listing.',
      },
      {
        question: "Is there a cost to post a job?",
        answer: "No, posting jobs is free during our current launch period.",
      },
    ],
  },
  {
    title: "Account & Security",
    items: [
      {
        question: "Is my data secure?",
        answer:
          "Passwords are hashed and never stored in plain text, and authentication uses short-lived tokens with secure, httpOnly cookies — your session can't be read or tampered with from client-side scripts.",
      },
      {
        question: "How do I log out?",
        answer:
          'Click your name in the top navigation bar and select "Log out." This immediately invalidates your session on our end.',
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Help Center
        </h1>
        <p className="mt-3 text-slate">
          Answers to the questions we hear most often.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category.title}>
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">
              {category.title}
            </h2>
            <Accordion items={category.items} />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-line bg-white/50 p-6 text-center">
        <p className="text-slate">
          Didn&apos;t find what you needed?{" "}
          <Link
            href="/contact"
            className="font-medium text-signal hover:text-signal-dark"
          >
            Contact our team
          </Link>
        </p>
      </div>
    </main>
  );
}
