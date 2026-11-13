import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvent, getEvents } from "@/lib/content";
import { formatDate, weekdayName } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() { return (await getEvents()).map((e) => ({ id: e.id })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);
  return event ? { title: event.title, description: event.description, alternates: { canonical: `/events/${id}` } } : {};
}

export default async function EventPage({ params }: Params) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();
  return (
    <>
      <PageHero eyebrow={formatDate(event.date)} title={event.title} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Media src={event.image} alt={event.title} className="aspect-video" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <p className="text-sm uppercase tracking-widest text-primary">{event.time ?? weekdayName(event.date)} · {event.location}</p>
            <p className="mt-5 text-lg">{event.description}</p>
            {event.registerUrl && <div className="mt-8"><Button href={event.registerUrl} variant="primary">Register</Button></div>}
          </div>
        </Container>
      </section>
    </>
  );
}