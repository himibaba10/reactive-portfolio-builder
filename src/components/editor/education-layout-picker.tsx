'use client';

import { SectionLayoutPickerShell } from '@/components/editor/section-layout-picker-shell';
import { EducationSection } from '@/components/portfolio/sections/education';
import type { PortfolioSection } from '@/lib/api-client';
import { getPalette } from '@/lib/palette';

const EDUCATION_LAYOUTS = [
  { id: 1, name: 'Stack', blurb: 'Simple school list' },
  { id: 2, name: 'Cards', blurb: 'Two-column school cards' },
  { id: 3, name: 'Timeline', blurb: 'Rail with accent dots' },
  { id: 4, name: 'Rows', blurb: 'Editorial underline rows' },
  { id: 5, name: 'Accent rail', blurb: 'Side rule + schools' },
  { id: 6, name: 'Diploma', blurb: 'Tinted credential panels' },
] as const;

function Mini({ className = '' }: { className?: string }) {
  return <span className={`rounded-xs bg-current ${className}`} />;
}

function EducationSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className='grid h-full grid-cols-2 gap-1 p-2'>
        <Mini className='rounded-md opacity-45' />
        <Mini className='rounded-md opacity-35' />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className='flex h-full gap-1.5 p-2'>
        <span className='w-0.5 self-stretch bg-current/40' />
        <div className='flex flex-1 flex-col justify-center gap-1.5'>
          <Mini className='h-2 w-[75%] opacity-80' />
          <Mini className='h-2 w-[65%] opacity-50' />
        </div>
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className='flex h-full flex-col justify-center gap-1 border-y border-current/20 p-2'>
        <Mini className='h-2 w-full opacity-70' />
        <Mini className='h-2 w-full opacity-50' />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className='flex h-full gap-1.5 p-2'>
        <span className='w-0.5 self-stretch rounded-full bg-current opacity-70' />
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <Mini className='h-2 w-[80%] opacity-80' />
          <Mini className='h-1 w-[60%] opacity-40' />
        </div>
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className='flex h-full flex-col gap-1 p-2'>
        <Mini className='flex-1 rounded-md opacity-45' />
        <Mini className='flex-1 rounded-md opacity-30' />
      </div>
    );
  }
  return (
    <div className='flex h-full flex-col justify-center gap-2 p-2'>
      <div className='flex gap-1'>
        <Mini className='h-3 w-3 rounded-sm opacity-40' />
        <Mini className='h-2 flex-1 opacity-70' />
      </div>
      <div className='flex gap-1'>
        <Mini className='h-3 w-3 rounded-sm opacity-30' />
        <Mini className='h-2 flex-1 opacity-50' />
      </div>
    </div>
  );
}

export function EducationLayoutPicker({
  section,
  paletteId,
  portfolioTitle,
  portfolioSlug,
  value,
  onChange,
}: {
  section: PortfolioSection;
  paletteId: string;
  portfolioTitle: string;
  portfolioSlug: string;
  value: number;
  onChange: (variant: number) => void;
}) {
  const palette = getPalette(paletteId);
  const style = {
    ['--p-primary' as string]: palette.tokens.primary,
    ['--p-secondary' as string]: palette.tokens.secondary,
    ['--p-accent' as string]: palette.tokens.accent,
    ['--p-text-dark' as string]: palette.tokens.textDark,
    ['--p-text-light' as string]: palette.tokens.textLight,
  };

  return (
    <SectionLayoutPickerShell
      layouts={EDUCATION_LAYOUTS}
      value={value}
      onChange={onChange}
      sketch={(id) => <EducationSketch id={id} />}
      previewStyle={style}
      previewLabel={
        EDUCATION_LAYOUTS.find((l) => l.id === value)?.name ?? 'Education'
      }
      preview={
        <EducationSection
          section={{ ...section, variant: value, visible: true }}
          portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
        />
      }
    />
  );
}
