import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-16 text-foam">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(214,255,63,0.12),transparent_45%),radial-gradient(ellipse_at_90%_10%,rgba(91,140,255,0.12),transparent_40%)]"
      />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-10 inline-flex">
          <BrandLogo className="h-9 w-auto" sizes="180px" priority />
        </Link>
        <h1 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
