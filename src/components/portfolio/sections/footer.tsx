import type { SectionProps } from "./shared";

export function FooterSection({ portfolio }: SectionProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="mt-auto w-full border-t border-white/10"
    >
      <div className="w-full px-5 py-8 text-center text-xs tracking-[0.16em] text-white/45 uppercase md:px-8">
        <p>
          © {year} {portfolio.title}
        </p>
      </div>
    </footer>
  );
}
