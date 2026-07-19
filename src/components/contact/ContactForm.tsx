"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { contactFormSchema, ContactFormValues } from "@/lib/validation/contact";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await api.post("/api/contact", values);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setErrorMessage(
        getErrorMessage(err, "Could not send your message right now"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white/60 p-8 text-center sm:p-10">
        <CheckCircle2 className="h-10 w-10 text-signal" />
        <h2 className="font-display text-lg font-semibold text-ink">
          Message sent
        </h2>
        <p className="text-sm text-slate">
          Thanks for reaching out — we'll get back to you soon.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-line bg-white/60 p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Your name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <Input
        label="Subject"
        error={errors.subject?.message}
        {...register("subject")}
      />
      <Textarea
        label="Message"
        rows={6}
        error={errors.message?.message}
        {...register("message")}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <Button
        type="submit"
        isLoading={isSubmitting}
        fullWidth
        className="sm:w-auto sm:px-8"
      >
        Send Message
      </Button>
    </form>
  );
}
