import Link from "next/link";
import type { SectionProps } from "./shared";

export function FooterSection({ section }: SectionProps) {
  const data = section.data;
  const blurb = String(data.blurb || "");
  const showBuiltWith = data.showBuiltWith !== false;
  const variant = section.variant;

  if (variant === 2) {
    return (
      <footer
        id="footer"
        className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-1">
          {blurb ? <p className="text-sm text-white/55">{blurb}</p> : null}
          {showBuiltWith ? (
            <p className="text-xs tracking-[0.16em] text-white/40 uppercase">
              Built with Reactive
            </p>
          ) : null}
        </div>
        <Link
          href="/"
          className="text-xs tracking-[0.16em] text-(--p-accent) uppercase hover:opacity-80"
        >
          Make yours
        </Link>
      </footer>
    );
  }

  if (variant === 3) {
    return (
      <footer
        id="footer"
        className="rounded-2xl border border-white/10 bg-black/20 px-5 py-6 text-center"
      >
        {blurb ? (
          <p className="text-sm text-white/60">{blurb}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs tracking-[0.16em] text-white/45 uppercase">
          {showBuiltWith ? <span>Built with Reactive</span> : null}
          <Link href="/" className="hover:text-white">
            Make yours
          </Link>
        </div>
      </footer>
    );
  }

  if (variant === 4) {
    return (
      <footer
        id="footer"
        className="grid gap-4 border-t-2 border-(--p-accent) pt-8 md:grid-cols-2"
      >
        <div>
          <p className="font-display text-xl tracking-[-0.03em]">
            {blurb || "Thanks for visiting."}
          </p>
        </div>
        <div className="flex flex-wrap items-end justify-start gap-4 text-xs tracking-[0.16em] text-white/45 uppercase md:justify-end">
          {showBuiltWith ? <span>Built with Reactive</span> : null}
          <Link href="/" className="hover:text-white">
            Make yours
          </Link>
        </div>
      </footer>
    );
  }

  if (variant === 5) {
    return (
      <footer
        id="footer"
        className="overflow-hidden rounded-3xl bg-(--p-primary) px-6 py-7 text-(--p-text-dark) md:px-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            {blurb ? (
              <p className="text-sm opacity-80">{blurb}</p>
            ) : null}
            {showBuiltWith ? (
              <p className="mt-1 text-xs tracking-[0.16em] uppercase opacity-70">
                Built with Reactive
              </p>
            ) : null}
          </div>
          <Link
            href="/"
            className="rounded-full bg-(--p-text-dark) px-4 py-2 text-xs font-semibold tracking-[0.14em] text-(--p-text-light) uppercase"
          >
            Make yours
          </Link>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="footer"
      className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs tracking-[0.16em] text-white/45 uppercase"
    >
      <span>
        {blurb || (showBuiltWith ? "Built with Reactive" : "")}
        {blurb && showBuiltWith ? " · Built with Reactive" : ""}
      </span>
      <Link href="/" className="hover:text-white">
        Make yours
      </Link>
    </footer>
  );
}
