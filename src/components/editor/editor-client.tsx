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
                {isVariantSectionType(active.type) ? (
                  <LayoutPicker
                    value={active.variant}
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
  onChange,
}: {
  value: number;
  onChange: (variant: number) => void;
}) {
  return (
    <Field label="Layout">
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
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
  const bars =
    variant === 1
      ? "items-start"
      : variant === 2
        ? "items-stretch"
        : variant === 3
          ? "items-center"
          : variant === 4
            ? "items-end"
            : "justify-between";
  return (
    <span
      aria-hidden
      className={`flex h-6 w-8 flex-col gap-0.5 ${bars} opacity-70`}
    >
      <span className="h-1 w-full rounded-sm bg-current" />
      <span className="h-1 w-2/3 rounded-sm bg-current opacity-60" />
      <span className="h-1 w-1/2 rounded-sm bg-current opacity-40" />
    </span>
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
        <Field label="Tagline" hint="Optional line under the portfolio title">
          <FormInput
            value={String(data.tagline || "")}
            onChange={(e) => onChange({ ...data, tagline: e.target.value })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={Boolean(data.showSlug)}
            onChange={(e) =>
              onChange({ ...data, showSlug: e.target.checked })
            }
          />
          Show slug
        </label>
      </>
    );
  }

  if (section.type === "Hero") {
    return (
      <>
        <ImageField
          label="Photo"
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
        <Field label="Image alt">
          <FormInput
            value={String(data.imageAlt || "")}
            onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
          />
        </Field>
        <Field label="Name">
          <FormInput
            value={String(data.name || "")}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
          />
        </Field>
        <Field label="Tagline">
          <FormInput
            value={String(data.tagline || "")}
            onChange={(e) => onChange({ ...data, tagline: e.target.value })}
          />
        </Field>
        <Field label="CTA label">
          <FormInput
            value={String(data.ctaLabel || "")}
            onChange={(e) => onChange({ ...data, ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="CTA href">
          <FormInput
            value={String(data.ctaHref || "")}
            onChange={(e) => onChange({ ...data, ctaHref: e.target.value })}
          />
        </Field>
      </>
    );
  }

  if (section.type === "About") {
    return (
      <>
        <ImageField
          label="Portrait"
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
        <Field label="Image alt">
          <FormInput
            value={String(data.imageAlt || "")}
            onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
          />
        </Field>
        <Field label="Bio">
          <FormTextarea
            value={String(data.body || "")}
            onChange={(e) => onChange({ ...data, body: e.target.value })}
          />
        </Field>
      </>
    );
  }

  if (section.type === "Skills") {
    const items = Array.isArray(data.items) ? (data.items as string[]) : [];
    return (
      <Field label="Skills" hint="Comma-separated">
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
        />
      </Field>
    );
  }

  if (section.type === "CTA") {
    return (
      <>
        <ImageField
          label="Image"
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
        <Field label="Headline">
          <FormInput
            value={String(data.headline || "")}
            onChange={(e) => onChange({ ...data, headline: e.target.value })}
          />
        </Field>
        <Field label="Body">
          <FormTextarea
            value={String(data.body || "")}
            onChange={(e) => onChange({ ...data, body: e.target.value })}
          />
        </Field>
        <Field label="CTA label">
          <FormInput
            value={String(data.ctaLabel || "")}
            onChange={(e) => onChange({ ...data, ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="CTA href">
          <FormInput
            value={String(data.ctaHref || "")}
            onChange={(e) => onChange({ ...data, ctaHref: e.target.value })}
          />
        </Field>
      </>
    );
  }

  if (section.type === "Footer") {
    return (
      <>
        <Field label="Blurb" hint="Optional footer line">
          <FormInput
            value={String(data.blurb || "")}
            onChange={(e) => onChange({ ...data, blurb: e.target.value })}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={data.showBuiltWith !== false}
            onChange={(e) =>
              onChange({ ...data, showBuiltWith: e.target.checked })
            }
          />
          Show “Built with Reactive”
        </label>
      </>
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
    return (
      <div className="flex flex-col gap-4">
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
    return (
      <div className="flex flex-col gap-4">
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
