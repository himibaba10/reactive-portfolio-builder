import { marqueeItems } from "@/lib/landing-content";

export function MarqueeSection() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <section
      data-marquee
      aria-label="Product highlights"
      className="relative border-y border-[color:var(--line)] bg-[var(--panel)] py-5 overflow-hidden"
    >
      <div data-marquee-track className="flex w-max gap-10 whitespace-nowrap will-change-transform">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-10 font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--foam)] md:text-4xl"
          >
            {item}
            <span className="text-[var(--signal)]" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
