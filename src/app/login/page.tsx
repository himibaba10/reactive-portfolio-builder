import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getSessionUser } from "@/lib/server/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getSessionUser();
  if (user) {
    const params = await searchParams;
    const next = params.next;
    redirect(
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard",
    );
  }

  return <LoginForm />;
}
