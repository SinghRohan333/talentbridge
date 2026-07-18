"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { jobFormSchema, JobFormValues } from "@/lib/validation/job";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { TagInput } from "@/components/ui/TagInput";
import { Button } from "@/components/ui/Button";

const typeOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];
const locationTypeOptions = [
  { value: "on-site", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];
const experienceOptions = [
  { value: "entry", label: "Entry level" },
  { value: "mid", label: "Mid level" },
  { value: "senior", label: "Senior level" },
  { value: "lead", label: "Lead / Manager" },
];

export function PostJobForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      type: "full-time",
      locationType: "on-site",
      experienceLevel: "mid",
      skills: [],
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title,
        shortDescription: values.shortDescription,
        description: values.description,
        category: values.category,
        type: values.type,
        locationType: values.locationType,
        location: values.location,
        salaryMin: values.salaryMin ? Number(values.salaryMin) : undefined,
        salaryMax: values.salaryMax ? Number(values.salaryMax) : undefined,
        skills: values.skills,
        requirements: values.requirementsText
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
        benefits: values.benefitsText
          ? values.benefitsText
              .split("\n")
              .map((b) => b.trim())
              .filter(Boolean)
          : [],
        experienceLevel: values.experienceLevel,
        applicationDeadline: values.applicationDeadline
          ? new Date(values.applicationDeadline).toISOString()
          : undefined,
        companyLogoUrl: values.companyLogoUrl || undefined,
      };

      const { data } = await api.post("/api/jobs", payload);
      queryClient.invalidateQueries({ queryKey: ["my-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job posted successfully");
      router.push(`/jobs/${data.job._id}`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not post job"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Basics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Job title"
              placeholder="e.g. Senior Frontend Engineer"
              error={errors.title?.message}
              {...register("title")}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Short description"
              placeholder="One or two sentences shown on the job card"
              rows={2}
              error={errors.shortDescription?.message}
              {...register("shortDescription")}
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              label="Full description"
              placeholder="Full role description"
              rows={6}
              error={errors.description?.message}
              {...register("description")}
            />
          </div>
          <Input
            label="Category"
            placeholder="e.g. Engineering"
            error={errors.category?.message}
            {...register("category")}
          />
          <Select
            label="Experience level"
            error={errors.experienceLevel?.message}
            {...register("experienceLevel")}
          >
            {experienceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Location & type
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Job type"
            error={errors.type?.message}
            {...register("type")}
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Select
            label="Work setting"
            error={errors.locationType?.message}
            {...register("locationType")}
          >
            {locationTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
          <Input
            label="Location"
            placeholder="e.g. Austin, TX or Remote — US"
            error={errors.location?.message}
            {...register("location")}
          />
          <Input
            label="Application deadline (optional)"
            type="date"
            error={errors.applicationDeadline?.message}
            {...register("applicationDeadline")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Compensation
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Minimum salary (USD, optional)"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 90000"
            error={errors.salaryMin?.message}
            {...register("salaryMin")}
          />
          <Input
            label="Maximum salary (USD, optional)"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 120000"
            error={errors.salaryMax?.message}
            {...register("salaryMax")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Skills & requirements
        </h2>
        <div className="space-y-4">
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <TagInput
                label="Required skills"
                values={field.value}
                onChange={field.onChange}
                placeholder="Type a skill and press Enter"
                error={errors.skills?.message}
              />
            )}
          />
          <Textarea
            label="Requirements"
            hint="One requirement per line"
            rows={4}
            error={errors.requirementsText?.message}
            {...register("requirementsText")}
          />
          <Textarea
            label="Benefits (optional)"
            hint="One benefit per line"
            rows={3}
            error={errors.benefitsText?.message}
            {...register("benefitsText")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Company logo (optional)
        </h2>
        <Input
          label="Logo image URL"
          placeholder="https://…"
          hint="Applies to this and future postings from your account"
          error={errors.companyLogoUrl?.message}
          {...register("companyLogoUrl")}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          className="sm:w-auto sm:px-8"
        >
          Post Job
        </Button>
      </div>
    </form>
  );
}
