"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError, type User } from "@/lib/api-client";
import { AppChrome } from "@/components/app/app-chrome";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const me = await api<{ user: User }>("/auth/me");
        setUser(me.user);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  async function deleteAccount() {
    if (
      !confirm(
        "Soft-delete your account? Your portfolio will be removed and you cannot log in.",
      )
    ) {
      return;
    }
    setPending(true);
    setError(null);
    try {
      await api("/auth/account", { method: "DELETE" });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setPending(false);
    }
  }

  if (loading) {
    return (
      <AppChrome>
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-panel" />
          <div className="h-10 w-48 rounded bg-panel" />
          <div className="h-40 rounded-2xl bg-panel" />
        </div>
      </AppChrome>
    );
  }

  return (
    <AppChrome email={user?.email}>
      <div className="flex max-w-2xl flex-col gap-8">
        <div>
          <p className="text-xs tracking-[0.2em] text-signal uppercase">
            Settings
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.04em]">
            Account
          </h1>
          <p className="mt-3 text-sm text-muted">
            Manage your Reactive account.
          </p>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <section className="rounded-2xl border border-line bg-panel p-6">
          <h2 className="font-display text-xl tracking-[-0.03em]">Profile</h2>
          <p className="mt-2 text-sm text-muted">{user?.email}</p>
          <p className="mt-1 text-sm text-muted">
            Email{" "}
            {user?.isEmailVerified ? "verified" : "not verified yet"}
          </p>
        </section>

        <section className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
          <h2 className="font-display text-xl tracking-[-0.03em] text-red-100">
            Danger zone
          </h2>
          <p className="mt-2 text-sm text-muted">
            Soft-delete removes your portfolio and blocks login. This cannot be
            undone from the app.
          </p>
          <button
            type="button"
            disabled={pending}
            onClick={() => void deleteAccount()}
            className="mt-5 rounded-full border border-red-500/40 px-5 py-2.5 text-sm text-red-200 disabled:opacity-60"
          >
            {pending ? "Deleting…" : "Soft-delete account"}
          </button>
        </section>
      </div>
    </AppChrome>
  );
}
