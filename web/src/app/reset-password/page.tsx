import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-svh bg-[var(--ink)]" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
