import { Container } from "./Container";
import { Badge } from "./Badge";

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section data-dark className="pattern-cross relative overflow-hidden bg-dark pb-16 pt-40 text-white">
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 0%, rgb(var(--color-primary) / 0.55), transparent 60%)" }} />
      <Container className="relative">
        <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-secondary">
          <span aria-hidden className="h-px w-8 bg-secondary" />{eyebrow}
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-white/80">{intro}</p>}
      </Container>
      {/* Teardrop badge overlapping the bottom edge of the banner — the reference's signature page-header detail. */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2"><Badge icon="cross" tone="secondary" size="h-14 w-14" /></div>
    </section>
  );
}
