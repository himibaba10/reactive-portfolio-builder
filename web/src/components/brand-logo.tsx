import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/landing-content";

const LOGO = {
  src: "/brand/logo.webp",
  width: 400,
  height: 128,
} as const;

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandLogo({
  className,
  priority = false,
  sizes = "400px",
}: BrandLogoProps) {
  return (
    <Image
      src={LOGO.src}
      alt={site.name}
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-auto", className)}
    />
  );
}
