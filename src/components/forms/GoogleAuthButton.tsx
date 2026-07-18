"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import { UserRole } from "@/types/auth";
import { getErrorMessage } from "@/lib/utils";

export function GoogleAuthButton({ role }: { role?: UserRole }) {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (!credentialResponse.credential) {
            toast.error("Google sign-in did not return a credential");
            return;
          }
          try {
            await loginWithGoogle(credentialResponse.credential, role);
            toast.success("Signed in with Google");
            router.push("/");
          } catch (err) {
            toast.error(getErrorMessage(err, "Google sign-in failed"));
          }
        }}
        onError={() => toast.error("Google sign-in failed. Please try again.")}
      />
    </div>
  );
}
