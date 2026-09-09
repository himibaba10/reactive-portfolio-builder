import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  "data-magnetic"?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide no-underline transition-[background-color,color,border-color] duration-300",
        variant === "primary" &&
          "bg-signal text-ink hover:bg-signal-soft",
        variant === "ghost" && "bg-transparent text-foam hover:text-signal",
        variant === "outline" &&
          "border border-foam/45 bg-transparent text-foam hover:border-signal hover:text-signal",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
