'use client';

import { SectionLayoutPickerShell } from '@/components/editor/section-layout-picker-shell';
import { ExperienceSection } from '@/components/portfolio/sections/experience';
import type { PortfolioSection } from '@/lib/api-client';
import { getPalette, paletteCssVars, type PaletteTokens } from '@/lib/palette';

const EXPERIENCE_LAYOUTS = [
  { id: 1, name: 'Timeline', blurb: 'Vertical rail' },
  { id: 2, name: 'Horizontal', blurb: 'Scrollable rail' },
  { id: 3, name: 'Split', blurb: 'Role left, meta right' },
  { id: 4, name: 'Compact', blurb: 'Dense underline rows' },
  { id: 5, name: 'Indexed', blurb: 'Numbered experience list' },
  { id: 6, name: 'Accent rail', blurb: 'Side-barred entries' },
] as const;

function Mini({ className = '' }: { className?: string }) {
  return <span className={`rounded-xs bg-current ${className}`} />;
}

function ExperienceSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className='flex h-full items-center gap-1 p-2'>
        {[0, 1, 2].map((n) => (
          <div key={n} className='flex flex-1 flex-col gap-1'>
            <div className='flex items-center gap-0.5'>
              <span className='size-1.5 shrink-0 rounded-full bg-current opacity-80' />
              {n < 2 ? (
                <span className='h-px flex-1 bg-current/40' />
              ) : (
                <span className='h-px flex-1 opacity-0' />
              )}
            </div>
            <Mini className='h-5 w-full rounded-sm opacity-40' />
          </div>
        ))}
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className='flex h-full flex-col justify-center gap-1.5 border-y border-current/20 p-2'>
        <div className='flex gap-1'>
          <Mini className='h-2 flex-1 opacity-80' />
          <Mini className='h-2 w-8 opacity-40' />
        </div>
        <div className='flex gap-1'>
          <Mini className='h-2 flex-1 opacity-60' />
          <Mini className='h-2 w-8 opacity-30' />
        </div>
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className='flex h-full flex-col justify-center gap-1 p-2'>
        <Mini className='h-1.5 w-full border-b border-current/30 opacity-70' />
        <Mini className='h-1.5 w-full border-b border-current/30 opacity-55' />
        <Mini className='h-1.5 w-full border-b border-current/30 opacity-40' />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className='flex h-full flex-col justify-center gap-1 p-2'>
        {[1, 2, 3].map((n) => (
          <div key={n} className='flex gap-1'>
            <Mini className='h-1.5 w-3 opacity-50' />
            <Mini className='h-1.5 flex-1 opacity-70' />
          </div>
        ))}
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className='flex h-full flex-col gap-1 p-2'>
        <div className='flex flex-1 gap-1'>
          <span className='w-0.5 rounded-full bg-current opacity-70' />
          <Mini className='flex-1 rounded-md opacity-40' />
        </div>
        <div className='flex flex-1 gap-1'>
          <span className='w-0.5 rounded-full bg-current opacity-70' />
          <Mini className='flex-1 rounded-md opacity-30' />
        </div>
      </div>
    );
  }
  return (
    <div className='flex h-full gap-1.5 p-2'>
      <span className='w-0.5 self-stretch bg-current/40' />
      <div className='flex flex-1 flex-col justify-center gap-1.5'>
        <div className='relative'>
          <span className='absolute -left-2.25 top-0.5 h-1.5 w-1.5 rounded-full bg-current opacity-80' />
          <Mini className='h-2 w-[80%] opacity-80' />
        </div>
        <div className='relative'>
          <span className='absolute -left-2.25 top-0.5 h-1.5 w-1.5 rounded-full bg-current opacity-60' />
          <Mini className='h-2 w-[70%] opacity-55' />
        </div>
      </div>
    </div>
  );
}

export function ExperienceLayoutPicker({
  section,
  paletteId,
  customPalette,
  portfolioTitle,
  portfolioSlug,
  value,
  onChange,
}: {
  section: PortfolioSection;
  paletteId: string;
  customPalette?: PaletteTokens | null;
  portfolioTitle: string;
  portfolioSlug: string;
  value: number;
  onChange: (variant: number) => void;
}) {
  const palette = getPalette(paletteId, customPalette);
  const style = paletteCssVars(palette.tokens);

  return (
    <SectionLayoutPickerShell
      layouts={EXPERIENCE_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <ExperienceSketch id={id} />}
      previewStyle={style}
      previewLabel={
        EXPERIENCE_LAYOUTS.find((l) => l.id === value)?.name ?? 'Experience'
      }
      preview={
        <ExperienceSection
          section={{ ...section, variant: value, visible: true }}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
