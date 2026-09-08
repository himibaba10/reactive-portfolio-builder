import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsNumberedIndex({
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
        <ol className="space-y-3">
          {items.map((item, i) => (
            <li key={item} className="flex items-baseline gap-4">
              <span className="w-8 shrink-0 font-display text-sm text-(--p-accent)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-white/85">{item}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
