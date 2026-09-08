"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError, type Portfolio, type User } from "@/lib/api-client";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { palettes } from "@/lib/landing-content";
import { AppChrome } from "@/components/app/app-chrome";
import {
  Field,
  FormError,
  FormInput,
  SubmitButton,
  useFormSubmit,
} from "@/components/ui/form";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const me = await api<{ user: User }>("/auth/me");
      setUser(me.user);
      try {
        const mine = await api<{ portfolio: Portfolio }>("/portfolios/me");
        setPortfolio(mine.portfolio);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          setPortfolio(null);
        } else {
          throw err;
        }
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.replace("/login");
        return;
      }
      setBanner(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("reactive_verify_url");
    if (stored) setVerifyUrl(stored);
    void load();
  }, []);

  const createForm = useFormSubmit(async (form) => {
    const data = new FormData(form);
    const slug = normalizeSlug(String(data.get("slug") || ""));
    if (!isValidSlug(slug)) {
      throw new Error("Slug must be lowercase, hyphenated, and not reserved.");
    }
    const result = await api<{ portfolio: Portfolio }>("/portfolios/me", {
      method: "POST",
      body: {
        title: String(data.get("title") || ""),
        slug,
        paletteId: String(data.get("paletteId") || "signal"),
      },
    });
    setPortfolio(result.portfolio);
    router.push("/editor");
  });

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function resendVerification() {
    const result = await api<{ verifyUrl?: string }>(
      "/auth/resend-verification",
      { method: "POST" },
    );
    if (result.verifyUrl) {
      setVerifyUrl(result.verifyUrl);
      sessionStorage.setItem("reactive_verify_url", result.verifyUrl);
    }
    setBanner("Verification link issued.");
  }

  async function publish() {
    try {
      const result = await api<{ portfolio: Portfolio }>(
        "/portfolios/me/publish",
        { method: "POST" },
      );
      setPortfolio(result.portfolio);
      setBanner("Published.");
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Publish failed");
    }
  }

  async function unpublish() {
    const result = await api<{ portfolio: Portfolio }>(
      "/portfolios/me/unpublish",
      { method: "POST" },
    );
    setPortfolio(result.portfolio);
    setBanner("Unpublished — back to draft.");
  }

  async function deletePortfolio() {
    if (!confirm("Delete this portfolio? This cannot be undone.")) return;
    await api("/portfolios/me", { method: "DELETE" });
    setPortfolio(null);
    setBanner("Portfolio deleted.");
  }

  async function deleteAccount() {
    if (
      !confirm(
        "Soft-delete your account? Your portfolio will be removed and you cannot log in.",
      )
    ) {
      return;
    }
    await api("/auth/account", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <AppChrome>
        <p className="text-[var(--muted)]">Loading…</p>
      </AppChrome>
    );
  }

  return (
    <AppChrome email={user?.email}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[var(--signal)] uppercase">
              Dashboard
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
              Your portfolio
            </h1>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-sm text-[var(--muted)] hover:text-[var(--foam)]"
          >
            Log out
          </button>
        </div>

        {banner ? (
          <p className="rounded-xl border border-[color:var(--line)] bg-[var(--panel)] px-4 py-3 text-sm">
            {banner}
          </p>
        ) : null}

        {user && !user.isEmailVerified ? (
          <div className="rounded-2xl border border-[color:var(--signal)]/30 bg-[var(--panel)] p-5">
            <p className="font-medium text-[var(--foam)]">Verify your email</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Publishing requires a verified address.
            </p>
            {verifyUrl ? (
              <p className="mt-3 break-all text-sm text-[var(--signal)]">
                <Link href={verifyUrl}>{verifyUrl}</Link>
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => void resendVerification()}
              className="mt-4 text-sm text-[var(--signal)] hover:underline"
            >
              Resend verification
            </button>
          </div>
        ) : null}

        {portfolio ? (
          <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--panel)] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
                  {portfolio.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  /{portfolio.slug} · {portfolio.status} · palette{" "}
                  {portfolio.paletteId}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="rounded-full bg-[var(--signal)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)]"
                >
                  Open editor
                </Link>
                {portfolio.status === "published" ? (
                  <>
                    <Link
                      href={`/${portfolio.slug}`}
                      className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm"
                    >
                      View live
                    </Link>
                    <button
                      type="button"
                      onClick={() => void unpublish()}
                      className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm"
                    >
                      Unpublish
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => void publish()}
                    className="rounded-full border border-[color:var(--line)] px-5 py-2.5 text-sm"
                  >
                    Publish
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => void deletePortfolio()}
                  className="rounded-full border border-red-500/40 px-5 py-2.5 text-sm text-red-200"
                >
                  Delete portfolio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--panel)] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em]">
              Create your one portfolio
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              Title, slug, and a five-token palette. You can only create one.
            </p>
            <form
              onSubmit={createForm.onSubmit}
              className="mt-6 grid max-w-xl gap-4"
            >
              <FormError message={createForm.error} />
              <Field label="Title">
                <FormInput
                  name="title"
                  required
                  maxLength={80}
                  placeholder="Daniel · Product designer"
                />
              </Field>
              <Field label="Slug" hint="yoursite.com/your-slug">
                <FormInput
                  name="slug"
                  required
                  placeholder="daniel-portfolio"
                />
              </Field>
              <Field label="Palette">
                <select
                  name="paletteId"
                  defaultValue="signal"
                  className="w-full rounded-xl border border-[color:var(--line)] bg-[var(--ink)] px-4 py-3"
                >
                  {palettes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </Field>
              <SubmitButton pending={createForm.pending}>
                Create portfolio
              </SubmitButton>
            </form>
          </div>
        )}

        <div className="border-t border-[color:var(--line)] pt-8">
          <button
            type="button"
            onClick={() => void deleteAccount()}
            className="text-sm text-red-300/80 hover:text-red-200"
          >
            Soft-delete account
          </button>
        </div>
      </div>
    </AppChrome>
  );
}
