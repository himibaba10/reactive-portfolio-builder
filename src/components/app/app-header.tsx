"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { api } from "@/lib/api-client";

export function AppHeader({ email }: { email?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const linkClass = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)
      ? "text-foam"
      : "hover:text-foam";

  return (
    <header className="border-b border-line bg-ink/95">
      <div className="mx-auto flex w-full max-w-site items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/dashboard">
          <BrandLogo className="h-7 w-auto" sizes="140px" />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-muted">
          {email ? <span className="hidden sm:inline">{email}</span> : null}
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/editor" className={linkClass("/editor")}>
            Editor
          </Link>
          <Link href="/settings" className={linkClass("/settings")}>
            Settings
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="hover:text-foam"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}
