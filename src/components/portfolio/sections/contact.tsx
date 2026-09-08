import { SectionEyebrow, type SectionProps } from "./shared";

export function ContactSection({ section }: SectionProps) {
  const data = section.data;
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
