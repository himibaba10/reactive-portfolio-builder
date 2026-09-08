import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutCopyLead({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section
      id="about"
      className="grid items-end gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12"
    >
      <div className="space-y-5">
        <AboutEyebrow about={about} />
        <AboutHeadline about={about} />
        <AboutBody
          about={about}
          className="max-w-lg text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg"
        />
      </div>
      {hasPhoto ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-[0_0_0_1px_color-mix(in_oklab,var(--p-primary)_25%,transparent)]">
          <AboutPhoto url={about.imageUrl} alt={about.imageAlt} />
        </div>
      ) : null}
    </section>
  );
}
