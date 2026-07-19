"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/api/newsletter", { email });
      toast.success("You're subscribed — we'll be in touch");
      setEmail("");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not subscribe right now"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-line bg-white/60 p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-slate">
          Get new roles matched to you in your inbox, or jump straight in and
          create your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="shrink-0 sm:w-auto sm:px-6"
          >
            Subscribe
          </Button>
        </form>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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
    </section>
  );
}
