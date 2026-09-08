import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function AppChrome({
  email,
  children,
}: {
  email?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-[var(--ink)] text-[var(--foam)]">
      <header className="border-b border-[color:var(--line)] bg-[var(--ink)]/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="/dashboard">
            <BrandLogo className="h-7 w-auto" sizes="140px" />
          </Link>
          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
            {email ? <span className="hidden sm:inline">{email}</span> : null}
            <Link href="/editor" className="hover:text-[var(--foam)]">
              Editor
            </Link>
            <Link href="/dashboard" className="hover:text-[var(--foam)]">
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 md:px-8">
        {children}
      </div>
    </div>
  );
}
