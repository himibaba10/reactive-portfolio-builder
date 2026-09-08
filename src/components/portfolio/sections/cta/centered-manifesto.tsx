import { CtaButton, type CtaFlags } from './shared';

export function CtaCenteredManifesto({
  cta,
  media,
}: {
  cta: CtaFlags;
  media: React.ReactNode;
}) {
  return (
    <section
      id='cta'
      className='space-y-5 border-y border-white/15 py-10 text-center'
    >
      {media ? <div className='mx-auto max-w-lg'>{media}</div> : null}
      {cta.showHeadline && cta.headline ? (
        <h2 className='font-display text-[clamp(2rem,6vw,3.4rem)] tracking-[-0.04em]'>
          {cta.headline}
        </h2>
      ) : null}
      {cta.showBody && cta.body ? (
        <p className='mx-auto max-w-lg text-base text-white/65 whitespace-pre-wrap'>
          {cta.body}
        </p>
      ) : null}
      <div className='flex justify-center'>
        <CtaButton cta={cta} />
      </div>
    </section>
  );
}
