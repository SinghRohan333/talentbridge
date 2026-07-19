import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — TalentBridge",
  description: "Get in touch with the TalentBridge team.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate">
          Questions, feedback, or something not working right? Send us a message
          and we'll get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-white/60 p-6">
            <Mail className="mb-3 h-5 w-5 text-signal" />
            <h2 className="mb-1 font-medium text-ink">Email us</h2>
            <a
              href="mailto:support@talentbridge.dev"
              className="text-sm text-slate hover:text-signal"
            >
              support@talentbridge.dev
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-white/60 p-6">
            <Clock className="mb-3 h-5 w-5 text-signal" />
            <h2 className="mb-1 font-medium text-ink">Response time</h2>
            <p className="text-sm text-slate">
              We typically reply within 1–2 business days.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white/60 p-6">
            <MessageCircle className="mb-3 h-5 w-5 text-signal" />
            <h2 className="mb-1 font-medium text-ink">Common questions</h2>
            <p className="text-sm text-slate">
              Check the{" "}
              <a href="/help" className="text-signal hover:text-signal-dark">
                Help Center
              </a>{" "}
              first — you might find your answer faster.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
