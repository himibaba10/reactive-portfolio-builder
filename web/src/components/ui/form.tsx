"use client";

import { FormEvent, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-xs tracking-[0.18em] text-[var(--muted)] uppercase">
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

export function FormInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[color:var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--foam)] outline-none transition focus:border-[color:var(--signal)]",
        className,
      )}
      {...props}
    />
  );
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </p>
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: ReactNode;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[var(--signal)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--signal-soft)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Working…" : children}
    </button>
  );
}

export function useFormSubmit<T>(
  action: (form: HTMLFormElement) => Promise<T>,
  onSuccess?: (result: T) => void,
) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await action(event.currentTarget);
      onSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  return { error, pending, onSubmit, setError };
}
