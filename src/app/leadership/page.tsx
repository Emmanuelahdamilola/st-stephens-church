import type { Metadata } from "next";
import { leaders } from "@/data/leaders";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LeaderCard } from "@/components/cards/LeaderCard";

export const metadata: Metadata = { title: "Leadership", description: "Meet the leadership of St. Stephen's Anglican Church, Agbala Adura.", alternates: { canonical: "/leadership" } };

export default function LeadershipPage() {
  return (
    <>
      <PageHero eyebrow="Shepherds" title="Our Leadership" />
      <section className="py-20"><Container><ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{leaders.map((l) => <li key={l.id}><LeaderCard leader={l} /></li>)}</ul></Container></section>
    </>
  );
}
