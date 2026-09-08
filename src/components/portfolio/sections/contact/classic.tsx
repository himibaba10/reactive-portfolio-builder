import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 1 — Classic stack */
export function ClassicContact({ contact }: { contact: ContactFlags }) {
  return (
    <section id="contact" className="space-y-5">
      <ContactHeader contact={contact} />
      <ContactAvatar contact={contact} />
      <ContactEmail contact={contact} />
      <ContactSocials contact={contact} />
    </section>
  );
}
