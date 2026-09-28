import type { Metadata } from "next";
import { communion } from "@/data/communion";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = { title: "Holy Communion", description: communion.message, alternates: { canonical: "/holy-communion" } };

export default function HolyCommunionPage() {
  return (
    <>
      <PageHero eyebrow="Sacrament" title="Holy Communion" intro={communion.message} />
      <section className="py-20">
        <Container className="max-w-3xl space-y-10">
          {communion.sections.map((s) => (
            <div key={s.id} id={s.id} className="border-l-2 border-secondary pl-6">
              <h2 className="font-heading text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body || "The church will share this information soon."}</p>
            </div>
          ))}
          {communion.faqs.length > 0 && (<div><h2 className="mb-4 font-heading text-2xl">Frequently asked questions</h2><Accordion items={communion.faqs} /></div>)}
        </Container>
      </section>
    </>
  );
}
