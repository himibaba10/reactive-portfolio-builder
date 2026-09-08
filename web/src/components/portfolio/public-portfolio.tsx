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
      className="min-h-svh bg-[var(--p-secondary)] text-[var(--p-text-light)]"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-5 py-16 md:px-8 md:py-24">
        <header className="border-b border-white/10 pb-6">
          <p className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
            {portfolio.slug}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] md:text-5xl">
            {portfolio.title}
          </h1>
        </header>

        {portfolio.sections.map((section) => (
          <PublicSection key={section.id} section={section} />
        ))}

        <footer className="border-t border-white/10 pt-6 text-xs tracking-[0.16em] text-white/50 uppercase">
          Built with Reactive
        </footer>
      </div>
    </main>
  );
}

function PublicSection({ section }: { section: PortfolioSection }) {
  const data = section.data;

  if (section.type === "Hero") {
    return (
      <section id="hero" className="space-y-5">
        <h2 className="font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
          {String(data.name || "")}
        </h2>
        <p className="max-w-xl text-lg text-white/75">
          {String(data.tagline || "")}
        </p>
        {data.ctaLabel ? (
          <a
            href={String(data.ctaHref || "#")}
            className="inline-flex rounded-full bg-[var(--p-primary)] px-5 py-3 text-sm font-semibold text-[var(--p-text-dark)]"
          >
            {String(data.ctaLabel)}
          </a>
        ) : null}
      </section>
    );
  }

  if (section.type === "About") {
    return (
      <section id="about" className="space-y-3">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          About
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap">
          {String(data.body || "")}
        </p>
      </section>
    );
  }

  if (section.type === "Skills") {
    const items = Array.isArray(data.items) ? (data.items as string[]) : [];
    return (
      <section id="skills" className="space-y-4">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 px-3 py-1 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "Projects") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <section id="projects" className="space-y-4">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          Projects
        </h2>
        <div className="grid gap-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <h3 className="text-xl font-medium">{String(item.title || "")}</h3>
              <p className="mt-2 text-sm text-white/70">
                {String(item.description || "")}
              </p>
              {item.url ? (
                <a
                  href={String(item.url)}
                  className="mt-3 inline-block text-sm text-[var(--p-accent)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "Experience") {
    const items = Array.isArray(data.items)
      ? (data.items as Array<Record<string, unknown>>)
      : [];
    return (
      <section id="experience" className="space-y-4">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          Experience
        </h2>
        <div className="space-y-5">
          {items.map((item, i) => (
            <article key={i}>
              <h3 className="text-lg font-medium">
                {String(item.role || "")} · {String(item.company || "")}
              </h3>
              <p className="text-sm text-white/50">{String(item.period || "")}</p>
              <p className="mt-2 text-sm text-white/75">
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
      <section id="education" className="space-y-4">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          Education
        </h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <article key={i}>
              <h3 className="text-lg font-medium">{String(item.school || "")}</h3>
              <p className="text-sm text-white/75">{String(item.degree || "")}</p>
              <p className="text-sm text-white/50">{String(item.period || "")}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "Contact") {
    const socials = (data.socials || {}) as Record<string, string>;
    return (
      <section id="contact" className="space-y-4">
        <h2 className="text-xs tracking-[0.22em] text-[var(--p-accent)] uppercase">
          Contact
        </h2>
        {data.email ? (
          <a
            href={`mailto:${String(data.email)}`}
            className="text-lg text-[var(--p-accent)]"
          >
            {String(data.email)}
          </a>
        ) : null}
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(socials)
            .filter(([, url]) => Boolean(url))
            .map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="capitalize text-white/70 hover:text-white"
              >
                {key}
              </a>
            ))}
        </div>
      </section>
    );
  }

  return null;
}
