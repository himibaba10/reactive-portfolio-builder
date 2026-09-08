import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 2 — Split with portrait */
export function SplitContact({ contact }: { contact: ContactFlags }) {
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
