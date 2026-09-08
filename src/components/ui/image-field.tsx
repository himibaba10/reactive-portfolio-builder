"use client";

import { useRef, useState } from "react";
import { ApiError } from "@/lib/api-client";

export type ImageValue = {
  url: string;
  publicId: string;
};

type ImageFieldProps = {
  label?: string;
  valueUrl?: string;
  valuePublicId?: string;
  onChange: (next: ImageValue | null) => void;
  hint?: string;
};

export function ImageField({
  label = "Image",
  valueUrl = "",
  valuePublicId = "",
  onChange,
  hint = "JPEG, PNG, WebP, or GIF · max 5MB",
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setPending(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      if (valuePublicId) body.append("replacePublicId", valuePublicId);

      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new ApiError(
          typeof data.error === "string" ? data.error : "Upload failed",
          res.status,
        );
      }
      onChange({
        url: String(data.url || ""),
        publicId: String(data.publicId || ""),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setPending(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function remove() {
    setPending(true);
    setError(null);
    try {
      if (valuePublicId) {
        await fetch("/api/uploads/image", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: valuePublicId }),
        });
      }
      onChange(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Remove failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs tracking-[0.18em] text-muted uppercase">
        {label}
      </span>
      {valueUrl ? (
        <div className="overflow-hidden rounded-xl border border-line bg-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={valueUrl}
            alt=""
            className="max-h-48 w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-line bg-ink/50 text-xs text-muted">
          No image yet
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-line px-4 py-2 text-xs disabled:opacity-60"
        >
          {pending ? "Uploading…" : valueUrl ? "Replace" : "Upload"}
        </button>
        {valueUrl ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => void remove()}
            className="rounded-full border border-red-500/40 px-4 py-2 text-xs text-red-200 disabled:opacity-60"
          >
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      <span className="text-xs text-muted">{hint}</span>
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </div>
  );
}
