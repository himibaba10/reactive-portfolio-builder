import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsPillCloud({
  skills,
  items,
  empty,
}: {
  skills: SkillsFlags;
  items: string[];
  empty: boolean;
}) {
  return (
    <section id="skills" className="space-y-6">
      <SkillsHeader skills={skills} />
      {empty ? (
        <SkillsEmpty />
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
