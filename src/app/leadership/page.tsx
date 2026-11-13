import type { Metadata } from "next";
import { leaders, officers } from "@/data/leaders";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconRow } from "@/components/ui/IconRow";
import { LeaderCard } from "@/components/cards/LeaderCard";

export const metadata: Metadata = { title: "Leadership", description: "Meet the clergy and church officers of St. Stephen's Anglican Church, Agbala Adura.", alternates: { canonical: "/leadership" } };

export default function LeadershipPage() {
  return (
    <>
      <PageHero eyebrow="Shepherds" title="Our Leadership" />
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Clergy" title="Our clergy" className="mb-10" />
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{leaders.map((l) => <li key={l.id}><LeaderCard leader={l} /></li>)}</ul>
        </Container>
      </section>
      <section className="bg-light py-20">
        <Container>
          <SectionHeading eyebrow="Serving the church" title="Church officers" className="mb-10" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((o) => (
              <li key={o.id} className="rounded-lg bg-white p-6 shadow-sm">
                <IconRow icon="users" label={o.title}><span className="font-heading text-lg font-bold">{o.name}</span></IconRow>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}