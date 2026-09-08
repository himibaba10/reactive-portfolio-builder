import {
  ContactAvatar,
  ContactEmail,
  ContactHeader,
  ContactSocials,
  type ContactFlags,
} from "./shared";

/** 4 — Panel card */
export function PanelContact({ contact }: { contact: ContactFlags }) {
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
