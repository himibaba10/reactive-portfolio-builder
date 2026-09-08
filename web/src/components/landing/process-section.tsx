import { processSteps } from "@/lib/landing-content";

export function ProcessSection() {
  return (
    <section
      id="process"
      data-process
      className="relative bg-[var(--ink)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-process-sticky className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 text-xs tracking-[0.28em] text-[var(--signal)] uppercase">
            Process
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-[var(--foam)]">
            Three beats.
            <span className="mt-2 block text-[var(--muted)]">Then you&apos;re live.</span>
          </h2>
        </div>

        <ol className="space-y-6 md:space-y-8">
          {processSteps.map((step) => (
            <li
              key={step.index}
              data-process-card
              className="border-t border-[color:var(--line)] pt-6"
            >
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[var(--signal)]">
                  {step.index}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.03em] text-[var(--foam)] md:text-4xl">
                  {step.title}
                </h3>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
