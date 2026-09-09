import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 6 — Dual column email | socials */
export function ColumnsContact({ contact }: { contact: ContactFlags }) {
  return (
    <section
      id="contact"
      className="grid gap-8 py-2 md:grid-cols-2 md:gap-12"
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
