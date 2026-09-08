import type { SectionProps } from "./shared";

export function FooterSection({ section, portfolio }: SectionProps) {
  const year = new Date().getFullYear();
  const custom = String(section.data.text || "").trim();
  const line = custom || `© ${year} ${portfolio.title}`;

  return (
    <footer
      id="footer"
      data-portfolio-footer
      className="mt-auto w-full border-t border-white/10"
    >
      <div className="w-full px-5 py-8 text-center text-xs tracking-[0.16em] text-white/45 uppercase md:px-8">
        <p>
          {line}
          {" - "}
          <a
            href="https://reactiveferdous.com"
            target="_blank"
            rel="noreferrer"
            className="text-white/55 transition hover:text-(--p-accent)"
          >
            Created by Reactive Ferdous
          </a>
        </p>
      </div>
    </footer>
  );
}
