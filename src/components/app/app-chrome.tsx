import { AppHeader } from "@/components/app/app-header";

export function AppChrome({
  email,
  children,
}: {
  email?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-ink text-foam">
      <AppHeader email={email} />
      <div className="mx-auto w-full max-w-site px-5 py-10 md:px-8">
        {children}
      </div>
    </div>
  );
}
