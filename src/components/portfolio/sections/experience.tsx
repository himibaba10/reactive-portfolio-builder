import { PortfolioImage } from './portfolio-image';
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
            <div className='flex items-start gap-3'>
              {item.imageUrl ? (
                <div className='h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20'>
                  <PortfolioImage
                    src={String(item.imageUrl)}
                    alt={String(item.company || item.role || '')}
                    className='h-full w-full object-cover'
                    sizes='40px'
                  />
                </div>
              ) : null}
              <div>
                <h3 className='text-lg font-medium'>
                  {String(item.role || '')}
                  {item.company ? ` · ${String(item.company)}` : ''}
                </h3>
                <p className='text-sm text-white/45'>
                  {String(item.period || '')}
                </p>
                <p className='mt-2 text-sm leading-relaxed text-white/75'>
                  {String(item.description || '')}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
