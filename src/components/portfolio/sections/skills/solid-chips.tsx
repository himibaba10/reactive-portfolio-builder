import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsSolidChips({
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
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-xl bg-(--p-primary) px-4 py-2.5 text-sm font-medium text-(--p-text-dark)"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
