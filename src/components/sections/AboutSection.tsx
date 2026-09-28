import { church } from "@/data/church";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ValuesGrid } from "./ValuesGrid";

// Asymmetric split: a narrower text column beside the staggered value-icon grid.
export function AboutSection() {
  return (
    <section className="bg-light py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading eyebrow="Our story" title="A Community Rooted in Faith" />
          <p className="mt-8 text-lg leading-relaxed">{church.description}</p>
          <div className="mt-8"><Button href="/about" variant="dark">About Our Church</Button></div>
        </Reveal>
        <ValuesGrid />
      </Container>
    </section>
  );
}
