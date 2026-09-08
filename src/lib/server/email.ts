import "server-only";
import path from "path";
import ejs from "ejs";
import { Resend } from "resend";
import { serverConfig } from "@/lib/server/config";

function getResend() {
  if (!serverConfig.resendApiKey) return null;
  return new Resend(serverConfig.resendApiKey);
}

const layoutPath = path.join(
  process.cwd(),
  "src",
  "emails",
  "layouts",
  "transactional.ejs",
);

async function renderTransactionalEmail(data: {
  subject: string;
  eyebrow: string;
  heading: string;
  body: string;
  actionUrl: string;
  actionLabel: string;
  footnote: string;
}) {
  return ejs.renderFile(layoutPath, {
    appUrl: serverConfig.appUrl,
    logoUrl: `${serverConfig.appUrl}/brand/logo.webp`,
    ...data,
  });
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const resend = getResend();

  if (!resend) {
    console.log(`[email:dev] to=${to} subject=${subject}\n${text}`);
    return { delivered: false as const, mode: "console" as const };
  }

  const { error } = await resend.emails.send({
    from: serverConfig.emailFrom,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("[email] send failed", error);
    throw Object.assign(new Error("Failed to send email"), { status: 502 });
  }

  return { delivered: true as const, mode: "resend" as const };
}

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  const subject = "Verify your Reactive account";
  const html = await renderTransactionalEmail({
    subject,
    eyebrow: "Verify",
    heading: "Confirm your email",
    body: "Verify once so you can publish your portfolio on Reactive. This link expires in 24 hours.",
    actionUrl: verifyUrl,
    actionLabel: "Verify email",
    footnote: "If you did not create an account, you can ignore this message.",
  });

  return sendTransactionalEmail({
    to,
    subject,
    html,
    text: `Verify your email to publish portfolios:\n\n${verifyUrl}\n\nThis link expires in 24 hours.`,
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const subject = "Reset your Reactive password";
  const html = await renderTransactionalEmail({
    subject,
    eyebrow: "Security",
    heading: "Reset your password",
    body: "Choose a new password for your Reactive account. This link expires in 1 hour.",
    actionUrl: resetUrl,
    actionLabel: "Reset password",
    footnote:
      "If you did not request a reset, you can ignore this email — your password will stay the same.",
  });

  return sendTransactionalEmail({
    to,
    subject,
    html,
    text: `Reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore the email.`,
  });
}
