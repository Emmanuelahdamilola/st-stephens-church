import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSermon, getSermons } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconRow } from "@/components/ui/IconRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SermonCard } from "@/components/cards/SermonCard";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() { return (await getSermons()).map((s) => ({ id: s.id })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const sermon = await getSermon(id);
  return sermon ? { title: sermon.title, description: sermon.description, alternates: { canonical: `/sermons/${id}` } } : {};
}

export default async function SermonPage({ params }: Params) {
  const { id } = await params;
  const sermon = await getSermon(id);
  if (!sermon) notFound();

  // Newest first, so "previous" = the next-newer sermon and "next" = the next-older one.
  const all = (await getSermons()).sort((a, b) => b.date.localeCompare(a.date));
  const index = all.findIndex((s) => s.id === id);
  const newer = index > 0 ? all[index - 1] : undefined;
  const older = index < all.length - 1 ? all[index + 1] : undefined;
  const related = all.filter((s) => s.id !== id).slice(0, 3);

  const facts: [IconName, string, string][] = [
    ["users", "Sermon by", sermon.speaker],
    ["calendar", "Date", formatDate(sermon.date)],
    ...(sermon.series ? [["book", "Series", sermon.series] as [IconName, string, string]] : []),
    ...(sermon.category ? [["cross", "Category", sermon.category] as [IconName, string, string]] : []),
  ];
  const action = "flex items-center gap-3 rounded bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-dark";

  return (
    <>
      <PageHero eyebrow={sermon.series ?? "Sermon"} title={sermon.title} />
      <article className="py-20">
        <Container className="max-w-4xl">
          <div className="overflow-hidden rounded-lg shadow-lg"><Media src={sermon.image} alt={`${sermon.title} cover`} className="aspect-video" sizes="(min-width: 1024px) 60vw, 100vw" /></div>

          {/* Watch / listen bar, echoing the reference's split "Watch Now" panel. Buttons appear only for media that exists. */}
          <div data-dark className="relative -mt-8 mx-4 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-primary px-6 py-5 text-white shadow-xl sm:mx-10">
            <p className="font-heading text-lg font-bold">{sermon.videoUrl || sermon.audioUrl ? "Watch or listen" : "Media coming soon"}</p>
            <div className="flex flex-wrap gap-3">
              {sermon.videoUrl && <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer" className={action}><Icon name="play" className="h-4 w-4" />Watch now</a>}
              {sermon.audioUrl && <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer" className={action}><Icon name="headphones" className="h-4 w-4" />Listen</a>}
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {facts.map(([icon, label, value]) => <IconRow key={label} icon={icon} label={label}>{value}</IconRow>)}
          </div>

          {sermon.description && <p className="mt-10 border-t border-light pt-10 text-lg leading-relaxed">{sermon.description}</p>}

          <nav aria-label="More sermons" className="mt-14 flex flex-wrap justify-between gap-4">
            {newer ? <Link href={`/sermons/${newer.id}`} className="flex items-center gap-2 rounded bg-dark px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary"><Icon name="arrowLeft" className="h-4 w-4" />Newer sermon</Link> : <span />}
            {older ? <Link href={`/sermons/${older.id}`} className="flex items-center gap-2 rounded bg-dark px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-primary">Older sermon<Icon name="arrowRight" className="h-4 w-4" /></Link> : <span />}
          </nav>
        </Container>

        {related.length > 0 && (
          <Container className="mt-24">
            <SectionHeading eyebrow="Keep listening" title="More sermons" className="mb-10" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((s) => <SermonCard key={s.id} sermon={s} />)}</div>
          </Container>
        )}
      </article>
    </>
  );
}