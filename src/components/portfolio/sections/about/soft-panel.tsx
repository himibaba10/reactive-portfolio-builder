import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutSoftPanel({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section
      id="about"
      className="overflow-hidden rounded-4xl border border-white/10 bg-(--p-primary)/12 px-6 py-8 md:px-10 md:py-12"
    >
      <div
        className={`grid items-center gap-8 ${hasPhoto ? 'md:grid-cols-[220px_minmax(0,1fr)]' : ''}`}
      >
        {hasPhoto ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <AboutPhoto
              url={about.imageUrl}
              alt={about.imageAlt}
              className="aspect-square h-full w-full object-cover"
              sizes="220px"
            />
          </div>
        ) : null}
        <div className="space-y-4">
          <AboutEyebrow about={about} />
          <AboutHeadline about={about} />
          <AboutBody
            about={about}
            className="max-w-2xl text-base leading-relaxed text-white/80 whitespace-pre-wrap md:text-lg"
          />
        </div>
      </div>
    </section>
  );
}
