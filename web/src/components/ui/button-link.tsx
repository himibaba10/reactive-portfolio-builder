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
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide no-underline transition-[transform,background-color,color,border-color] duration-300",
        variant === "primary" &&
          "bg-[var(--signal)] text-[#05060a] hover:bg-[var(--signal-soft)] hover:text-[#05060a]",
        variant === "ghost" &&
          "bg-transparent text-[var(--foam)] hover:text-[var(--signal)]",
        variant === "outline" &&
          "border border-[color:rgba(244,245,240,0.45)] bg-transparent text-[var(--foam)] hover:border-[var(--signal)] hover:text-[var(--signal)]",
        className,
      )}
      style={
        variant === "primary"
          ? { color: "#05060a", backgroundColor: "var(--signal)" }
          : undefined
      }
      {...rest}
    >
      {children}
    </Link>
  );
}
