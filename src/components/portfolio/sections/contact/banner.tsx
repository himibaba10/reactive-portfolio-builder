import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 5 — Accent email banner */
export function BannerContact({ contact }: { contact: ContactFlags }) {
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
