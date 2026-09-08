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

export function LoginForm() {
  const router = useRouter();
  const { error, pending, onSubmit } = useFormSubmit(async (form) => {
    const data = new FormData(form);
    await api("/auth/login", {
      method: "POST",
      body: {
        email: String(data.get("email") || ""),
        password: String(data.get("password") || ""),
      },
    });
    router.push("/dashboard");
    router.refresh();
  });

  return (
    <AuthShell title="Welcome back" subtitle="Log in to compose and publish.">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormError message={error} />
        <Field label="Email">
          <FormInput name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Password">
          <FormInput
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
          />
        </Field>
        <SubmitButton pending={pending}>Log in</SubmitButton>
      </form>
      <p className="mt-6 text-sm text-muted">
        <Link
          href="/forgot-password"
          className="text-signal hover:underline"
        >
          Forgot password
        </Link>
        {" · "}
        <Link href="/signup" className="text-signal hover:underline">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
