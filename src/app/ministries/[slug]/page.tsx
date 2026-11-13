import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ministries } from "@/data/ministries";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Icon, type IconName } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { getEvents } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return ministries.map((m) => ({ slug: m.slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  return ministry ? { title: ministry.name, alternates: { canonical: `/ministries/${slug}` } } : {};
}

// Related events depend on today's date, so refresh this page hourly.
export const revalidate = 3600;

const soon = "Details coming soon.";

// Reusable for every ministry: sections fill in automatically when data is added to data/ministries.ts.
export default async function MinistryPage({ params }: Params) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) notFound();
  // TODO: filter by ministry once events are linked to ministries
  const events = (await getEvents()).filter((e) => new Date(e.date).getTime() >= Date.now() - 86_400_000).slice(0, 3);
  const blocks: [IconName, string, string][] = [
    ["cross", "Mission", ministry.mission ?? soon],
    ["users", "Who it serves", ministry.serves ?? soon],
    ["clock", "Meeting information", ministry.meeting ?? soon],
    ["heart", "Leadership", ministry.leaders?.join(", ") ?? soon],
    ["mail", "Contact", ministry.contact ?? soon],
  ];
  return (
    <>
      <PageHero eyebrow="Ministry" title={ministry.name} intro={ministry.description} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-lg">
            <Media src={ministry.image} alt={`${ministry.name} ministry`} className="aspect-[4/3]" />
            {!ministry.image && (
              <>
                <div aria-hidden className="pattern-cross absolute inset-0" />
                <Icon name={ministry.icon} className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-white/20" />
              </>
            )}
          </div>
          <dl className="space-y-6">
            {blocks.map(([icon, t, b]) => (
              <div key={t} className="flex items-start gap-4">
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-light text-primary"><Icon name={icon} className="h-5 w-5" /></span>
                <div><dt className="text-xs font-bold uppercase tracking-widest text-primary">{t}</dt><dd className="mt-0.5">{b}</dd></div>
              </div>
            ))}
          </dl>
        </Container>
        <Container className="mt-20">
          <SectionHeading eyebrow="What's on" title="Related events" className="mb-10" />
          {events.length === 0 ? (
            <EmptyState title="No upcoming events yet." message="Check back soon for what's happening at St. Stephen's Anglican Church." />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{events.map((e) => <EventCard key={e.id} event={e} />)}</div>
          )}
        </Container>
      </section>
    </>
  );
}