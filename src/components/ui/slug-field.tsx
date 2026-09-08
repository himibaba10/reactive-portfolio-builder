"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { FormInput } from "@/components/ui/form";

const DEBOUNCE_MS = 600;

type RemoteStatus = {
  slug: string;
  status: "checking" | "available" | "taken";
};

type LocalStatus = "idle" | "available" | "invalid";

type SlugFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
  hint?: string;
  excludeCurrent?: string;
};

export function SlugField({
  value,
  onChange,
  name = "slug",
  required,
  hint = "Lowercase, hyphenated. Reserved app routes blocked.",
  excludeCurrent,
}: SlugFieldProps) {
  const normalized = normalizeSlug(value);
  const localStatus: LocalStatus | null = !normalized
    ? "idle"
    : excludeCurrent && normalized === excludeCurrent
      ? "available"
      : !isValidSlug(normalized)
        ? "invalid"
        : null;

  const [remote, setRemote] = useState<RemoteStatus | null>(null);

  useEffect(() => {
    if (localStatus !== null) return;

    let cancelled = false;
    const handle = window.setTimeout(() => {
      void (async () => {
        setRemote({ slug: normalized, status: "checking" });
        try {
          const result = await api<{ available: boolean }>(
            `/portfolios/slug-available?slug=${encodeURIComponent(normalized)}`,
          );
          if (cancelled) return;
          setRemote({
            slug: normalized,
            status: result.available ? "available" : "taken",
          });
        } catch {
          if (!cancelled) {
            setRemote(null);
          }
        }
      })();
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [localStatus, normalized]);

  const remoteForCurrent =
    remote && remote.slug === normalized ? remote.status : null;
  const status = localStatus ?? remoteForCurrent ?? "idle";

  const message =
    status === "checking"
      ? "Checking…"
      : status === "available"
        ? `Available: /${normalized}`
        : status === "taken"
          ? "Slug already taken"
          : status === "invalid"
            ? "Invalid or reserved slug"
            : hint;

  const tone =
    status === "available"
      ? "text-signal"
      : status === "taken" || status === "invalid"
        ? "text-red-300"
        : "text-muted";

  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-xs tracking-[0.18em] text-muted uppercase">
        Slug
      </span>
      <FormInput
        name={name}
        value={value}
        required={required}
        placeholder="daniel-portfolio"
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      <span className={`text-xs ${tone}`}>{message}</span>
    </label>
  );
}
