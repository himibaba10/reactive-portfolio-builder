"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { AuthShell } from "@/components/auth/auth-shell";
import {
  Field,
  FormError,
  FormInput,
  SubmitButton,
  useFormSubmit,
} from "@/components/ui/form";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const { error, pending, onSubmit } = useFormSubmit(async (form) => {
    const data = new FormData(form);
    await api("/auth/reset-password", {
      method: "POST",
      body: {
        token,
        password: String(data.get("password") || ""),
      },
    });
    router.push("/dashboard");
    router.refresh();
  });

  if (!token) {
    return (
      <AuthShell
        title="Invalid link"
        subtitle="This reset link is missing a token."
      >
        <Link
          href="/forgot-password"
          className="text-[var(--signal)] hover:underline"
        >
          Request a new one
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Choose a new password">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label="New password">
          <FormInput
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        <SubmitButton pending={pending}>Update password</SubmitButton>
      </form>
    </AuthShell>
  );
}
