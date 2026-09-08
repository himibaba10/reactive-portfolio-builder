import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutMagazine({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section
      id="about"
      className="relative grid gap-6 md:grid-cols-12 md:gap-0 md:py-4"
    >
      {hasPhoto ? (
        <div className="relative md:col-span-7 md:col-start-6 md:row-start-1">
          <div className="aspect-4/5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/25 md:aspect-5/4">
            <AboutPhoto
              url={about.imageUrl}
              alt={about.imageAlt}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </div>
      ) : null}
      <div
        className={`relative z-10 space-y-5 md:col-span-6 md:col-start-1 md:row-start-1 md:self-center ${
          hasPhoto ? 'md:pr-8' : 'md:col-span-10'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-(--p-secondary)/90 p-5 backdrop-blur-sm md:p-7">
          <AboutEyebrow about={about} />
          <div className="mt-3 space-y-4">
            <AboutHeadline about={about} />
            <AboutBody
              about={about}
              className="text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
