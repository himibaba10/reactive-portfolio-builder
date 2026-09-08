"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";
import { AuthShell } from "@/components/auth/auth-shell";

export function VerifyEmailClient() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") || "";
  const [status, setStatus] = useState<"working" | "ok" | "error">(
    token ? "working" : "error",
  );
  const [message, setMessage] = useState(
    token ? "Verifying…" : "Missing verification token.",
  );

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        await api("/auth/verify-email", {
          method: "POST",
          body: { token },
        });
        if (cancelled) return;
        setStatus("ok");
        setMessage("Email verified. You can publish now.");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 900);
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setMessage(
          err instanceof ApiError ? err.message : "Verification failed.",
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <AuthShell title="Email verification" subtitle={message}>
      {status === "error" ? (
        <Link href="/dashboard" className="text-signal hover:underline">
          Back to dashboard
        </Link>
      ) : null}
    </AuthShell>
  );
}
