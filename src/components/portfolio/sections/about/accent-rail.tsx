import {
  AboutBody,
  AboutEyebrow,
  AboutHeadline,
  AboutPhoto,
  type AboutFlags,
} from './shared';

export function AboutAccentRail({
  about,
  hasPhoto,
}: {
  about: AboutFlags;
  hasPhoto: boolean;
}) {
  return (
    <section id="about" className="relative pl-6 md:pl-8">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-(--p-accent)"
      />
      <div className="space-y-5">
        <AboutEyebrow about={about} />
        <AboutHeadline about={about} />
        {hasPhoto ? (
          <div className="max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <AboutPhoto
              url={about.imageUrl}
              alt={about.imageAlt}
              className="aspect-5/4 h-full w-full object-cover"
            />
          </div>
        ) : null}
        <AboutBody
          about={about}
          className="max-w-2xl text-base leading-relaxed text-white/75 whitespace-pre-wrap md:text-lg"
        />
      </div>
    </section>
  );
}
