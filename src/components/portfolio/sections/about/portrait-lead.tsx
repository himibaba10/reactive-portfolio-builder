import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutPortraitLead({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section
      id="about"
      className="grid items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12"
    >
      {hasPhoto ? (
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-x-2 -inset-y-3 rounded-4xl border border-(--p-accent)/25 md:-inset-x-3"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
            <AboutPhoto url={about.imageUrl} alt={about.imageAlt} />
          </div>
        </div>
      ) : null}
      <div className={`space-y-5 ${hasPhoto ? '' : 'md:col-span-2'}`}>
        <AboutEyebrow about={about} />
        <AboutHeadline about={about} />
        <div aria-hidden className="h-px w-14 bg-(--p-accent)/70" />
        <AboutBody
          about={about}
          className="max-w-xl text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg"
        />
      </div>
    </section>
  );
}
