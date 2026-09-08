import "server-only";

export const serverConfig = {
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/reactive-portfolio-builder",
  jwtSecret: process.env.JWT_SECRET || "dev-only-change-me",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  isProd: process.env.NODE_ENV === "production",
  cookieName: "reactive_session",
  sessionTtl: "7d" as const,
  resendApiKey: process.env.RESEND_API_KEY || "",
  emailFrom:
    process.env.EMAIL_FROM ||
    "Reactive <noreply@reactiveferdous.com>",
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL || "",
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
};
