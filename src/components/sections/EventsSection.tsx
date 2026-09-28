import Link from "next/link";
import { getEvents } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "@/components/cards/EventCard";

export async function EventsSection() {
  const events = (await getEvents()).filter((e) => new Date(e.date).getTime() >= Date.now() - 86_400_000).sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section className="bg-light py-24">
      <Container>
        <Reveal><SectionHeading eyebrow="What's on" title="Upcoming Events" className="mb-10" /></Reveal>
        {events.length === 0 ? (
          <EmptyState title="No upcoming events yet." message="Check back soon for what's happening at St. Stephen's Anglican Church." />
        ) : (
          <Carousel label="Upcoming events" itemLabel="event">{events.map((e) => <EventCard key={e.id} event={e} />)}</Carousel>
        )}
        <p className="mt-8"><Link href="/events" className="text-xs font-semibold uppercase tracking-widest text-primary underline underline-offset-4">All events</Link></p>
      </Container>
    </section>
  );
}
