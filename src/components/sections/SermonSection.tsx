import Link from "next/link";
import { getSermons } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { SermonCard } from "@/components/cards/SermonCard";

export async function SermonSection() {
  const sermons = (await getSermons()).slice(0, 6);
  if (sermons.length === 0) return null;
  return (
    <section className="py-24">
      <Container>
        <Reveal><SectionHeading eyebrow="Featured sermon" title="Word for the Journey" className="mb-10" /></Reveal>
        <Carousel label="Featured sermons" itemLabel="sermon">
          {sermons.map((s) => <SermonCard key={s.id} sermon={s} />)}
        </Carousel>
        <p className="mt-8"><Link href="/sermons" className="text-xs font-semibold uppercase tracking-widest text-primary underline underline-offset-4">Browse all sermons</Link></p>
      </Container>
    </section>
  );
}
