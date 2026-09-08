'use client';

import { AboutSection } from '@/components/portfolio/sections/about';
import type { PortfolioSection } from '@/lib/api-client';
import { getPalette } from '@/lib/palette';

const ABOUT_LAYOUTS = [
  {
    id: 1,
    name: 'Portrait lead',
    blurb: 'Photo first, narrative rail',
  },
  {
    id: 2,
    name: 'Copy lead',
    blurb: 'Story left, framed portrait',
  },
  {
    id: 3,
    name: 'Soft panel',
    blurb: 'Tinted stage card',
  },
  {
    id: 4,
    name: 'Display',
    blurb: 'Oversized type manifesto',
  },
  {
    id: 5,
    name: 'Magazine',
    blurb: 'Photo plate + crossover copy',
  },
  {
    id: 6,
    name: 'Accent rail',
    blurb: 'Side rule, stacked bio',
  },
] as const;

function MiniBlock({ className = '' }: { className?: string }) {
  return <span className={`rounded-xs bg-current ${className}`} />;
}

function AboutLayoutSketch({ id }: { id: number }) {
  if (id === 2) {
    return (
      <div className='flex h-full gap-1.5 p-2'>
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <MiniBlock className='h-0.5 w-6 opacity-50' />
          <MiniBlock className='h-2 w-[85%] opacity-90' />
          <MiniBlock className='h-1 w-full opacity-40' />
          <MiniBlock className='h-1 w-[70%] opacity-30' />
        </div>
        <MiniBlock className='h-full w-[36%] rounded-md opacity-35' />
      </div>
    );
  }
  if (id === 3) {
    return (
      <div className='flex h-full items-center gap-1.5 rounded-md border border-current/20 bg-current/10 p-2'>
        <MiniBlock className='h-10 w-10 rounded-md opacity-35' />
        <div className='flex flex-1 flex-col gap-1'>
          <MiniBlock className='h-0.5 w-6 opacity-50' />
          <MiniBlock className='h-1.5 w-[80%] opacity-90' />
          <MiniBlock className='h-1 w-full opacity-35' />
        </div>
      </div>
    );
  }
  if (id === 4) {
    return (
      <div className='flex h-full flex-col justify-between gap-1 border-y border-current/25 p-2'>
        <div className='flex items-end justify-between gap-1'>
          <div className='flex flex-1 flex-col gap-1'>
            <MiniBlock className='h-0.5 w-6 opacity-50' />
            <MiniBlock className='h-2 w-[70%] opacity-90' />
          </div>
          <MiniBlock className='h-5 w-5 rounded-full opacity-35' />
        </div>
        <MiniBlock className='h-3 w-full opacity-70' />
      </div>
    );
  }
  if (id === 5) {
    return (
      <div className='relative h-full p-2'>
        <MiniBlock className='absolute top-2 right-2 bottom-2 w-[55%] rounded-md opacity-30' />
        <div className='relative z-10 mt-3 w-[58%] space-y-1 rounded-md border border-current/25 bg-current/10 p-1.5'>
          <MiniBlock className='h-0.5 w-5 opacity-50' />
          <MiniBlock className='h-1.5 w-full opacity-90' />
          <MiniBlock className='h-1 w-[85%] opacity-40' />
        </div>
      </div>
    );
  }
  if (id === 6) {
    return (
      <div className='flex h-full gap-1.5 p-2'>
        <span className='w-0.5 self-stretch rounded-full bg-current opacity-70' />
        <div className='flex flex-1 flex-col justify-center gap-1'>
          <MiniBlock className='h-0.5 w-6 opacity-50' />
          <MiniBlock className='h-2 w-[75%] opacity-90' />
          <MiniBlock className='h-4 w-[55%] rounded-sm opacity-30' />
          <MiniBlock className='h-1 w-full opacity-40' />
        </div>
      </div>
    );
  }
  // Portrait lead
  return (
    <div className='flex h-full gap-1.5 p-2'>
      <MiniBlock className='h-full w-[40%] rounded-md opacity-35' />
      <div className='flex flex-1 flex-col justify-center gap-1'>
        <MiniBlock className='h-0.5 w-6 opacity-50' />
        <MiniBlock className='h-2 w-[90%] opacity-90' />
        <MiniBlock className='h-0.5 w-8 opacity-60' />
        <MiniBlock className='h-1 w-full opacity-40' />
        <MiniBlock className='h-1 w-[75%] opacity-30' />
      </div>
    </div>
  );
}

export function AboutLayoutPicker({
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
          {ABOUT_LAYOUTS.map((layout) => {
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
                  <AboutLayoutSketch id={layout.id} />
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
            {ABOUT_LAYOUTS.find((l) => l.id === value)?.name ?? 'About'} · as on
            your public page
          </div>
          <div className='p-5 md:p-7'>
            <AboutSection
              section={previewSection}
              portfolio={{ title: portfolioTitle, slug: portfolioSlug }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
