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
import { palettes } from "@/lib/landing-content";
import { defaultSectionData, SECTION_TYPES } from "@/lib/sections";
import { isValidSlug, normalizeSlug } from "@/lib/slug";
import { AppChrome } from "@/components/app/app-chrome";
import {
  Field,
  FormError,
  FormInput,
  FormTextarea,
} from "@/components/ui/form";

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
        const sorted = [...mine.portfolio.sections].sort(
          (a, b) => a.order - b.order,
        );
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

  function move(id: string, dir: -1 | 1) {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((s) => s.id === id);
      const swap = idx + dir;
      if (idx < 0 || swap < 0 || swap >= sorted.length) return prev;
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
          sections: sections.map((s, order) => ({ ...s, order })),
        },
      });
      setPortfolio(result.portfolio);
      setSlug(result.portfolio.slug);
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
        <p className="text-muted">Loading editor…</p>
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
        {message ? (
          <p className="text-sm text-signal">{message}</p>
        ) : null}

        <div className="grid gap-4 rounded-2xl border border-line bg-panel p-5 md:grid-cols-3">
          <Field label="Title">
            <FormInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field label="Slug">
            <FormInput value={slug} onChange={(e) => setSlug(e.target.value)} />
          </Field>
          <Field label="Palette">
            <select
              value={paletteId}
              onChange={(e) => setPaletteId(e.target.value)}
              className="w-full rounded-xl border border-line bg-ink px-4 py-3"
            >
              {palettes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-line bg-panel p-4">
            <p className="mb-3 text-xs tracking-[0.18em] text-muted uppercase">
              Sections
            </p>
            <ul className="flex flex-col gap-2">
              {[...sections]
                .sort((a, b) => a.order - b.order)
                .map((section) => (
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
                        {section.type}
                        {!section.visible ? " · hidden" : ""}
                      </button>
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
                    </div>
                  </li>
                ))}
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
                      {type}
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
                    {active.type}
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
                <SectionFields section={active} onChange={updateActiveData} />
              </div>
            )}
          </section>
        </div>
      </div>
    </AppChrome>
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

  if (section.type === "Hero") {
    return (
      <>
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
      <Field label="Bio">
        <FormTextarea
          value={String(data.body || "")}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
        />
      </Field>
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

  if (section.type === "Contact") {
    const socials = (data.socials || {}) as Record<string, string>;
    return (
      <>
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
          <div
            key={index}
            className="rounded-xl border border-line p-4"
          >
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
                { title: "New project", description: "", url: "", tags: [] },
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
                { school: "School", degree: "Degree", period: "" },
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
