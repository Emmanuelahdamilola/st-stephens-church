import Link from "next/link";
import type { ChurchEvent } from "@/types/content";
import { dateParts, weekdayName } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";

export function EventCard({ event }: { event: ChurchEvent }) {
  const { day, month } = dateParts(event.date);
  // The church programme lists dates only, so without a start time we show the day of the week instead.
  const when = event.time ?? weekdayName(event.date);
  return (
    <Link href={`/events/${event.id}`} className="group relative block h-full pt-6">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
        <div className="relative transition-transform duration-700 group-hover:scale-110">
          <Media src={event.image} alt={event.title} className="aspect-video" />
          {!event.image && (
            <>
              <div aria-hidden className="pattern-cross absolute inset-0" />
              <Icon name="calendar" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white/20" />
            </>
          )}
        </div>
      </div>
      <span aria-hidden className="badge-drop absolute left-6 top-0 flex h-16 w-16 flex-col items-center justify-center bg-primary text-white shadow-lg">
        <span className="flex flex-col items-center">
          <span className="font-heading text-xl font-bold leading-none">{day}</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase leading-none">{month}</span>
        </span>
      </span>
      <div className="px-2 pt-5">
        <h3 className="font-heading text-lg font-bold leading-snug">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Icon name={event.time ? "clock" : "calendar"} className="h-4 w-4 text-primary" />{when}</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted"><Icon name="pin" className="h-4 w-4 text-primary" />{event.location}</p>
        <p className="mt-3 text-sm">{event.description}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">View details <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1.5" /></p>
      </div>
    </Link>
  );
}