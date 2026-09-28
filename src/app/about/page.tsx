import type { Metadata } from "next";
import { church } from "@/data/church";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { ValuesGrid } from "@/components/sections/ValuesGrid";

export const metadata: Metadata = { title: "About", description: church.description, alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A Community Rooted in Faith" intro={church.intro} />
      <section className="bg-light py-20">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed">{church.description}</p>
        </Container>
        <Container className="mt-12"><ValuesGrid /></Container>
      </section>
      <section id="story" className="scroll-mt-24 py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Media src={images.churchBuilding.src} alt={images.churchBuilding.alt} className="aspect-[4/3] rounded-lg" sizes="(min-width: 1024px) 45vw, 90vw" />
          <div>
            <SectionHeading eyebrow="History" title="Our Story" className="mb-6" />
            <p className="text-muted">The story of St. Stephen&apos;s Anglican Church will be shared here once the church provides it.</p>
          </div>
        </Container>
      </section>
      <section id="beliefs" className="scroll-mt-24 py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Faith" title="What We Believe" className="mb-6" />
          <p className="text-lg">Our life together is rooted in the truth of Holy Scripture.</p>
          <p className="mt-3 text-muted">A fuller statement of belief will be added when the church supplies it.</p>
          <div className="mt-8"><Button href="/plan-a-visit" variant="primary">Plan Your Visit</Button></div>
        </Container>
      </section>
    </>
  );
}
