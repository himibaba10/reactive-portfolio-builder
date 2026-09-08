"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  api,
  ApiError,
  type Portfolio,
  type PortfolioSection,
  type SectionType,
  type User,
} from "@/lib/api-client";
import {
  clampSectionVariant,
  defaultSectionData,
  isPinnedSectionType,
  isVariantSectionType,
  SECTION_LABELS,
  SECTION_TYPES,
  sectionVariantCount,
} from "@/lib/sections";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { AppChrome } from "@/components/app/app-chrome";
import {
  Field,
  FormError,
  FormInput,
  FormTextarea,
} from "@/components/ui/form";
import { SlugField } from "@/components/ui/slug-field";
import { PalettePicker } from "@/components/ui/palette-picker";
import { ImageField } from "@/components/ui/image-field";
import { HeroLayoutPicker } from "@/components/editor/hero-layout-picker";
import { AboutLayoutPicker } from "@/components/editor/about-layout-picker";
import { SkillsLayoutPicker } from "@/components/editor/skills-layout-picker";
import { ProjectsLayoutPicker } from "@/components/editor/projects-layout-picker";
import { CtaLayoutPicker } from "@/components/editor/cta-layout-picker";
import { ExperienceLayoutPicker } from "@/components/editor/experience-layout-picker";

function normalizeSections(sections: PortfolioSection[]): PortfolioSection[] {
  return [...sections]
    .map((s) => ({
      ...s,
      variant: clampSectionVariant(s.type, s.variant),
      data: s.data || {},
    }))
    .sort((a, b) => a.order - b.order);
}

export function EditorClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [sections, setSections] = useState<PortfolioSection[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [paletteId, setPaletteId] = useState("signal");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await api<{ user: User }>("/auth/me");
        setUser(me.user);
        const mine = await api<{ portfolio: Portfolio }>("/portfolios/me");
        setPortfolio(mine.portfolio);
        setTitle(mine.portfolio.title);
        setSlug(mine.portfolio.slug);
        setPaletteId(mine.portfolio.paletteId);
        const sorted = normalizeSections(mine.portfolio.sections);
        setSections(sorted);
        setActiveId(sorted[0]?.id ?? null);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        if (err instanceof ApiError && err.status === 404) {
          router.replace("/dashboard");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load editor");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const active = sections.find((s) => s.id === activeId) || null;
  const missingTypes = SECTION_TYPES.filter(
    (t) => !sections.some((s) => s.type === t),
  );

  function updateActiveData(next: Record<string, unknown>) {
    if (!active) return;
    setSections((prev) =>
      prev.map((s) => (s.id === active.id ? { ...s, data: next } : s)),
    );
  }

  function setVariant(id: string, variant: number) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, variant: clampSectionVariant(s.type, variant) }
          : s,
      ),
    );
  }

  function move(id: string, dir: -1 | 1) {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((s) => s.id === id);
      const swap = idx + dir;
      if (idx < 0 || swap < 0 || swap >= sorted.length) return prev;
      const current = sorted[idx];
      const neighbor = sorted[swap];
      if (
        isPinnedSectionType(current.type) ||
        isPinnedSectionType(neighbor.type)
      ) {
        return prev;
      }
      const copy = [...sorted];
      [copy[idx], copy[swap]] = [copy[swap], copy[idx]];
      return copy.map((s, order) => ({ ...s, order }));
    });
  }

  function toggleVisible(id: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    );
  }

  function addSection(type: SectionType) {
    if (sections.some((s) => s.type === type)) return;
    const section: PortfolioSection = {
      id: crypto.randomUUID(),
      type,
      order: sections.length,
      visible: true,
      variant: 1,
      data: defaultSectionData(type),
    };
    setSections((prev) => [...prev, section]);
    setActiveId(section.id);
  }

  function removeSection(id: string) {
    setSections((prev) => {
      const next = prev
        .filter((s) => s.id !== id)
        .map((s, order) => ({ ...s, order }));
      if (activeId === id) setActiveId(next[0]?.id ?? null);
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const normalized = normalizeSlug(slug);
      if (!isValidSlug(normalized)) {
        throw new Error("Invalid or reserved slug.");
      }
      const result = await api<{ portfolio: Portfolio }>("/portfolios/me", {
        method: "PATCH",
        body: {
          title,
          slug: normalized,
          paletteId,
          sections: sections.map((s, order) => ({
            ...s,
            order,
            variant: clampSectionVariant(s.type, s.variant),
          })),
        },
      });
      setPortfolio(result.portfolio);
      setSlug(result.portfolio.slug);
      setSections(normalizeSections(result.portfolio.sections));
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    await save();
    try {
      const result = await api<{ portfolio: Portfolio }>(
        "/portfolios/me/publish",
        { method: "POST" },
      );
      setPortfolio(result.portfolio);
      setMessage("Published.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
    }
  }

  if (loading) {
    return (
      <AppChrome>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-panel" />
          <div className="h-10 w-48 rounded bg-panel" />
          <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="h-64 rounded-2xl bg-panel" />
            <div className="h-64 rounded-2xl bg-panel" />
          </div>
        </div>
      </AppChrome>
    );
  }

  if (error && !portfolio) {
    return (
      <AppChrome>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="font-display text-2xl">Editor unavailable</h1>
          <p className="mt-2 text-sm text-red-200">{error}</p>
          <Link href="/dashboard" className="mt-4 inline-block text-signal">
            Back to dashboard
          </Link>
        </div>
      </AppChrome>
    );
  }

  return (
    <AppChrome email={user?.email}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-signal uppercase">
              Editor
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-[-0.04em]">
              Compose
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => void publish()}
              className="rounded-full border border-line px-5 py-2.5 text-sm"
            >
              Publish
            </button>
            {portfolio?.status === "published" ? (
              <Link
                href={`/${portfolio.slug}`}
                className="rounded-full border border-line px-5 py-2.5 text-sm"
              >
                View live
              </Link>
            ) : null}
          </div>
        </div>

        <FormError message={error} />
        {message ? <p className="text-sm text-signal">{message}</p> : null}

        <div className="grid gap-4 rounded-2xl border border-line bg-panel p-5 md:grid-cols-3">
          <Field label="Title">
            <FormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <SlugField
            value={slug}
            onChange={setSlug}
            excludeCurrent={portfolio?.slug}
          />
          <div className="flex w-full flex-col gap-2 text-left md:col-span-3">
            <span className="text-xs tracking-[0.18em] text-muted uppercase">
              Palette
            </span>
            <PalettePicker value={paletteId} onChange={setPaletteId} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-line bg-panel p-4">
            <p className="mb-3 text-xs tracking-[0.18em] text-muted uppercase">
              Sections
            </p>
            <ul className="flex flex-col gap-2">
              {[...sections]
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                  const pinned = isPinnedSectionType(section.type);
                  return (
                    <li key={section.id}>
                      <div
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
                          activeId === section.id
                            ? "bg-ink text-foam"
                            : "text-muted"
                        }`}
                      >
                        <button
                          type="button"
                          className="flex-1 text-left"
                          onClick={() => setActiveId(section.id)}
                        >
                          {SECTION_LABELS[section.type]}
                          {!section.visible ? " · hidden" : ""}
                        </button>
                        {!pinned ? (
                          <span className="flex gap-1 text-xs">
                            <button
                              type="button"
                              onClick={() => move(section.id, -1)}
                              className="px-1"
                              aria-label="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => move(section.id, 1)}
                              className="px-1"
                              aria-label="Move down"
                            >
                              ↓
                            </button>
                          </span>
                        ) : (
                          <span className="text-[10px] tracking-wide text-muted uppercase">
                            pinned
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
            {missingTypes.length ? (
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-xs text-muted">Add section</p>
                <div className="flex flex-wrap gap-2">
                  {missingTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addSection(type)}
                      className="rounded-full border border-line px-3 py-1 text-xs"
                    >
                      {SECTION_LABELS[type]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <section className="rounded-2xl border border-line bg-panel p-5">
            {!active ? (
              <p className="text-muted">Select a section.</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl">
                    {SECTION_LABELS[active.type]}
                  </h2>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => toggleVisible(active.id)}
                      className="text-sm text-muted hover:text-foam"
                    >
                      {active.visible ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(active.id)}
                      className="text-sm text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {active.type === "Hero" ? (
                  <HeroLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : active.type === "About" ? (
                  <AboutLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : active.type === "Skills" ? (
                  <SkillsLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : active.type === "Projects" ? (
                  <ProjectsLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : active.type === "CTA" ? (
                  <CtaLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : active.type === "Experience" ? (
                  <ExperienceLayoutPicker
                    section={active}
                    paletteId={paletteId}
                    portfolioTitle={title || "Portfolio"}
                    portfolioSlug={slug || "your-slug"}
                    value={active.variant}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : isVariantSectionType(active.type) ? (
                  <LayoutPicker
                    value={active.variant}
                    count={sectionVariantCount(active.type)}
                    onChange={(v) => setVariant(active.id, v)}
                  />
                ) : null}
                <SectionFields section={active} onChange={updateActiveData} />
              </div>
            )}
          </section>
        </div>
      </div>
    </AppChrome>
  );
}

function LayoutPicker({
  value,
  count,
  onChange,
}: {
  value: number;
  count: number;
  onChange: (variant: number) => void;
}) {
  const options = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <Field label="Layout">
      <div
        className={`grid gap-2 ${count > 5 ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-5"}`}
      >
        {options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex aspect-4/3 flex-col items-center justify-center gap-1 rounded-xl border text-xs transition ${
              value === n
                ? "border-signal bg-ink text-foam"
                : "border-line text-muted hover:border-foam/40"
            }`}
            aria-pressed={value === n}
            aria-label={`Layout ${n}`}
          >
            <LayoutThumb variant={n} />
            <span>{n}</span>
          </button>
        ))}
      </div>
    </Field>
  );
}

function LayoutThumb({ variant }: { variant: number }) {
  if (variant === 2) {
    return (
      <span aria-hidden className="flex h-6 w-8 gap-0.5 opacity-70">
        <span className="flex flex-1 flex-col justify-end gap-0.5">
          <span className="h-1 w-full rounded-sm bg-current" />
          <span className="h-1 w-2/3 rounded-sm bg-current opacity-50" />
        </span>
        <span className="w-2.5 rounded-sm bg-current opacity-40" />
      </span>
    );
  }
  if (variant === 3) {
    return (
      <span
        aria-hidden
        className="flex h-6 w-8 items-end rounded-sm border border-current/40 p-0.5 opacity-70"
      >
        <span className="h-1 w-full rounded-sm bg-current" />
      </span>
    );
  }
  if (variant === 4) {
    return (
      <span
        aria-hidden
        className="flex h-6 w-8 flex-col items-center justify-center gap-0.5 opacity-70"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span className="h-1 w-full rounded-sm bg-current" />
        <span className="h-1 w-1/2 rounded-sm bg-current opacity-50" />
      </span>
    );
  }
  if (variant === 5) {
    return (
      <span aria-hidden className="flex h-6 w-8 gap-0.5 opacity-70">
        <span className="flex flex-1 flex-col gap-0.5">
          <span className="h-1 w-full rounded-sm bg-current" />
          <span className="h-1 w-3/4 rounded-sm bg-current opacity-50" />
          <span className="h-1 w-1/2 rounded-sm bg-current opacity-30" />
        </span>
        <span className="mt-1 h-4 w-2.5 rounded-sm bg-current opacity-35" />
      </span>
    );
  }
  if (variant === 6) {
    return (
      <span aria-hidden className="flex h-6 w-8 flex-col gap-0.5 opacity-70">
        <span className="flex items-start justify-between gap-0.5">
          <span className="h-2 w-4 rounded-sm bg-current" />
          <span className="h-3 w-2 rounded-sm bg-current opacity-40" />
        </span>
        <span className="h-1 w-full rounded-sm bg-current opacity-50" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-6 w-8 flex-col items-start gap-0.5 opacity-70"
    >
      <span className="h-1 w-full rounded-sm bg-current" />
      <span className="h-1 w-2/3 rounded-sm bg-current opacity-60" />
      <span className="h-1 w-1/2 rounded-sm bg-current opacity-40" />
    </span>
  );
}

function OptionalField({
  label,
  enabled,
  onEnabledChange,
  children,
}: {
  label: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2.5 text-sm text-foam">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="size-3.5 shrink-0 accent-[var(--signal,#d6ff3f)]"
        />
        <span>{label}</span>
      </label>
      <div className={enabled ? undefined : "pointer-events-none opacity-40"}>
        {children}
      </div>
    </div>
  );
}

function SectionFields({
  section,
  onChange,
}: {
  section: PortfolioSection;
  onChange: (data: Record<string, unknown>) => void;
}) {
  const data = section.data;

  if (section.type === "Header") {
    return (
      <>
        <ImageField
          label="Logo"
          valueUrl={String(data.logoUrl || "")}
          valuePublicId={String(data.logoPublicId || "")}
          onChange={(img) =>
            onChange({
              ...data,
              logoUrl: img?.url || "",
              logoPublicId: img?.publicId || "",
            })
          }
        />
        <p className="text-xs text-muted">
          Logo on the left. Visible section names link on the right automatically.
        </p>
      </>
    );
  }

  if (section.type === "Hero") {
    const showName = data.showName !== false;
    const showTagline = data.showTagline !== false;
    const showDescription = data.showDescription !== false;
    const showImage = data.showImage !== false;
    const showCtaLabel = data.showCtaLabel !== false;
    const showCtaHref = data.showCtaHref !== false;

    return (
      <>
        <OptionalField
          label="Photo"
          enabled={showImage}
          onEnabledChange={(v) => onChange({ ...data, showImage: v })}
        >
          <ImageField
            label=""
            valueUrl={String(data.imageUrl || "")}
            valuePublicId={String(data.imagePublicId || "")}
            onChange={(img) =>
              onChange({
                ...data,
                imageUrl: img?.url || "",
                imagePublicId: img?.publicId || "",
              })
            }
          />
          <div className="mt-3">
            <Field label="Image alt">
              <FormInput
                value={String(data.imageAlt || "")}
                onChange={(e) =>
                  onChange({ ...data, imageAlt: e.target.value })
                }
                disabled={!showImage}
              />
            </Field>
          </div>
        </OptionalField>
        <OptionalField
          label="Name"
          enabled={showName}
          onEnabledChange={(v) => onChange({ ...data, showName: v })}
        >
          <FormInput
            value={String(data.name || "")}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            disabled={!showName}
          />
        </OptionalField>
        <OptionalField
          label="Tagline"
          enabled={showTagline}
          onEnabledChange={(v) => onChange({ ...data, showTagline: v })}
        >
          <FormInput
            value={String(data.tagline || "")}
            onChange={(e) => onChange({ ...data, tagline: e.target.value })}
            disabled={!showTagline}
          />
        </OptionalField>
        <OptionalField
          label="Description"
          enabled={showDescription}
          onEnabledChange={(v) => onChange({ ...data, showDescription: v })}
        >
          <FormTextarea
            value={String(data.description || "")}
            onChange={(e) =>
              onChange({ ...data, description: e.target.value })
            }
            disabled={!showDescription}
            placeholder="A short paragraph under the tagline"
          />
        </OptionalField>
        <OptionalField
          label="CTA label"
          enabled={showCtaLabel}
          onEnabledChange={(v) => onChange({ ...data, showCtaLabel: v })}
        >
          <FormInput
            value={String(data.ctaLabel || "")}
            onChange={(e) => onChange({ ...data, ctaLabel: e.target.value })}
            disabled={!showCtaLabel}
          />
        </OptionalField>
        <OptionalField
          label="CTA href"
          enabled={showCtaHref}
          onEnabledChange={(v) => onChange({ ...data, showCtaHref: v })}
        >
          <FormInput
            value={String(data.ctaHref || "")}
            onChange={(e) => onChange({ ...data, ctaHref: e.target.value })}
            disabled={!showCtaHref}
            placeholder="#projects"
          />
        </OptionalField>
      </>
    );
  }

  if (section.type === "About") {
    const showEyebrow = data.showEyebrow !== false;
    const showHeadline = data.showHeadline !== false;
    const showBody = data.showBody !== false;
    const showImage = data.showImage !== false;

    return (
      <>
        <OptionalField
          label="Portrait"
          enabled={showImage}
          onEnabledChange={(v) => onChange({ ...data, showImage: v })}
        >
          <ImageField
            label=""
            valueUrl={String(data.imageUrl || "")}
            valuePublicId={String(data.imagePublicId || "")}
            onChange={(img) =>
              onChange({
                ...data,
                imageUrl: img?.url || "",
                imagePublicId: img?.publicId || "",
              })
            }
          />
          <div className="mt-3">
            <Field label="Image alt">
              <FormInput
                value={String(data.imageAlt || "")}
                onChange={(e) =>
                  onChange({ ...data, imageAlt: e.target.value })
                }
                disabled={!showImage}
              />
            </Field>
          </div>
        </OptionalField>
        <OptionalField
          label="Eyebrow"
          enabled={showEyebrow}
          onEnabledChange={(v) => onChange({ ...data, showEyebrow: v })}
        >
          <FormInput
            value={String(data.eyebrow || "")}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            disabled={!showEyebrow}
            placeholder="About"
          />
        </OptionalField>
        <OptionalField
          label="Headline"
          enabled={showHeadline}
          onEnabledChange={(v) => onChange({ ...data, showHeadline: v })}
        >
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
            disabled={!showHeadline}
          />
        </OptionalField>
        <OptionalField
          label="Bio"
          enabled={showBody}
          onEnabledChange={(v) => onChange({ ...data, showBody: v })}
        >
          <FormTextarea
            value={String(data.body || "")}
            onChange={(e) => onChange({ ...data, body: e.target.value })}
            disabled={!showBody}
          />
        </OptionalField>
      </>
    );
  }

  if (section.type === "Skills") {
    const items = Array.isArray(data.items) ? (data.items as string[]) : [];
    const showEyebrow = data.showEyebrow !== false;
    const showHeadline = data.showHeadline !== false;
    const showItems = data.showItems !== false;

    return (
      <>
        <OptionalField
          label="Eyebrow"
          enabled={showEyebrow}
          onEnabledChange={(v) => onChange({ ...data, showEyebrow: v })}
        >
          <FormInput
            value={String(data.eyebrow || "")}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            disabled={!showEyebrow}
            placeholder="Skills"
          />
        </OptionalField>
        <OptionalField
          label="Headline"
          enabled={showHeadline}
          onEnabledChange={(v) => onChange({ ...data, showHeadline: v })}
        >
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
            disabled={!showHeadline}
          />
        </OptionalField>
        <OptionalField
          label="Skills"
          enabled={showItems}
          onEnabledChange={(v) => onChange({ ...data, showItems: v })}
        >
          <FormInput
            value={items.join(", ")}
            onChange={(e) =>
              onChange({
                ...data,
                items: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            disabled={!showItems}
            placeholder="React, Design systems, Product"
          />
          <p className="mt-1 text-xs text-muted">Comma-separated</p>
        </OptionalField>
      </>
    );
  }

  if (section.type === "CTA") {
    const showHeadline = data.showHeadline !== false;
    const showBody = data.showBody !== false;
    const showImage = data.showImage !== false;
    const showCtaLabel = data.showCtaLabel !== false;
    const showCtaHref = data.showCtaHref !== false;

    return (
      <>
        <OptionalField
          label="Image"
          enabled={showImage}
          onEnabledChange={(v) => onChange({ ...data, showImage: v })}
        >
          <ImageField
            label=""
            valueUrl={String(data.imageUrl || "")}
            valuePublicId={String(data.imagePublicId || "")}
            onChange={(img) =>
              onChange({
                ...data,
                imageUrl: img?.url || "",
                imagePublicId: img?.publicId || "",
              })
            }
          />
        </OptionalField>
        <OptionalField
          label="Headline"
          enabled={showHeadline}
          onEnabledChange={(v) => onChange({ ...data, showHeadline: v })}
        >
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
            disabled={!showHeadline}
          />
        </OptionalField>
        <OptionalField
          label="Body"
          enabled={showBody}
          onEnabledChange={(v) => onChange({ ...data, showBody: v })}
        >
          <FormTextarea
            value={String(data.body || "")}
            onChange={(e) => onChange({ ...data, body: e.target.value })}
            disabled={!showBody}
          />
        </OptionalField>
        <OptionalField
          label="CTA label"
          enabled={showCtaLabel}
          onEnabledChange={(v) => onChange({ ...data, showCtaLabel: v })}
        >
          <FormInput
            value={String(data.ctaLabel || "")}
            onChange={(e) => onChange({ ...data, ctaLabel: e.target.value })}
            disabled={!showCtaLabel}
          />
        </OptionalField>
        <OptionalField
          label="CTA href"
          enabled={showCtaHref}
          onEnabledChange={(v) => onChange({ ...data, showCtaHref: v })}
        >
          <FormInput
            value={String(data.ctaHref || "")}
            onChange={(e) => onChange({ ...data, ctaHref: e.target.value })}
            disabled={!showCtaHref}
            placeholder="#contact"
          />
        </OptionalField>
      </>
    );
  }

  if (section.type === "Footer") {
    return (
      <p className="text-sm text-muted">
        Footer is fixed: centered copyright with your portfolio title. Toggle
        visibility in the sidebar if you want it hidden.
      </p>
    );
  }

  if (section.type === "Contact") {
    const socials = (data.socials || {}) as Record<string, string>;
    return (
      <>
        <ImageField
          label="Avatar"
          valueUrl={String(data.imageUrl || "")}
          valuePublicId={String(data.imagePublicId || "")}
          onChange={(img) =>
            onChange({
              ...data,
              imageUrl: img?.url || "",
              imagePublicId: img?.publicId || "",
            })
          }
        />
        <Field label="Email">
          <FormInput
            value={String(data.email || "")}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </Field>
        {(["github", "linkedin", "twitter", "website"] as const).map((key) => (
          <Field key={key} label={key}>
            <FormInput
              value={socials[key] || ""}
              onChange={(e) =>
                onChange({
                  ...data,
                  socials: { ...socials, [key]: e.target.value },
                })
              }
            />
          </Field>
        ))}
      </>
    );
  }

  if (section.type === "Projects") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    const showEyebrow = data.showEyebrow !== false;
    const showHeadline = data.showHeadline !== false;
    const showImages = data.showImages !== false;
    const showDescriptions = data.showDescriptions !== false;
    const showLinks = data.showLinks !== false;

    return (
      <div className="flex flex-col gap-4">
        <OptionalField
          label="Eyebrow"
          enabled={showEyebrow}
          onEnabledChange={(v) => onChange({ ...data, showEyebrow: v })}
        >
          <FormInput
            value={String(data.eyebrow || "")}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            disabled={!showEyebrow}
            placeholder="Portfolio"
          />
        </OptionalField>
        <OptionalField
          label="Headline"
          enabled={showHeadline}
          onEnabledChange={(v) => onChange({ ...data, showHeadline: v })}
        >
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
            disabled={!showHeadline}
          />
        </OptionalField>
        <OptionalField
          label="Show covers"
          enabled={showImages}
          onEnabledChange={(v) => onChange({ ...data, showImages: v })}
        >
          <p className="text-xs text-muted">
            Project cover images on the public page.
          </p>
        </OptionalField>
        <OptionalField
          label="Show descriptions"
          enabled={showDescriptions}
          onEnabledChange={(v) => onChange({ ...data, showDescriptions: v })}
        >
          <p className="text-xs text-muted">
            One-line outcomes under each project title.
          </p>
        </OptionalField>
        <OptionalField
          label="Show links"
          enabled={showLinks}
          onEnabledChange={(v) => onChange({ ...data, showLinks: v })}
        >
          <p className="text-xs text-muted">Visit / open project links.</p>
        </OptionalField>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 rounded-xl border border-line p-4">
            <ImageField
              label="Cover"
              valueUrl={String(item.imageUrl || "")}
              valuePublicId={String(item.imagePublicId || "")}
              onChange={(img) => {
                const next = [...items];
                next[index] = {
                  ...item,
                  imageUrl: img?.url || "",
                  imagePublicId: img?.publicId || "",
                };
                onChange({ ...data, items: next });
              }}
            />
            <Field label="Title">
              <FormInput
                value={String(item.title || "")}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, title: e.target.value };
                  onChange({ ...data, items: next });
                }}
              />
            </Field>
            <Field label="Description">
              <FormInput
                value={String(item.description || "")}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, description: e.target.value };
                  onChange({ ...data, items: next });
                }}
              />
            </Field>
            <Field label="URL">
              <FormInput
                value={String(item.url || "")}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...item, url: e.target.value };
                  onChange({ ...data, items: next });
                }}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-signal"
          onClick={() =>
            onChange({
              ...data,
              items: [
                ...items,
                {
                  title: "New project",
                  description: "",
                  url: "",
                  tags: [],
                  imageUrl: "",
                  imagePublicId: "",
                },
              ],
            })
          }
        >
          Add project
        </button>
      </div>
    );
  }

  if (section.type === "Experience") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    const showEyebrow = data.showEyebrow !== false;
    const showHeadline = data.showHeadline !== false;
    const showImages = data.showImages !== false;
    const showPeriod = data.showPeriod !== false;
    const showDescription = data.showDescription !== false;

    return (
      <div className="flex flex-col gap-4">
        <OptionalField
          label="Eyebrow"
          enabled={showEyebrow}
          onEnabledChange={(v) => onChange({ ...data, showEyebrow: v })}
        >
          <FormInput
            value={String(data.eyebrow || "")}
            onChange={(e) => onChange({ ...data, eyebrow: e.target.value })}
            disabled={!showEyebrow}
            placeholder="Experience"
          />
        </OptionalField>
        <OptionalField
          label="Headline"
          enabled={showHeadline}
          onEnabledChange={(v) => onChange({ ...data, showHeadline: v })}
        >
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
            disabled={!showHeadline}
          />
        </OptionalField>
        <OptionalField
          label="Show company marks"
          enabled={showImages}
          onEnabledChange={(v) => onChange({ ...data, showImages: v })}
        >
          <p className="text-xs text-muted">Logos next to each role.</p>
        </OptionalField>
        <OptionalField
          label="Show periods"
          enabled={showPeriod}
          onEnabledChange={(v) => onChange({ ...data, showPeriod: v })}
        >
          <p className="text-xs text-muted">Date ranges on each role.</p>
        </OptionalField>
        <OptionalField
          label="Show descriptions"
          enabled={showDescription}
          onEnabledChange={(v) => onChange({ ...data, showDescription: v })}
        >
          <p className="text-xs text-muted">What you shipped under each role.</p>
        </OptionalField>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-xl border border-line p-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <ImageField
                label="Company mark"
                valueUrl={String(item.imageUrl || "")}
                valuePublicId={String(item.imagePublicId || "")}
                onChange={(img) => {
                  const next = [...items];
                  next[index] = {
                    ...item,
                    imageUrl: img?.url || "",
                    imagePublicId: img?.publicId || "",
                  };
                  onChange({ ...data, items: next });
                }}
              />
            </div>
            {(["role", "company", "period", "description"] as const).map(
              (key) => (
                <Field key={key} label={key}>
                  <FormInput
                    value={String(item[key] || "")}
                    onChange={(e) => {
                      const next = [...items];
                      next[index] = { ...item, [key]: e.target.value };
                      onChange({ ...data, items: next });
                    }}
                  />
                </Field>
              ),
            )}
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-signal"
          onClick={() =>
            onChange({
              ...data,
              items: [
                ...items,
                {
                  role: "Role",
                  company: "Company",
                  period: "",
                  description: "",
                  imageUrl: "",
                  imagePublicId: "",
                },
              ],
            })
          }
        >
          Add role
        </button>
      </div>
    );
  }

  if (section.type === "Education") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-xl border border-line p-4 md:grid-cols-3"
          >
            <div className="md:col-span-3">
              <ImageField
                label="School mark"
                valueUrl={String(item.imageUrl || "")}
                valuePublicId={String(item.imagePublicId || "")}
                onChange={(img) => {
                  const next = [...items];
                  next[index] = {
                    ...item,
                    imageUrl: img?.url || "",
                    imagePublicId: img?.publicId || "",
                  };
                  onChange({ ...data, items: next });
                }}
              />
            </div>
            {(["school", "degree", "period"] as const).map((key) => (
              <Field key={key} label={key}>
                <FormInput
                  value={String(item[key] || "")}
                  onChange={(e) => {
                    const next = [...items];
                    next[index] = { ...item, [key]: e.target.value };
                    onChange({ ...data, items: next });
                  }}
                />
              </Field>
            ))}
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-signal"
          onClick={() =>
            onChange({
              ...data,
              items: [
                ...items,
                {
                  school: "School",
                  degree: "Degree",
                  period: "",
                  imageUrl: "",
                  imagePublicId: "",
                },
              ],
            })
          }
        >
          Add school
        </button>
      </div>
    );
  }

  return null;
}
