'use client';

import { SectionLayoutPickerShell } from '@/components/editor/section-layout-picker-shell';
import { SkillsSection } from '@/components/portfolio/sections/skills';
import type { PortfolioSection } from '@/lib/api-client';
import { getPalette, paletteCssVars, type PaletteTokens } from '@/lib/palette';

const SKILLS_LAYOUTS = [
  { id: 1, name: 'Pill cloud', blurb: 'Soft outlined tags' },
  { id: 2, name: 'Rows', blurb: 'Two-column underline list' },
  { id: 3, name: 'Solid chips', blurb: 'Primary filled pills' },
  { id: 4, name: 'Indexed', blurb: 'Numbered skill stack' },
  { id: 5, name: 'Bento', blurb: 'Tiled panel grid' },
  { id: 6, name: 'Marquee', blurb: 'Infinite tag strip' },
] as const;

function Mini({ className = '' }: { className?: string }) {
  return <span className={`rounded-xs bg-current ${className}`} />;
}

function SkillsSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className='flex h-full flex-col justify-center gap-1.5 p-2'>
        <Mini className='h-0.5 w-8 opacity-50' />
        <div className='grid grid-cols-2 gap-1'>
          <Mini className='h-2 w-full border-b border-current/30 opacity-70' />
          <Mini className='h-2 w-full border-b border-current/30 opacity-70' />
          <Mini className='h-2 w-full border-b border-current/30 opacity-50' />
          <Mini className='h-2 w-full border-b border-current/30 opacity-50' />
        </div>
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className='flex h-full flex-wrap content-center gap-1 p-2'>
        <Mini className='h-3 w-10 rounded-md opacity-80' />
        <Mini className='h-3 w-8 rounded-md opacity-70' />
        <Mini className='h-3 w-12 rounded-md opacity-60' />
        <Mini className='h-3 w-9 rounded-md opacity-50' />
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className='flex h-full flex-col justify-center gap-1 p-2'>
        {[1, 2, 3].map((n) => (
          <div key={n} className='flex items-center gap-1'>
            <Mini className='h-1.5 w-3 opacity-50' />
            <Mini className='h-1.5 w-full opacity-70' />
          </div>
        ))}
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className='grid h-full grid-cols-3 gap-1 rounded-md border border-current/20 p-2'>
        <Mini className='rounded-sm opacity-40' />
        <Mini className='rounded-sm opacity-50' />
        <Mini className='rounded-sm opacity-35' />
        <Mini className='rounded-sm opacity-45' />
        <Mini className='rounded-sm opacity-55' />
        <Mini className='rounded-sm opacity-40' />
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className='flex h-full items-center gap-1 overflow-hidden p-2'>
        <Mini className='h-3 w-10 shrink-0 rounded-full opacity-70' />
        <Mini className='h-3 w-8 shrink-0 rounded-full opacity-55' />
        <Mini className='h-3 w-12 shrink-0 rounded-full opacity-40' />
        <Mini className='h-3 w-7 shrink-0 rounded-full opacity-30' />
      </div>
    );
  }
  return (
    <div className='flex h-full flex-wrap content-center gap-1 p-2'>
      <Mini className='h-2.5 w-9 rounded-full opacity-70' />
      <Mini className='h-2.5 w-12 rounded-full opacity-55' />
      <Mini className='h-2.5 w-8 rounded-full opacity-45' />
      <Mini className='h-2.5 w-10 rounded-full opacity-35' />
    </div>
  );
}

export function SkillsLayoutPicker({
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

  const previewSection: PortfolioSection = {
    ...section,
    variant: value,
    visible: true,
  };

  return (
    <SectionLayoutPickerShell
      layouts={SKILLS_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <SkillsSketch id={id} />}
      previewStyle={style}
      previewLabel={
        SKILLS_LAYOUTS.find((l) => l.id === value)?.name ?? 'Skills'
      }
      preview={
        <SkillsSection
          section={previewSection}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
