import { SkillsEmpty, SkillsHeader, type SkillsFlags } from "./shared";

export function SkillsUnderlineRows({
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
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="border-b border-white/10 pb-3 text-base text-white/85"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
