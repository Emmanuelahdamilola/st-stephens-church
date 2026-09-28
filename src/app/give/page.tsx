import type { Metadata } from "next";
import { givingOptions } from "@/data/giving";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Give", description: "Give with purpose to St. Stephen's Anglican Church.", alternates: { canonical: "/give" } };

export default function GivePage() {
  return (
    <>
      <PageHero eyebrow="Generosity" title="Give with Purpose" intro="Your generosity helps sustain worship, fellowship, and outreach in our community." />
      <section className="py-20">
        <Container className="grid max-w-4xl gap-6 md:grid-cols-2">
          {givingOptions.map((o) => (
            <div key={o.id} className="border border-primary/30 bg-white p-8">
              <h2 className="font-heading text-2xl">{o.title}</h2>
              <p className="mt-2 text-muted">{o.description}</p>
              {/* TODO: Connect giving button to payment gateway (o.href) */}
              <button type="button" disabled className="mt-6 cursor-not-allowed bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-ink opacity-60">Give Now</button>
              <p className="mt-3 text-xs text-muted">Online giving is not available yet.</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
