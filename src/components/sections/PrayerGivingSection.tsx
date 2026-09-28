import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function PrayerGivingSection() {
  return (
    <section className="grid md:grid-cols-2">
      <div data-dark className="pattern-cross bg-dark px-6 py-24 text-white sm:px-12 lg:px-20">
        <Reveal>
          <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full border border-secondary text-secondary"><Icon name="flame" className="h-6 w-6" /></span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Prayer</p>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl">Need Prayer?</h2>
          <p className="mt-4 max-w-md text-lg text-white/80">You don&apos;t have to walk through it alone.</p>
          <div className="mt-8"><Button href="/prayer" variant="primary">Submit a Prayer Request</Button></div>
        </Reveal>
      </div>
      <div className="bg-light px-6 py-24 sm:px-12 lg:px-20">
        <Reveal delay={0.1}>
          <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full border border-primary text-primary"><Icon name="heart" className="h-6 w-6" /></span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Generosity</p>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl">Give with Purpose</h2>
          <p className="mt-4 max-w-md text-lg text-muted">Your generosity helps sustain worship, fellowship, and outreach in our community.</p>
          <div className="mt-8"><Button href="/give" variant="primary">Give Now</Button></div>
        </Reveal>
      </div>
    </section>
  );
}
