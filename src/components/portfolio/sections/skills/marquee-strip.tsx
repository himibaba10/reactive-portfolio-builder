import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsMarqueeStrip({
  skills,
  items,
  empty,
}: {
  skills: SkillsFlags;
  items: string[];
  empty: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <section id="skills" className="space-y-6">
      <SkillsHeader skills={skills} />
      {empty ? (
        <SkillsEmpty />
      ) : (
        <div className="relative overflow-x-clip mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="portfolio-marquee-track flex w-max gap-3 py-1 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-start">
            {(items.length ? loop : items).map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm tracking-wide text-white/85"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
