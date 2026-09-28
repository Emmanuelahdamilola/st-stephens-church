import Link from "next/link";
import { church } from "@/data/church";
import { getEvents } from "@/lib/content";
import { dateParts } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

// Cards that overlap the bottom edge of the hero. With real events, up to three appear here;
// with none yet, a single Sunday-service card fills the same spot so the seam is never empty.
export async function EventsOverlap() {
  const events = (await getEvents()).filter((e) => new Date(e.date).getTime() >= Date.now() - 86_400_000).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <section className="relative z-20 -mt-20 sm:-mt-24">
      <Container>
        {events.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => {
              const { day, month } = dateParts(event.date);
              return (
                <li key={event.id}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <Link href={`/events/${event.id}`} className="group relative flex h-full items-start gap-4 rounded-lg bg-white p-6 pt-8 shadow-xl transition-transform duration-300 hover:-translate-y-1.5">
                      <span aria-hidden className="badge-drop absolute -top-5 left-6 flex h-14 w-14 flex-col items-center justify-center bg-primary text-white shadow-md">
                        <span className="font-heading text-lg font-bold leading-none">{day}</span>
                        <span className="text-[9px] font-semibold uppercase leading-none">{month}</span>
                      </span>
                      <div className="pt-2">
                        <p className="inline-flex items-center gap-1.5 rounded-full bg-light px-3 py-1 text-xs font-bold text-primary"><Icon name="clock" className="h-3.5 w-3.5" />{event.time}</p>
                        <h3 className="mt-3 font-heading text-lg font-bold leading-snug">{event.title}</h3>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Icon name="pin" className="h-3.5 w-3.5" />{event.location}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary underline-offset-4 group-hover:underline">Event Details <Icon name="arrowRight" className="h-3.5 w-3.5" /></span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : (
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:text-left">
              <div className="flex items-center gap-5">
                <span aria-hidden className="badge-drop flex h-16 w-16 items-center justify-center bg-primary text-white shadow-md"><Icon name="clock" className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Join us this Sunday</p>
                  <p className="mt-1 font-heading text-3xl font-extrabold">{church.service.time}</p>
                  <p className="mt-1 text-sm text-muted">{church.address.street}, {church.address.town}</p>
                </div>
              </div>
              <Button href="/plan-a-visit" variant="primary">Plan Your Visit</Button>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
