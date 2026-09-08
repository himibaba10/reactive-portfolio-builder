"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError, type User } from "@/lib/api-client";
import { AppChrome } from "@/components/app/app-chrome";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("reactive_verify_url");
    if (stored) setVerifyUrl(stored);

    (async () => {
      try {
        const me = await api<{ user: User }>("/auth/me");
        setUser(me.user);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setBanner(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function resendVerification() {
    const result = await api<{ verifyUrl?: string }>(
      "/auth/resend-verification",
      { method: "POST" },
    );
    if (result.verifyUrl) {
      setVerifyUrl(result.verifyUrl);
      sessionStorage.setItem("reactive_verify_url", result.verifyUrl);
    }
    setBanner("Verification link issued.");
  }

  async function deleteAccount() {
    if (
      !confirm(
        "Soft-delete your account? You will not be able to log in afterward.",
      )
    ) {
      return;
    }
    await api("/auth/account", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <AppChrome>
        <p className="text-[var(--muted)]">Loading…</p>
      </AppChrome>
    );
  }

  return (
    <AppChrome email={user?.email}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-[var(--signal)] uppercase">
              Dashboard
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
              You’re in
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Portfolio create lands in the next milestone. Auth is live.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-sm text-[var(--muted)] hover:text-[var(--foam)]"
          >
            Log out
          </button>
        </div>

        {banner ? (
          <p className="rounded-xl border border-[color:var(--line)] bg-[var(--panel)] px-4 py-3 text-sm">
            {banner}
          </p>
        ) : null}

        {user && !user.isEmailVerified ? (
          <div className="rounded-2xl border border-[color:var(--signal)]/30 bg-[var(--panel)] p-5">
            <p className="font-medium text-[var(--foam)]">Verify your email</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Publishing will require a verified address. In local dev, use the
              link below or the server console.
            </p>
            {verifyUrl ? (
              <p className="mt-3 break-all text-sm text-[var(--signal)]">
                <Link href={verifyUrl}>{verifyUrl}</Link>
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => void resendVerification()}
              className="mt-4 text-sm text-[var(--signal)] hover:underline"
            >
              Resend verification
            </button>
          </div>
        ) : (
          <p className="text-sm text-[var(--signal)]">Email verified.</p>
        )}

        <div className="border-t border-[color:var(--line)] pt-8">
          <button
            type="button"
            onClick={() => void deleteAccount()}
            className="text-sm text-red-300/80 hover:text-red-200"
          >
            Soft-delete account
          </button>
        </div>
      </div>
    </AppChrome>
  );
}
