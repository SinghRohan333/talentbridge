"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { companyFormSchema, CompanyFormValues } from "@/lib/validation/company";
import { FullUser } from "@/types/profile";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const sizeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"];

function buildDefaults(profile: FullUser): CompanyFormValues {
  return {
    name: profile.company?.name ?? profile.name,
    logo: profile.company?.logo ?? "",
    website: profile.company?.website ?? "",
    description: profile.company?.description ?? "",
    size: profile.company?.size ?? "",
    industry: profile.company?.industry ?? "",
  };
}

export function CompanyProfileForm({ profile }: { profile: FullUser }) {
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: buildDefaults(profile),
  });

  useEffect(() => {
    reset(buildDefaults(profile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile._id]);

  const onSubmit = async (values: CompanyFormValues) => {
    try {
      await api.patch("/api/users/profile", { company: values });
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Company profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update company profile"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Company details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Company name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Website (optional)"
            placeholder="https://…"
            error={errors.website?.message}
            {...register("website")}
          />
          <Input
            label="Industry (optional)"
            placeholder="e.g. Software, Healthcare"
            error={errors.industry?.message}
            {...register("industry")}
          />
          <Select label="Company size (optional)" {...register("size")}>
            <option value="">Select size</option>
            {sizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} employees
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-4">
          <Textarea
            label="Description (optional)"
            rows={4}
            hint="Shown to candidates viewing your job postings"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Logo
        </h2>
        <Input
          label="Logo image URL (optional)"
          placeholder="https://…"
          hint="Applies to all your job postings"
          error={errors.logo?.message}
          {...register("logo")}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          className="sm:w-auto sm:px-8"
        >
          Save Company Profile
        </Button>
      </div>
    </form>
  );
}
