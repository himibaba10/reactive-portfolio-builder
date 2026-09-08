import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverConfig } from "@/lib/server/config";

const buckets = new Map<string, { count: number; resetAt: number }>();

const upstashReady =
  Boolean(serverConfig.upstashRedisUrl) &&
  Boolean(serverConfig.upstashRedisToken);

const redis = upstashReady
  ? new Redis({
      url: serverConfig.upstashRedisUrl,
      token: serverConfig.upstashRedisToken,
    })
  : null;

const upstashLimiters = new Map<string, Ratelimit>();

function memoryRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false as const, remaining: 0, retryAt: current.resetAt };
  }

  current.count += 1;
  return { ok: true as const, remaining: limit - current.count };
}

function getUpstashLimiter(limit: number, windowMs: number) {
  const cacheKey = `${limit}:${windowMs}`;
  const existing = upstashLimiters.get(cacheKey);
  if (existing) return existing;

  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const limiter = new Ratelimit({
    redis: redis!,
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    prefix: "reactive",
  });
  upstashLimiters.set(cacheKey, limiter);
  return limiter;
}

/** Prefer Upstash when configured; fall back to in-memory for local/dev. */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
) {
  if (redis) {
    try {
      const result = await getUpstashLimiter(limit, windowMs).limit(key);
      if (!result.success) {
        return {
          ok: false as const,
          remaining: result.remaining,
          retryAt: result.reset,
        };
      }
      return { ok: true as const, remaining: result.remaining };
    } catch (err) {
      console.error("[rate-limit] upstash failed, using memory", err);
    }
  }

  return memoryRateLimit(key, limit, windowMs);
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function handleRouteError(err: unknown) {
  if (err instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: err.flatten() },
      { status: 400 },
    );
  }

  const status =
    typeof err === "object" && err && "status" in err
      ? Number((err as { status: number }).status)
      : 500;
  const message = err instanceof Error ? err.message : "Server error";

  if (status === 401) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    typeof err === "object" &&
    err &&
    "code" in err &&
    (err as { code?: number }).code === 11000
  ) {
    return NextResponse.json({ error: "Already in use" }, { status: 409 });
  }

  if (status >= 500) {
    console.error(err);
  }

  return NextResponse.json(
    { error: status >= 500 ? "Server error" : message },
    { status: status >= 400 ? status : 500 },
  );
}
