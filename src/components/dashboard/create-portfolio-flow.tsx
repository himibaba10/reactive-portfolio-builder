"use client";

import { FormError, FormInput, Field, SubmitButton, useFormSubmit } from "@/components/ui/form";

type CreateMode = "choose" | "prebuilt" | "scratch";

type ChoiceModalProps = {
  open: boolean;
  onChoosePrebuilt: () => void;
  onChooseScratch: () => void;
};

export function CreateModeChooser({
  open,
  onChoosePrebuilt,
  onChooseScratch,
}: ChoiceModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-mode-title"
        className="w-full max-w-lg rounded-2xl border border-line bg-panel p-6 shadow-2xl md:p-8"
      >
        <p className="text-xs tracking-[0.2em] text-signal uppercase">
          New portfolio
        </p>
        <h2
          id="create-mode-title"
          className="mt-2 font-display text-3xl tracking-[-0.04em] text-foam"
        >
          How do you want to start?
        </h2>
        <p className="mt-3 text-sm text-muted">
          Pick the easier path — you can always add or remove sections later.
        </p>

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={onChoosePrebuilt}
            className="rounded-2xl border border-line bg-ink/50 p-5 text-left transition hover:border-signal/50"
          >
            <p className="font-display text-xl tracking-[-0.03em] text-foam">
              Prebuilt site
            </p>
            <p className="mt-2 text-sm text-muted">
              Answer a few questions. We set up Header, Hero, and Footer for
              you.
            </p>
          </button>
          <button
            type="button"
            onClick={onChooseScratch}
            className="rounded-2xl border border-line bg-ink/50 p-5 text-left transition hover:border-signal/50"
          >
            <p className="font-display text-xl tracking-[-0.03em] text-foam">
              From scratch
            </p>
            <p className="mt-2 text-sm text-muted">
              Choose title, slug, and palette — then build every section in the
              editor.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

type PrebuiltFormProps = {
  onBack: () => void;
  onCreated: () => void;
  create: (body: Record<string, unknown>) => Promise<void>;
};

export function PrebuiltCreateForm({
  onBack,
  onCreated,
  create,
}: PrebuiltFormProps) {
  const form = useFormSubmit(async (el) => {
    const fd = new FormData(el);
    const title = String(fd.get("title") || "").trim();
    const designation = String(fd.get("designation") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    if (!title) throw new Error("Title is required.");
    if (!designation) throw new Error("Designation is required.");
    if (!email) throw new Error("Email is required.");

    await create({
      starter: "prebuilt",
      title,
      designation,
      email,
      ...(phone ? { phone } : {}),
    });
    onCreated();
  });

  return (
    <div className="rounded-2xl border border-line bg-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl tracking-[-0.03em]">
            Prebuilt site
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Just the essentials. Slug and palette start automatic — edit them
            anytime.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted hover:text-foam"
        >
          Back
        </button>
      </div>

      <form onSubmit={form.onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        {form.error ? (
          <div className="md:col-span-2">
            <FormError message={form.error} />
          </div>
        ) : null}
        <Field label="Title">
          <FormInput
            name="title"
            required
            maxLength={80}
            placeholder="Humaira Tabassum"
          />
        </Field>
        <Field label="Designation">
          <FormInput
            name="designation"
            required
            maxLength={120}
            placeholder="Product designer"
          />
        </Field>
        <Field label="Email">
          <FormInput
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Phone" hint="Optional">
          <FormInput
            name="phone"
            type="tel"
            maxLength={40}
            placeholder="+880…"
          />
        </Field>
        <div className="md:col-span-2">
          <SubmitButton pending={form.pending}>Create prebuilt site</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export type { CreateMode };
