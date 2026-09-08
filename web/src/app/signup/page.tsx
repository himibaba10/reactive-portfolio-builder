import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { site } from "@/lib/landing-content";

export default function SignupPlaceholderPage() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-[var(--ink)] px-5 text-center text-[var(--foam)]">
      <BrandLogo className="mb-8 h-10 w-auto" sizes="200px" priority />
      <p className="mb-3 text-xs tracking-[0.28em] text-[var(--signal)] uppercase">
        Coming next
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] md:text-6xl">
        Auth lands in the next milestone
      </h1>
      <p className="mt-4 max-w-md text-[var(--muted)]">
        {site.name} signup, login, and the portfolio editor will plug in here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[var(--signal)] px-6 py-3 text-sm font-medium text-[var(--ink)]"
      >
        Back to landing
      </Link>
    </main>
  );
}
