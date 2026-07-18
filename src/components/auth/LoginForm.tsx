"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import { loginFormSchema, LoginFormValues } from "@/lib/validation/auth";
import { DEMO_SEEKER, DEMO_EMPLOYER } from "@/lib/constants";
import { getErrorMessage } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleAuthButton } from "@/components/forms/GoogleAuthButton";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast.success("Welcome back");
      router.push("/");
    } catch (err) {
      toast.error(getErrorMessage(err, "Invalid email or password"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemo = (demo: { email: string; password: string }) => {
    setValue("email", demo.email, { shouldValidate: true });
    setValue("password", demo.password, { shouldValidate: true });
  };

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-6 shadow-sm sm:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" isLoading={isSubmitting} fullWidth>
          Log in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="text-xs uppercase tracking-wide text-slate">or</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <GoogleAuthButton />

      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => fillDemo(DEMO_SEEKER)}
        >
          Fill Job Seeker demo
        </Button>
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => fillDemo(DEMO_EMPLOYER)}
        >
          Fill Employer demo
        </Button>
      </div>
    </div>
  );
}
