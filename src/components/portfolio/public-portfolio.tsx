import Link from "next/link";
import { getPalette } from "@/lib/palette";
import type { PublicPortfolio } from "@/lib/server/public-portfolio";
import type { PortfolioSection } from "@/lib/api-client";

export function PublicPortfolioView({
  portfolio,
}: {
  portfolio: PublicPortfolio;
}) {
  const palette = getPalette(portfolio.paletteId);
  const style = {
    ["--p-primary" as string]: palette.tokens.primary,
    ["--p-secondary" as string]: palette.tokens.secondary,
    ["--p-accent" as string]: palette.tokens.accent,
    ["--p-text-dark" as string]: palette.tokens.textDark,
    ["--p-text-light" as string]: palette.tokens.textLight,
  };

  return (
    <main
      style={style}
      className="relative min-h-svh overflow-hidden bg-(--p-secondary) text-(--p-text-light)"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_oklab,var(--p-primary)_35%,transparent),transparent_50%),radial-gradient(ellipse_at_90%_10%,color-mix(in_oklab,var(--p-accent)_28%,transparent),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-20 px-5 py-16 md:px-8 md:py-24">
        <header className="space-y-4 border-b border-white/10 pb-8">
          <p className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
            /{portfolio.slug}
          </p>
          <h1 className="font-display text-[clamp(2.4rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.045em]">
            {portfolio.title}
          </h1>
        </header>

        {portfolio.sections.length === 0 ? (
          <p className="text-white/60">No visible sections yet.</p>
        ) : (
          portfolio.sections.map((section) => (
            <PublicSection key={section.id} section={section} />
          ))
        )}

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs tracking-[0.16em] text-white/45 uppercase">
          <span>Built with Reactive</span>
          <Link href="/" className="hover:text-white">
            Make yours
          </Link>
        </footer>
      </div>
    </main>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs tracking-[0.28em] text-(--p-accent) uppercase">
      {children}
    </h2>
  );
}

function PublicSection({ section }: { section: PortfolioSection }) {
  const data = section.data;

  if (section.type === "Hero") {
    return (
      <section id="hero" className="space-y-6">
        <h2 className="font-display text-[clamp(2.8rem,9vw,5.5rem)] leading-[0.9] tracking-[-0.045em]">
          {String(data.name || "")}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
          {String(data.tagline || "")}
        </p>
        {data.ctaLabel ? (
          <a
            href={String(data.ctaHref || "#")}
            className="inline-flex rounded-full bg-(--p-primary) px-6 py-3 text-sm font-semibold text-(--p-text-dark) transition hover:opacity-90"
          >
            {String(data.ctaLabel)}
          </a>
        ) : null}
      </section>
    );
  }

  if (section.type === "About") {
    return (
      <section id="about" className="space-y-4">
        <SectionEyebrow>About</SectionEyebrow>
        <p className="max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg">
          {String(data.body || "")}
        </p>
      </section>
    );
  }

  if (section.type === "Skills") {
    const items = Array.isArray(data.items) ? (data.items as string[]) : [];
    return (
      <section id="skills" className="space-y-5">
        <SectionEyebrow>Skills</SectionEyebrow>
        {items.length === 0 ? (
          <p className="text-sm text-white/50">No skills listed.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (section.type === "Projects") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <section id="projects" className="space-y-5">
        <SectionEyebrow>Projects</SectionEyebrow>
        {items.length === 0 ? (
          <p className="text-sm text-white/50">No projects yet.</p>
        ) : (
          <div className="grid gap-4">
            {items.map((item, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm transition hover:border-white/20"
              >
                <h3 className="font-display text-2xl tracking-[-0.03em]">
                  {String(item.title || "")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {String(item.description || "")}
                </p>
                {item.url ? (
                  <a
                    href={String(item.url)}
                    className="mt-4 inline-block text-sm text-(--p-accent) hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit →
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (section.type === "Experience") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <section id="experience" className="space-y-5">
        <SectionEyebrow>Experience</SectionEyebrow>
        <div className="space-y-6 border-l border-white/15 pl-5">
          {items.map((item, i) => (
            <article key={i} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[1.4rem] h-2.5 w-2.5 rounded-full bg-(--p-accent)"
              />
              <h3 className="text-lg font-medium">
                {String(item.role || "")}
                {item.company ? ` · ${String(item.company)}` : ""}
              </h3>
              <p className="text-sm text-white/45">{String(item.period || "")}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {String(item.description || "")}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "Education") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <section id="education" className="space-y-5">
        <SectionEyebrow>Education</SectionEyebrow>
        <div className="space-y-5">
          {items.map((item, i) => (
            <article key={i}>
              <h3 className="text-lg font-medium">{String(item.school || "")}</h3>
              <p className="text-sm text-white/75">{String(item.degree || "")}</p>
              <p className="text-sm text-white/45">{String(item.period || "")}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "Contact") {
    const socials = (data.socials || {}) as Record<string, string>;
    const links = Object.entries(socials).filter(([, url]) => Boolean(url));
    return (
      <section id="contact" className="space-y-5">
        <SectionEyebrow>Contact</SectionEyebrow>
        {data.email ? (
          <a
            href={`mailto:${String(data.email)}`}
            className="block font-display text-2xl tracking-[-0.03em] text-(--p-accent) hover:underline md:text-3xl"
          >
            {String(data.email)}
          </a>
        ) : null}
        {links.length ? (
          <div className="flex flex-wrap gap-4 text-sm">
            {links.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="capitalize text-white/65 transition hover:text-white"
              >
                {key}
              </a>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  return null;
}
