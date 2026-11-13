import { weeklySchedule } from "@/data/schedule";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// The regular weekly programme. `className` sets the section background so it can alternate with its neighbours.
export function WeeklySchedule({ className = "" }: { className?: string }) {
  return (
    <section className={`py-20 ${className}`}>
      <Container className="max-w-4xl">
        <Reveal><SectionHeading eyebrow="Through the week" title="Weekly programme" className="mb-10" /></Reveal>
        <ul className="divide-y divide-primary/15 overflow-hidden rounded-lg bg-white shadow-md">
          {weeklySchedule.map((item) => (
            <li key={item.id} className="grid grid-cols-[7rem_1fr] items-center gap-x-5 gap-y-1 p-5 sm:grid-cols-[8rem_7.5rem_1fr]">
              <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary">{item.day}</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold"><Icon name="clock" className="h-4 w-4 text-primary" />{item.time}</span>
              <span className="col-span-2 sm:col-span-1">
                <span className="font-semibold">{item.title}</span>
                {item.note && <span className="block text-xs text-muted">{item.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}