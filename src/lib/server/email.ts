import "server-only";
import { Resend } from "resend";
import { serverConfig } from "@/lib/server/config";

function getResend() {
  if (!serverConfig.resendApiKey) return null;
  return new Resend(serverConfig.resendApiKey);
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
  return sendTransactionalEmail({
    to,
    subject: "Verify your Reactive account",
    text: `Verify your email to publish portfolios:\n\n${verifyUrl}\n\nThis link expires in 24 hours.`,
    html: `
      <div style="font-family:sans-serif;line-height:1.5;color:#0a0b0d">
        <h1 style="font-size:20px">Verify your email</h1>
        <p>Confirm your address so you can publish on Reactive.</p>
        <p><a href="${verifyUrl}" style="display:inline-block;background:#d6ff3f;color:#0a0b0d;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:600">Verify email</a></p>
        <p style="color:#666;font-size:13px">Or open: ${verifyUrl}</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return sendTransactionalEmail({
    to,
    subject: "Reset your Reactive password",
    text: `Reset your password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore the email.`,
    html: `
      <div style="font-family:sans-serif;line-height:1.5;color:#0a0b0d">
        <h1 style="font-size:20px">Reset password</h1>
        <p>Use the button below to choose a new password.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#d6ff3f;color:#0a0b0d;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:600">Reset password</a></p>
        <p style="color:#666;font-size:13px">Or open: ${resetUrl}</p>
      </div>
    `,
  });
}
