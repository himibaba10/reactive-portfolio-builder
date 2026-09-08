'use client';

import { HeroSection } from '@/components/portfolio/sections/hero';
import type { PortfolioSection } from '@/lib/api-client';
import { getPalette } from '@/lib/palette';

const HERO_LAYOUTS = [
  {
    id: 1,
    name: 'Monument',
    blurb: 'Huge type, image band below',
  },
  {
    id: 2,
    name: 'Split',
    blurb: 'Copy left, portrait right',
  },
  {
    id: 3,
    name: 'Cinematic',
    blurb: 'Photo stage, text overlaid',
  },
  {
    id: 4,
    name: 'Center',
    blurb: 'Circular portrait, centered',
  },
  {
    id: 5,
    name: 'Editorial',
    blurb: 'Magazine grid spread',
  },
  {
    id: 6,
    name: 'Asymmetric',
    blurb: 'Accent name + dock bar',
  },
] as const;

function MiniBlock({ className = '' }: { className?: string }) {
  return <span className={`rounded-xs bg-current ${className}`} />;
}

function HeroLayoutSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className='flex h-full gap-1.5 p-2'>
        <div className='flex flex-1 flex-col justify-end gap-1'>
          <MiniBlock className='h-2.5 w-[90%] opacity-90' />
          <MiniBlock className='h-1 w-[70%] opacity-45' />
          <MiniBlock className='mt-1 h-1.5 w-8 rounded-full opacity-70' />
        </div>
        <MiniBlock className='h-full w-[38%] rounded-md opacity-35' />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className='relative flex h-full items-end overflow-hidden rounded-md bg-current/15 p-2'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,currentColor,transparent_55%)] opacity-25' />
        <div className='relative flex w-full flex-col gap-1'>
          <MiniBlock className='h-2 w-[75%] opacity-90' />
          <MiniBlock className='h-1 w-[55%] opacity-45' />
          <MiniBlock className='mt-0.5 h-1.5 w-7 rounded-full opacity-70' />
        </div>
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-1 p-2'>
        <MiniBlock className='h-4 w-4 rounded-full opacity-40' />
        <MiniBlock className='h-2 w-[80%] opacity-90' />
        <MiniBlock className='h-0.5 w-6 opacity-50' />
        <MiniBlock className='h-1 w-[50%] opacity-40' />
        <MiniBlock className='mt-0.5 h-1.5 w-7 rounded-full opacity-70' />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className='flex h-full gap-1.5 border-y border-current/20 p-2'>
        <div className='flex flex-[1.2] flex-col justify-center gap-1'>
          <MiniBlock className='h-0.5 w-8 opacity-50' />
          <MiniBlock className='h-2 w-full opacity-90' />
          <MiniBlock className='h-1 w-[70%] opacity-40' />
          <MiniBlock className='mt-0.5 h-1.5 w-7 rounded-full opacity-70' />
        </div>
        <MiniBlock className='aspect-square w-[34%] self-center rounded-md opacity-35' />
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className='flex h-full flex-col justify-between gap-1 p-2'>
        <div className='flex items-start justify-between gap-1'>
          <div className='flex flex-1 flex-col gap-0.5'>
            <MiniBlock className='h-2.5 w-[85%] opacity-90' />
            <MiniBlock className='h-2 w-[60%] opacity-55' />
          </div>
          <MiniBlock className='h-10 w-7 rounded-md opacity-35' />
        </div>
        <div className='flex items-center justify-between gap-1 border-t border-current/25 pt-1.5'>
          <MiniBlock className='h-1 w-[45%] opacity-40' />
          <MiniBlock className='h-1.5 w-7 rounded-full opacity-70' />
        </div>
      </div>
    );
  }
  // Monument
  return (
    <div className='flex h-full flex-col justify-between gap-1.5 p-2'>
      <div className='flex flex-col gap-1'>
        <MiniBlock className='h-3 w-[92%] opacity-90' />
        <MiniBlock className='h-3 w-[70%] opacity-75' />
        <MiniBlock className='h-1 w-[55%] opacity-40' />
        <MiniBlock className='mt-0.5 h-1.5 w-8 rounded-full opacity-70' />
      </div>
      <MiniBlock className='h-5 w-full rounded-md opacity-30' />
    </div>
  );
}

export function HeroLayoutPicker({
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

  const previewSection: PortfolioSection = {
    ...section,
    variant: value,
    visible: true,
  };

  return (
    <div className='space-y-4'>
      <div>
        <p className='mb-2 text-xs tracking-[0.18em] text-muted uppercase'>
          Layout
        </p>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {HERO_LAYOUTS.map((layout) => {
            const selected = value === layout.id;
            return (
              <button
                key={layout.id}
                type='button'
                onClick={() => onChange(layout.id)}
                className={`overflow-hidden rounded-xl border text-left transition ${
                  selected
                    ? 'border-signal bg-ink text-foam'
                    : 'border-line text-muted hover:border-foam/40'
                }`}
                aria-pressed={selected}
                aria-label={`${layout.name}: ${layout.blurb}`}
              >
                <div
                  className={`h-24 border-b ${
                    selected
                      ? 'border-signal/30 text-foam'
                      : 'border-line text-muted'
                  }`}
                >
                  <HeroLayoutSketch id={layout.id} />
                </div>
                <div className='space-y-0.5 px-2.5 py-2'>
                  <p className='text-xs font-medium text-foam'>
                    {layout.id}. {layout.name}
                  </p>
                  <p className='text-[11px] leading-snug text-muted'>
                    {layout.blurb}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className='mb-2 text-xs tracking-[0.18em] text-muted uppercase'>
          Live preview
        </p>
        <div
          style={style}
          className='overflow-hidden rounded-2xl border border-line bg-(--p-secondary) text-(--p-text-light)'
        >
          <div className='border-b border-white/10 px-4 py-2 text-[10px] tracking-[0.18em] text-white/40 uppercase'>
            {HERO_LAYOUTS.find((l) => l.id === value)?.name ?? 'Hero'} · as on
            your public page
          </div>
          <div className='p-5 md:p-7'>
            <HeroSection
              section={previewSection}
              portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
