import { PortfolioImage } from "../portfolio-image";
import { PaletteCta } from "../shared";

export type HeroFlags = {
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  email: string;
  phone: string;
  imageUrl: string;
  imageAlt: string;
  showName: boolean;
  showTagline: boolean;
  showDescription: boolean;
  showImage: boolean;
  showCtaLabel: boolean;
  showCtaHref: boolean;
  showEmail: boolean;
  showPhone: boolean;
};

export function readHero(data: Record<string, unknown>): HeroFlags {
  return {
    name: String(data.name || ""),
    tagline: String(data.tagline || ""),
    description: String(data.description || ""),
    ctaLabel: String(data.ctaLabel || ""),
    ctaHref: String(data.ctaHref || "#"),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    imageUrl: String(data.imageUrl || ""),
    imageAlt: String(data.imageAlt || data.name || "Portrait"),
    showName: data.showName !== false,
    showTagline: data.showTagline !== false,
    showDescription: data.showDescription !== false,
    showImage: data.showImage !== false,
    showCtaLabel: data.showCtaLabel !== false,
    showCtaHref: data.showCtaHref !== false,
    showEmail: data.showEmail !== false,
    showPhone: data.showPhone !== false,
  };
}

export function HeroPhoto({
  url,
  alt,
  className,
  sizes,
}: {
  url: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <PortfolioImage
      src={url}
      alt={alt}
      className={className || "h-full w-full object-cover"}
      sizes={sizes || "(max-width: 768px) 100vw, 520px"}
      priority
    />
  );
}

export function HeroContact({
  hero,
  className = "",
  align = "left",
}: {
  hero: HeroFlags;
  className?: string;
  align?: "left" | "center";
}) {
  const email = hero.showEmail ? hero.email.trim() : "";
  const phone = hero.showPhone ? hero.phone.trim() : "";
  if (!email && !phone) return null;

  return (
    <div
      className={`flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      {email ? (
        <a
          href={`mailto:${email}`}
          className="transition hover:text-(--p-accent)"
        >
          {email}
        </a>
      ) : null}
      {phone ? (
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="transition hover:text-(--p-accent)"
        >
          {phone}
        </a>
      ) : null}
    </div>
  );
}

export function HeroCta({
  hero,
  className = "",
}: {
  hero: HeroFlags;
  className?: string;
}) {
  if (!hero.showCtaLabel || !hero.ctaLabel) return null;
  return (
    <PaletteCta
      href={hero.ctaHref}
      label={hero.ctaLabel}
      linked={hero.showCtaHref}
      className={className}
    />
  );
}

export function HeroActions({
  hero,
  className = "",
  align = "left",
  ctaClassName = "",
}: {
  hero: HeroFlags;
  className?: string;
  align?: "left" | "center";
  ctaClassName?: string;
}) {
  const email = hero.showEmail ? hero.email.trim() : "";
  const phone = hero.showPhone ? hero.phone.trim() : "";
  const hasContact = Boolean(email || phone);
  const hasCta = hero.showCtaLabel && Boolean(hero.ctaLabel);
  if (!hasContact && !hasCta) return null;

  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center" : ""
      } ${className}`}
    >
      <HeroContact hero={hero} align={align} />
      <HeroCta hero={hero} className={ctaClassName} />
    </div>
  );
}

export function HeroDescription({
  hero,
  className = "max-w-xl text-sm leading-relaxed text-white/55 md:text-base",
  align = "left",
}: {
  hero: HeroFlags;
  className?: string;
  align?: "left" | "center";
}) {
  if (!hero.showDescription || !hero.description) return null;
  return (
    <p
      className={`${className} whitespace-pre-wrap ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {hero.description}
    </p>
  );
}
