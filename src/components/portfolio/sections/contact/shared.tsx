import { SectionHeader, type SectionProps } from "../shared";
import { PortfolioImage } from "../portfolio-image";
import { Mail } from "lucide-react";

export type { SectionProps };

export type ContactFlags = {
  eyebrow: string;
  headline: string;
  email: string;
  imageUrl: string;
  links: Array<[string, string]>;
  showEyebrow: boolean;
  showHeadline: boolean;
  showEmail: boolean;
  showImage: boolean;
  showSocials: boolean;
};

export function readContact(data: Record<string, unknown>): ContactFlags {
  const socials = (data.socials || {}) as Record<string, string>;
  return {
    eyebrow: String(data.eyebrow || "Contact"),
    headline: String(data.headline || ""),
    email: String(data.email || ""),
    imageUrl: String(data.imageUrl || ""),
    links: Object.entries(socials).filter(([, url]) => Boolean(url)),
    showEyebrow: data.showEyebrow !== false,
    showHeadline: data.showHeadline !== false,
    showEmail: data.showEmail !== false,
    showImage: data.showImage !== false,
    showSocials: data.showSocials !== false,
  };
}

export function ContactHeader({ contact }: { contact: ContactFlags }) {
  return (
    <SectionHeader
      eyebrow={contact.eyebrow}
      headline={contact.headline}
      showEyebrow={contact.showEyebrow}
      showHeadline={contact.showHeadline}
    />
  );
}

export function ContactAvatar({
  contact,
  className = "h-20 w-20",
}: {
  contact: ContactFlags;
  className?: string;
}) {
  if (!contact.showImage || !contact.imageUrl) return null;
  return (
    <div
      className={`${className} overflow-hidden rounded-full border border-white/15`}
    >
      <PortfolioImage
        src={contact.imageUrl}
        alt="Contact"
        className="h-full w-full object-cover"
        sizes="96px"
      />
    </div>
  );
}

export function ContactEmail({
  contact,
  className = "block font-display text-2xl tracking-[-0.03em] text-(--p-accent) hover:underline md:text-3xl",
}: {
  contact: ContactFlags;
  className?: string;
}) {
  if (!contact.showEmail || !contact.email) return null;
  return (
    <a href={`mailto:${contact.email}`} className={className}>
      <span className="inline-flex items-center gap-2">
        <Mail className="size-5 opacity-70" aria-hidden />
        {contact.email}
      </span>
    </a>
  );
}

export function ContactSocials({
  contact,
  className = "flex flex-wrap gap-4 text-sm",
}: {
  contact: ContactFlags;
  className?: string;
}) {
  if (!contact.showSocials || !contact.links.length) return null;
  return (
    <div className={className}>
      {contact.links.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="capitalize text-white/65 transition hover:text-white"
        >
          {key}
        </a>
      ))}
    </div>
  );
}
