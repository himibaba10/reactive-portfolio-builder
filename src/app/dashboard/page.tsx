"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError, type Portfolio, type User } from "@/lib/api-client";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { AppChrome } from "@/components/app/app-chrome";
import {
  Field,
  FormError,
  FormInput,
  SubmitButton,
  useFormSubmit,
} from "@/components/ui/form";
import { SlugField } from "@/components/ui/slug-field";
import { PalettePicker } from "@/components/ui/palette-picker";
import {
  CUSTOM_PALETTE_ID,
  DEFAULT_CUSTOM_PALETTE,
} from "@/lib/palette";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [createTitle, setCreateTitle] = useState("");
  const [createSlug, setCreateSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [createPaletteId, setCreatePaletteId] = useState("signal");
  const [createCustomPalette, setCreateCustomPalette] = useState(
    () => ({ ...DEFAULT_CUSTOM_PALETTE }),
  );
  const [verifyUrl, setVerifyUrl] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("reactive_verify_url");
  });
  const [banner, setBanner] = useState<string | null>(null);

  function handleTitleChange(next: string) {
    setCreateTitle(next);
    if (!slugEdited) {
      setCreateSlug(normalizeSlug(next));
    }
  }

  function handleSlugChange(next: string) {
    setSlugEdited(true);
    setCreateSlug(next);
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const me = await api<{ user: User }>("/auth/me");
        if (cancelled) return;
        setUser(me.user);
        try {
          const mine = await api<{ portfolio: Portfolio }>("/portfolios/me");
          if (cancelled) return;
          setPortfolio(mine.portfolio);
        } catch (err) {
          if (err instanceof ApiError && err.status === 404) {
            if (!cancelled) setPortfolio(null);
          } else {
            throw err;
          }
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setBanner(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const createForm = useFormSubmit(async (_form) => {
    const slug = normalizeSlug(createSlug);
    if (!isValidSlug(slug)) {
      throw new Error("Slug must be lowercase, hyphenated, and not reserved.");
    }
    const title = createTitle.trim();
    if (!title) {
      throw new Error("Title is required.");
    }
    const result = await api<{ portfolio: Portfolio }>("/portfolios/me", {
      method: "POST",
      body: {
        title,
        slug,
        paletteId: createPaletteId || "signal",
        ...(createPaletteId === CUSTOM_PALETTE_ID
          ? { customPalette: createCustomPalette }
          : {}),
      },
    });
    setPortfolio(result.portfolio);
    router.push("/editor");
  });

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

  if (loading) {
    return (
      <AppChrome>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-28 rounded bg-panel" />
          <div className="h-10 w-64 rounded bg-panel" />
          <div className="h-40 rounded-2xl bg-panel" />
        </div>
      </AppChrome>
    );
  }

  if (!user && banner) {
    return (
      <AppChrome>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="font-display text-2xl">Couldn’t load dashboard</h1>
          <p className="mt-2 text-sm text-red-200">{banner}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-signal hover:underline"
          >
            Retry
          </button>
        </div>
      </AppChrome>
    );
  }

  return (
    <AppChrome email={user?.email}>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xs tracking-[0.2em] text-signal uppercase">
            {portfolio ? "Dashboard" : "Get started"}
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.04em]">
            {portfolio ? "Your portfolio" : "Create your portfolio"}
          </h1>
        </div>

        {banner ? (
          <p
            className={`rounded-xl border px-4 py-3 text-sm ${
              banner.toLowerCase().includes("fail") ||
              banner.toLowerCase().includes("error") ||
              banner.toLowerCase().includes("verify your email")
                ? "border-red-500/30 bg-red-500/10 text-red-100"
                : "border-line bg-panel"
            }`}
          >
            {banner}
          </p>
        ) : null}

        {user && !user.isEmailVerified ? (
          <div className="rounded-2xl border border-signal/30 bg-panel p-5">
            <p className="font-medium text-foam">Verify your email</p>
            <p className="mt-2 text-sm text-muted">
              Publishing requires a verified address.
            </p>
            {verifyUrl ? (
              <p className="mt-3 break-all text-sm text-signal">
                <Link href={verifyUrl}>{verifyUrl}</Link>
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => void resendVerification()}
              className="mt-4 text-sm text-signal hover:underline"
            >
              Resend verification
            </button>
          </div>
        ) : null}

        {portfolio ? (
          <div className="rounded-2xl border border-line bg-panel p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl tracking-[-0.03em]">
                  {portfolio.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  /{portfolio.slug} · {portfolio.status} · palette{" "}
                  {portfolio.paletteId}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Open editor
                </Link>
                {portfolio.status === "published" ? (
                  <>
                    <Link
                      href={`/${portfolio.slug}`}
                      className="rounded-full border border-line px-5 py-2.5 text-sm"
                    >
                      View live
                    </Link>
                    <button
                      type="button"
                      onClick={() => void unpublish()}
                      className="rounded-full border border-line px-5 py-2.5 text-sm"
                    >
                      Unpublish
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => void publish()}
                    className="rounded-full border border-line px-5 py-2.5 text-sm"
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
          <div className="rounded-2xl border border-line bg-panel p-6">
            <h2 className="font-display text-2xl tracking-[-0.03em]">
              Title, slug, palette
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Presets or your own five tokens. You can create exactly one portfolio.
            </p>
            <form
              onSubmit={createForm.onSubmit}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              {createForm.error ? (
                <div className="md:col-span-2">
                  <FormError message={createForm.error} />
                </div>
              ) : null}
              <Field label="Title">
                <FormInput
                  name="title"
                  required
                  maxLength={80}
                  value={createTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Daniel · Product designer"
                />
              </Field>
              <SlugField
                value={createSlug}
                onChange={handleSlugChange}
                required
                hint="Auto-filled from title — edit anytime"
              />
              <div className="flex w-full flex-col gap-2 text-left md:col-span-2">
                <span className="text-xs tracking-[0.18em] text-muted uppercase">
                  Palette
                </span>
                <PalettePicker
                  name="paletteId"
                  value={createPaletteId}
                  onChange={setCreatePaletteId}
                  customValue={createCustomPalette}
                  onCustomChange={setCreateCustomPalette}
                />
                <span className="text-xs text-muted">
                  Presets or Custom — always exactly five tokens
                </span>
              </div>
              <div className="md:col-span-2">
                <SubmitButton pending={createForm.pending}>
                  Create portfolio
                </SubmitButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </AppChrome>
  );
}
