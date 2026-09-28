import Link from "next/link";
import type { ChurchEvent } from "@/types/content";
import { dateParts } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";

export function EventCard({ event }: { event: ChurchEvent }) {
  const { day, month } = dateParts(event.date);
  return (
    <Link href={`/events/${event.id}`} className="group relative block h-full pt-6">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
        <div className="overflow-hidden"><div className="transition-transform duration-700 group-hover:scale-110"><Media src={event.image} alt={event.title} className="aspect-video" /></div></div>
      </div>
      <span aria-hidden className="badge-drop absolute left-6 top-0 flex h-16 w-16 flex-col items-center justify-center bg-primary text-white shadow-lg">
        <span className="font-heading text-xl font-bold leading-none">{day}</span>
        <span className="text-[10px] font-semibold uppercase leading-none">{month}</span>
      </span>
      <div className="px-2 pt-5">
        <h3 className="font-heading text-lg font-bold leading-snug">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Icon name="clock" className="h-4 w-4 text-primary" />{event.time}</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted"><Icon name="pin" className="h-4 w-4 text-primary" />{event.location}</p>
        <p className="mt-3 text-sm">{event.description}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">View details <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1.5" /></p>
      </div>
    </Link>
  );
}
