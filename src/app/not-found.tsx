import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-5 text-center text-foam">
      <p className="text-xs tracking-[0.22em] text-signal uppercase">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[-0.04em]">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        That portfolio isn’t published, or the slug doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-ink"
      >
        Back home
      </Link>
    </main>
  );
}
