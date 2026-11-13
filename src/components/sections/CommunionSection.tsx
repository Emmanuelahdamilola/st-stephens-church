import { communion } from "@/data/communion";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ParallaxBg } from "@/components/ui/ParallaxBg";
import { Reveal } from "@/components/ui/Reveal";

export function CommunionSection() {
  return (
    <section data-dark className="relative isolate overflow-hidden py-32 text-center text-white">
      <ParallaxBg src={images.worshipProcession.src} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-dark/85" />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 0%, rgb(var(--color-secondary) / 0.25), transparent 60%)" }} />
      <Container className="relative">
        <Reveal>
          <span aria-hidden className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-secondary text-secondary"><Icon name="cross" className="h-8 w-8" /></span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Sacrament</p>
          <h2 className="mt-4 font-heading text-4xl sm:text-6xl">Holy Communion</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">{communion.message}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-secondary/50 px-5 py-2 text-sm text-secondary"><Icon name="clock" className="h-4 w-4" />{communion.sections[0].body}</p>
          <div className="mt-10"><Button href="/holy-communion" variant="outlineLight">Learn More</Button></div>
        </Reveal>
      </Container>
    </section>
  );
}