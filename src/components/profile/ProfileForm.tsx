"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage, cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { profileFormSchema, ProfileFormValues } from "@/lib/validation/profile";
import { FullUser } from "@/types/profile";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { TagInput } from "@/components/ui/TagInput";
import { Button } from "@/components/ui/Button";

const jobTypeOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

function buildDefaults(profile: FullUser): ProfileFormValues {
  return {
    name: profile.name,
    phone: profile.phone ?? "",
    location: profile.location ?? "",
    bio: profile.bio ?? "",
    skills: profile.skills,
    preferredJobTypes: profile.preferredJobTypes,
    preferredLocations: profile.preferredLocations,
    preferredCategories: profile.preferredCategories,
    experience: profile.experience.map((exp) => ({
      ...exp,
      endDate: exp.endDate ?? "",
    })),
    education: profile.education.map((edu) => ({
      ...edu,
      year: String(edu.year),
    })),
  };
}

export function ProfileForm({ profile }: { profile: FullUser }) {
  const { refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: buildDefaults(profile),
  });

  useEffect(() => {
    reset(buildDefaults(profile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile._id]);

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await api.patch("/api/users/profile", {
        ...values,
        education: values.education.map((edu) => ({
          ...edu,
          year: Number(edu.year),
        })),
      });
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update profile"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Basic info
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Phone (optional)"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Location (optional)"
            placeholder="e.g. Austin, TX"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>
        <div className="mt-4">
          <Textarea
            label="Bio (optional)"
            rows={3}
            hint="A short summary employers will see"
            error={errors.bio?.message}
            {...register("bio")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Skills
        </h2>
        <Controller
          control={control}
          name="skills"
          render={({ field }) => (
            <TagInput
              label="Your skills"
              values={field.value}
              onChange={field.onChange}
              placeholder="Type a skill and press Enter"
            />
          )}
        />
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-semibold text-ink">
          Job preferences
        </h2>
        <div className="space-y-4">
          <Controller
            control={control}
            name="preferredJobTypes"
            render={({ field }) => (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Job types you&apos;re open to
                </label>
                <div className="flex flex-wrap gap-2">
                  {jobTypeOptions.map((opt) => {
                    const isActive = field.value.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          field.onChange(
                            isActive
                              ? field.value.filter((v) => v !== opt.value)
                              : [...field.value, opt.value],
                          )
                        }
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                          isActive
                            ? "border-signal bg-signal/10 text-signal-dark"
                            : "border-line text-ink hover:border-slate",
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          />
          <Controller
            control={control}
            name="preferredLocations"
            render={({ field }) => (
              <TagInput
                label="Preferred locations"
                values={field.value}
                onChange={field.onChange}
                placeholder="e.g. Remote, Austin TX"
              />
            )}
          />
          <Controller
            control={control}
            name="preferredCategories"
            render={({ field }) => (
              <TagInput
                label="Preferred categories"
                values={field.value}
                onChange={field.onChange}
                placeholder="e.g. Engineering, Design"
              />
            )}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Experience
          </h2>
          <Button
            type="button"
            variant="outline"
            className="h-9 px-3 text-xs"
            onClick={() =>
              experienceArray.append({
                title: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>

        <div className="space-y-4">
          {experienceArray.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-slate">
                  Entry {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => experienceArray.remove(index)}
                  className="text-slate hover:text-red-500"
                  aria-label="Remove entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label="Title"
                  error={errors.experience?.[index]?.title?.message}
                  {...register(`experience.${index}.title`)}
                />
                <Input
                  label="Company"
                  error={errors.experience?.[index]?.company?.message}
                  {...register(`experience.${index}.company`)}
                />
                <Input
                  label="Start date"
                  placeholder="e.g. Jan 2022"
                  error={errors.experience?.[index]?.startDate?.message}
                  {...register(`experience.${index}.startDate`)}
                />
                <Input
                  label="End date (optional)"
                  placeholder="Leave blank if current"
                  {...register(`experience.${index}.endDate`)}
                />
              </div>
              <div className="mt-3">
                <Textarea
                  label="Description (optional)"
                  rows={2}
                  {...register(`experience.${index}.description`)}
                />
              </div>
            </div>
          ))}
          {experienceArray.fields.length === 0 && (
            <p className="text-sm text-slate">No experience added yet.</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Education
          </h2>
          <Button
            type="button"
            variant="outline"
            className="h-9 px-3 text-xs"
            onClick={() =>
              educationArray.append({ degree: "", institution: "", year: "" })
            }
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>

        <div className="space-y-4">
          {educationArray.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-slate">
                  Entry {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => educationArray.remove(index)}
                  className="text-slate hover:text-red-500"
                  aria-label="Remove entry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Input
                  label="Degree"
                  error={errors.education?.[index]?.degree?.message}
                  {...register(`education.${index}.degree`)}
                />
                <Input
                  label="Institution"
                  error={errors.education?.[index]?.institution?.message}
                  {...register(`education.${index}.institution`)}
                />
                <Input
                  label="Year"
                  type="number"
                  inputMode="numeric"
                  error={errors.education?.[index]?.year?.message}
                  {...register(`education.${index}.year`)}
                />
              </div>
            </div>
          ))}
          {educationArray.fields.length === 0 && (
            <p className="text-sm text-slate">No education added yet.</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          className="sm:w-auto sm:px-8"
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
}
