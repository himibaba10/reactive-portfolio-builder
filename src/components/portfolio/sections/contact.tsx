import { SectionHeader, type SectionProps } from "./shared";
import { PortfolioImage } from "./portfolio-image";
import { Mail } from "lucide-react";

type ContactFlags = {
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

function readContact(data: Record<string, unknown>): ContactFlags {
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

function ContactHeader({ contact }: { contact: ContactFlags }) {
  return (
    <SectionHeader
      eyebrow={contact.eyebrow}
      headline={contact.headline}
      showEyebrow={contact.showEyebrow}
      showHeadline={contact.showHeadline}
    />
  );
}

function ContactAvatar({
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

function ContactEmail({
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

function ContactSocials({
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

export function ContactSection({ section }: SectionProps) {
  const contact = readContact(section.data);
  const variant = section.variant;

  // 1 — Classic stack
  if (variant === 1) {
    return (
      <section id="contact" className="space-y-5">
        <ContactHeader contact={contact} />
        <ContactAvatar contact={contact} />
        <ContactEmail contact={contact} />
        <ContactSocials contact={contact} />
      </section>
    );
  }

  // 2 — Split with portrait
  if (variant === 2) {
    return (
      <section
        id="contact"
        className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12"
      >
        <ContactAvatar contact={contact} className="h-28 w-28 md:h-36 md:w-36" />
        <div className="space-y-4">
          <ContactHeader contact={contact} />
          <ContactEmail contact={contact} />
          <ContactSocials contact={contact} />
        </div>
      </section>
    );
  }

  // 3 — Centered
  if (variant === 3) {
    return (
      <section id="contact" className="flex flex-col items-center gap-5 py-4 text-center">
        <ContactHeader contact={contact} />
        <ContactAvatar contact={contact} className="h-24 w-24" />
        <ContactEmail
          contact={contact}
          className="font-display text-2xl tracking-[-0.03em] text-(--p-accent) hover:underline md:text-3xl"
        />
        <ContactSocials
          contact={contact}
          className="flex flex-wrap justify-center gap-4 text-sm"
        />
      </section>
    );
  }

  // 4 — Panel card
  if (variant === 4) {
    return (
      <section
        id="contact"
        className="rounded-[1.75rem] border border-white/10 bg-black/25 px-6 py-8 md:px-8"
      >
        <div className="space-y-5">
          <ContactHeader contact={contact} />
          <div className="flex flex-wrap items-center gap-5">
            <ContactAvatar contact={contact} />
            <div className="space-y-3">
              <ContactEmail contact={contact} />
              <ContactSocials contact={contact} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 5 — Accent email banner
  if (variant === 5) {
    return (
      <section id="contact" className="space-y-6">
        <ContactHeader contact={contact} />
        <div className="rounded-2xl bg-(--p-primary)/15 px-6 py-8 ring-1 ring-white/10 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <ContactEmail
              contact={contact}
              className="font-display text-[clamp(1.6rem,4vw,2.6rem)] tracking-[-0.04em] text-(--p-text-light) hover:underline"
            />
            <ContactAvatar contact={contact} className="h-16 w-16" />
          </div>
        </div>
        <ContactSocials contact={contact} />
      </section>
    );
  }

  // 6 — Dual column email | socials
  return (
    <section
      id="contact"
      className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-2 md:gap-12"
    >
      <div className="space-y-4">
        <ContactHeader contact={contact} />
        <ContactAvatar contact={contact} />
        <ContactEmail contact={contact} />
      </div>
      <div className="flex flex-col justify-end gap-3 md:items-end md:text-right">
        <p className="text-xs tracking-[0.24em] text-white/40 uppercase">
          Elsewhere
        </p>
        <ContactSocials
          contact={contact}
          className="flex flex-col gap-3 text-base md:items-end"
        />
      </div>
    </section>
  );
}
