import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 3 — Centered */
export function CenterContact({ contact }: { contact: ContactFlags }) {
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
