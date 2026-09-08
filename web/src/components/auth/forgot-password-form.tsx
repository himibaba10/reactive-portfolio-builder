"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api-client";
import { AuthShell } from "@/components/auth/auth-shell";
import {
  Field,
  FormError,
  FormInput,
  SubmitButton,
  useFormSubmit,
} from "@/components/ui/form";

export function ForgotPasswordForm() {
  const [done, setDone] = useState(false);
  const [devUrl, setDevUrl] = useState<string | null>(null);
  const { error, pending, onSubmit } = useFormSubmit(async (form) => {
    const data = new FormData(form);
    const result = await api<{ ok: boolean; resetUrl?: string }>(
      "/auth/forgot-password",
      {
        method: "POST",
        body: { email: String(data.get("email") || "") },
      },
    );
    setDone(true);
    setDevUrl(result.resetUrl || null);
  });

  return (
    <AuthShell
      title="Reset password"
      subtitle="We’ll send a reset link if that email exists."
    >
      {done ? (
        <div className="space-y-4 text-sm text-[var(--muted)]">
          <p>If an account exists, a reset link was issued.</p>
          {devUrl ? (
            <p className="break-all rounded-xl border border-[color:var(--line)] bg-[var(--panel)] p-3 text-[var(--signal)]">
              Dev link: <Link href={devUrl}>{devUrl}</Link>
            </p>
          ) : (
            <p>Check the server console for the link in local development.</p>
          )}
          <Link href="/login" className="text-[var(--signal)] hover:underline">
            Back to login
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormError message={error} />
          <Field label="Email">
            <FormInput name="email" type="email" required autoComplete="email" />
          </Field>
          <SubmitButton pending={pending}>Send reset link</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
