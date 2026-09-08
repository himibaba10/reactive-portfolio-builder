import { SectionEyebrow, asRecordArray, type SectionProps } from './shared';

export function ExperienceSection({ section }: SectionProps) {
  const items = asRecordArray(section.data.items);

  return (
    <section id='experience' className='space-y-5'>
      <SectionEyebrow>Experience</SectionEyebrow>
      <div className='space-y-6 border-l border-white/15 pl-5'>
        {items.map((item, i) => (
          <article key={i} className='relative'>
            <span
              aria-hidden
              className='absolute top-1.5 left-[-1.4rem] h-2.5 w-2.5 rounded-full bg-(--p-accent)'
            />
            <h3 className='text-lg font-medium'>
              {String(item.role || '')}
              {item.company ? ` · ${String(item.company)}` : ''}
            </h3>
            <p className='text-sm text-white/45'>{String(item.period || '')}</p>
            <p className='mt-2 text-sm leading-relaxed text-white/75'>
              {String(item.description || '')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
