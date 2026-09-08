import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsBentoPanel({
  skills,
  items,
  empty,
}: {
  skills: SkillsFlags;
  items: string[];
  empty: boolean;
}) {
  return (
    <section
      id="skills"
      className="rounded-[1.75rem] border border-white/10 px-5 py-7 md:px-8 md:py-9"
    >
      <SkillsHeader skills={skills} />
      {empty ? (
        <div className="mt-5">
          <SkillsEmpty />
        </div>
      ) : (
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-black/25 px-4 py-5 text-center text-sm text-white/80 ring-1 ring-white/5"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
