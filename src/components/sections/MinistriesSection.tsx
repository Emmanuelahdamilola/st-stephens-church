import { ministries } from "@/data/ministries";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { MinistryCard } from "@/components/cards/MinistryCard";

export function MinistriesSection() {
  return (
    <section className="bg-light py-24">
      <Container>
        <Reveal><SectionHeading eyebrow="Get involved" title="Our Ministries" className="mb-10" /></Reveal>
        <Carousel label="Our ministries" itemLabel="ministry">
          {ministries.map((m) => <MinistryCard key={m.id} ministry={m} />)}
        </Carousel>
      </Container>
    </section>
  );
}
