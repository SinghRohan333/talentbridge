"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { cn, getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { registerFormSchema, RegisterFormValues } from "@/lib/validation/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleAuthButton } from "@/components/forms/GoogleAuthButton";
import { UserRole } from "@/types/auth";

const roleOptions: {
  value: "seeker" | "employer";
  label: string;
  hint: string;
}[] = [
  { value: "seeker", label: "Job Seeker", hint: "Find and apply to roles" },
  { value: "employer", label: "Employer", hint: "Post jobs and hire" },
];

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { role: "seeker" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      toast.success("Account created");
      router.push("/");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not create account"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-6 shadow-sm sm:p-8">
      <div className="mb-5 grid grid-cols-2 gap-2">
        {roleOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              setValue("role", opt.value, { shouldValidate: true })
            }
            className={cn(
              "rounded-lg border px-3 py-2.5 text-left transition-colors",
              selectedRole === opt.value
                ? "border-signal bg-signal/5"
                : "border-line hover:border-slate",
            )}
          >
            <span className="block text-sm font-medium text-ink">
              {opt.label}
            </span>
            <span className="block text-xs text-slate">{opt.hint}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <Input
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Create account
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="text-xs uppercase tracking-wide text-slate">or</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <GoogleAuthButton role={selectedRole} />
    </div>
  );
}
