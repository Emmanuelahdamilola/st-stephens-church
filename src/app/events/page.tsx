import type { Metadata } from "next";
import { getEvents } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "@/components/cards/EventCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Events", description: "Upcoming and past events at St. Stephen's Anglican Church.", alternates: { canonical: "/events" } };

// Upcoming vs past depends on today's date, so refresh this page hourly.
export const revalidate = 3600;

export default async function EventsPage() {
  const all = await getEvents();
  const cutoff = Date.now() - 86_400_000; // an event stays "upcoming" through its day
  const upcoming = all.filter((e) => new Date(e.date).getTime() >= cutoff).sort((a, b) => a.date.localeCompare(b.date));
  const past = all.filter((e) => new Date(e.date).getTime() < cutoff).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow="What's on" title="Events" />
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Calendar" title="Upcoming events" className="mb-10" />
          {upcoming.length === 0 ? <EmptyState title="No upcoming events yet." message="Check back soon for what's happening at St. Stephen's Anglican Church." /> : <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((e) => <EventCard key={e.id} event={e} />)}</div>}
          {past.length > 0 && (<><SectionHeading eyebrow="Archive" title="Past events" className="mb-10 mt-20" /><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{past.map((e) => <EventCard key={e.id} event={e} />)}</div></>)}
        </Container>
      </section>
    </>
  );
}