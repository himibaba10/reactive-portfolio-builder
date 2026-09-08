import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutDisplay({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section
      id="about"
      className="space-y-8 border-y border-white/10 py-10 md:py-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <AboutEyebrow about={about} />
          <AboutHeadline
            about={about}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[0.92] tracking-[-0.045em]"
          />
        </div>
        {hasPhoto ? (
          <div className="h-24 w-24 overflow-hidden rounded-full border border-white/15 md:h-28 md:w-28">
            <AboutPhoto
              url={about.imageUrl}
              alt={about.imageAlt}
              className="h-full w-full object-cover"
              sizes="112px"
            />
          </div>
        ) : null}
      </div>
      <AboutBody
        about={about}
        className="max-w-4xl font-display text-[clamp(1.35rem,3.2vw,2.15rem)] leading-snug tracking-tight text-white/88 whitespace-pre-wrap"
      />
    </section>
  );
}
