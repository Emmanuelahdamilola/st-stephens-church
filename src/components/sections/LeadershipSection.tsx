import { leaders } from "@/data/leaders";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderCard } from "@/components/cards/LeaderCard";

// Two leaders fit a simple grid. Switch to <Carousel> once the list grows.
export function LeadershipSection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal><SectionHeading eyebrow="Shepherds" title="Our Leadership" className="mb-12" /></Reveal>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <li key={leader.id}><Reveal delay={i * 0.1}><LeaderCard leader={leader} /></Reveal></li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
