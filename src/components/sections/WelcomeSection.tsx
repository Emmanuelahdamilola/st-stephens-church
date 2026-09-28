import { church } from "@/data/church";
import { images } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Asymmetric split: an offset photo pair on a dot-grid field, narrower text column beside it.
// The photo stack sits in its own fixed-width box so the accent image's percentage sizing and the
// badge's offsets are always relative to that one box, not the fluid grid column.
export function WelcomeSection() {
  return (
    <section className="overflow-hidden py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <span aria-hidden className="pattern-dots absolute -left-5 -top-5 h-28 w-28 text-primary/25" />
          <div className="relative">
            <ImageReveal>
              <Media src={images.congregation.src} alt={images.congregation.alt} className="aspect-[4/3] rounded-lg" sizes="(min-width: 1024px) 40vw, 90vw" />
            </ImageReveal>
            <ImageReveal className="absolute -bottom-8 -right-8 w-2/5 rounded-lg border-4 border-background shadow-2xl" delay={0.3}>
              <Media src={images.churchBuilding.src} alt={images.churchBuilding.alt} className="aspect-square rounded-lg" sizes="(min-width: 1024px) 16vw, 40vw" />
            </ImageReveal>
          </div>
          <div data-dark className="absolute -top-6 -left-6 hidden items-center gap-3 rounded-lg bg-dark px-5 py-4 text-white shadow-xl sm:flex">
            <Icon name="cross" className="h-6 w-6 text-secondary" />
            <div><p className="text-[10px] uppercase tracking-[0.25em] text-secondary">Every Sunday</p><p className="font-heading text-xl font-bold">{church.service.time}</p></div>
          </div>
        </div>

        <Reveal>
          <SectionHeading eyebrow="Welcome" title="Welcome to St. Stephen's Anglican Church" />
          <p className="mt-8 text-lg leading-relaxed">{church.intro}</p>
          <p className="mt-5 leading-relaxed text-muted">{church.description}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {([["music", "Worship"], ["users", "Fellowship"], ["heart", "Service"]] as const).map(([icon, label]) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-primary/25 bg-light px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Icon name={icon} className="h-4 w-4" />{label}
              </li>
            ))}
          </ul>
          <div className="mt-9"><Button href="/about" variant="secondary">Discover Our Story</Button></div>
        </Reveal>
      </Container>
    </section>
  );
}
