import { church } from "@/data/church";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

// A dark "mission statement" band, styled after the reference's scripture/quote section.
// Uses the church's own supplied wording rather than an invented testimony.
export function QuoteBand() {
  return (
    <section data-dark className="pattern-cross relative overflow-hidden bg-dark py-24 text-center text-white">
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgb(var(--color-primary) / 0.45), transparent 65%)" }} />
      <Container className="relative max-w-3xl">
        <Reveal>
          <span aria-hidden className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-secondary text-secondary shadow-[0_0_40px_-4px_rgb(var(--color-secondary))]">
            <Icon name="quote" className="h-7 w-7" />
          </span>
          <p className="mt-8 font-heading text-2xl font-semibold leading-snug sm:text-3xl">&ldquo;{church.intro}&rdquo;</p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-secondary">Our Mission</p>
        </Reveal>
      </Container>
    </section>
  );
}
