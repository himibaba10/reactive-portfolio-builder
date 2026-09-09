import "server-only";

const sessionMaxAgeSec = 60 * 60 * 24 * 7; // 7 days

function appUrlIsHttps() {
  const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return url.startsWith("https://");
}

export const serverConfig = {
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/reactive-portfolio-builder",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-me",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  isProd: process.env.NODE_ENV === "production",
  /** Prefer APP_URL so `next start` on http://localhost still stores the cookie. */
  cookieSecure: appUrlIsHttps(),
  cookieName: "reactive_session",
  sessionMaxAgeSec,
  sessionTtl: `${sessionMaxAgeSec}s` as const,
  resendApiKey: process.env.RESEND_API_KEY || "",
  emailFrom:
    process.env.EMAIL_FROM ||
    "Reactive <noreply@reactiveferdous.com>",
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};
