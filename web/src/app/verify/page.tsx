import { Suspense } from "react";
import { VerifyEmailClient } from "@/components/auth/verify-email-client";

export default function VerifyPage() {
  return (
    <Suspense fallback={<main className="min-h-svh bg-[var(--ink)]" />}>
      <VerifyEmailClient />
    </Suspense>
  );
}
