import type { Metadata } from "next";
import { ministries } from "@/data/ministries";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MinistryCard } from "@/components/cards/MinistryCard";

export const metadata: Metadata = { title: "Ministries", description: "Ministries of St. Stephen's Anglican Church.", alternates: { canonical: "/ministries" } };

export default function MinistriesPage() {
  return (
    <>
      <PageHero eyebrow="Get involved" title="Our Ministries" />
      <section className="py-20"><Container><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{ministries.map((m) => <MinistryCard key={m.id} ministry={m} />)}</div></Container></section>
    </>
  );
}
