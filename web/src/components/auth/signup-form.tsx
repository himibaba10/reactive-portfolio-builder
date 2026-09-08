"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { AuthShell } from "@/components/auth/auth-shell";
import {
  Field,
  FormError,
  FormInput,
  SubmitButton,
  useFormSubmit,
} from "@/components/ui/form";

export function SignupForm() {
  const router = useRouter();
  const { error, pending, onSubmit } = useFormSubmit(async (form) => {
    const data = new FormData(form);
    const result = await api<{ verifyUrl?: string }>("/auth/signup", {
      method: "POST",
      body: {
        email: String(data.get("email") || ""),
        password: String(data.get("password") || ""),
      },
    });
    if (result.verifyUrl) {
      sessionStorage.setItem("reactive_verify_url", result.verifyUrl);
    }
    router.push("/dashboard");
    router.refresh();
  });

  return (
    <AuthShell
      title="Create account"
      subtitle="Email and password. One portfolio per account."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label="Email">
          <FormInput
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@studio.com"
          />
        </Field>
        <Field label="Password" hint="At least 8 characters.">
          <FormInput
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
          />
        </Field>
        <SubmitButton pending={pending}>Sign up</SubmitButton>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already in?{" "}
        <Link href="/login" className="text-signal hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
