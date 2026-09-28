import type { Sermon } from "@/types/content";
import { formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";

// Three small square media buttons sit on the image, echoing the reference's watch/listen/read icon row.
export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <article className="group h-full overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-500 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-700 group-hover:scale-110"><Media src={sermon.image} alt={`${sermon.title} cover`} className="aspect-video" /></div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {(["play", "headphones", "book"] as const).map((icon) => (
            <span key={icon} aria-hidden className="flex h-9 w-9 items-center justify-center rounded bg-primary/90 text-white shadow"><Icon name={icon} className="h-4 w-4" /></span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted"><Icon name="calendar" className="h-4 w-4 text-primary" />{[sermon.series, formatDate(sermon.date)].filter(Boolean).join(" · ")}</p>
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug">{sermon.title}</h3>
        <p className="mt-1 text-sm text-muted">Sermon by {sermon.speaker}</p>
        {sermon.description && <p className="mt-3 text-sm">{sermon.description}</p>}
        <div className="mt-5 flex gap-6 border-t border-light pt-4">
          {sermon.videoUrl && <a href={sermon.videoUrl} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer"><Icon name="play" className="h-3.5 w-3.5" />Watch</a>}
          {sermon.audioUrl && <a href={sermon.audioUrl} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer"><Icon name="headphones" className="h-4 w-4" />Listen</a>}
          {!sermon.videoUrl && !sermon.audioUrl && <span className="text-xs text-muted">Media coming soon</span>}
        </div>
      </div>
    </article>
  );
}
