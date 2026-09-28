import Link from "next/link";
import { church } from "@/data/church";
import { ministries } from "@/data/ministries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const quickLinks = [
  ["Home", "/"], ["About", "/about"], ["Sermons", "/sermons"], ["Ministries", "/ministries"], ["Events", "/events"],
  ["Holy Communion", "/holy-communion"], ["Prayer", "/prayer"], ["Give", "/give"], ["Contact", "/contact"],
] as const;

const heading = "mb-5 text-xs font-bold uppercase tracking-[0.25em] text-secondary";
const link = "group flex items-center gap-2 text-sm text-white/80 transition-all hover:translate-x-1 hover:text-secondary";
const social = "flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-secondary hover:bg-secondary hover:text-ink";

export function Footer() {
  return (
    <footer data-dark className="pattern-cross relative mt-12 bg-dark pt-24 text-white">
      {/* Contact callout that overlaps the top edge of the footer, echoing the page-header badge motif. */}
      <div className="absolute inset-x-0 -top-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-lg bg-primary px-8 py-8 shadow-2xl sm:flex-row">
            <div>
              <p className="font-heading text-2xl font-bold">Come worship with us</p>
              <p className="mt-1 text-white/85">{church.service.name} · {church.service.day} · {church.service.time}</p>
            </div>
            <Link href="/plan-a-visit" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-ink transition hover:brightness-95">
              Plan Your Visit <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>

      <Container className="grid gap-12 pb-16 pt-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <span aria-hidden className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-secondary text-secondary"><Icon name="cross" className="h-6 w-6" /></span>
          <p className="font-heading text-xl font-bold">{church.name}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-secondary">{church.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">{church.description}</p>
          <div className="mt-6 flex gap-3">
            <a href={church.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`${church.name} on Facebook`} className={social}><Icon name="facebook" className="h-4 w-4" /></a>
            <a href={`mailto:${church.email}`} aria-label={`Email ${church.name}`} className={social}><Icon name="mail" className="h-4 w-4" /></a>
          </div>
        </div>
        <nav aria-label="Quick links">
          <h2 className={heading}>Quick Links</h2>
          <ul className="space-y-2.5">{quickLinks.map(([l, h]) => <li key={h}><Link href={h} className={link}><Icon name="arrowRight" className="h-3.5 w-3.5 text-secondary" />{l}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Ministries">
          <h2 className={heading}>Ministries</h2>
          <ul className="space-y-2.5">{ministries.map((m) => <li key={m.id}><Link href={`/ministries/${m.slug}`} className={link}><Icon name="arrowRight" className="h-3.5 w-3.5 text-secondary" />{m.name}</Link></li>)}</ul>
        </nav>
        <div className="space-y-8 text-sm text-white/80">
          <div>
            <h2 className={heading}>Visit Us</h2>
            <address className="flex gap-3 not-italic leading-relaxed"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /><span>{church.address.street}<br />{church.address.town}<br />{church.address.region}, {church.address.country}</span></address>
            <p className="mt-3 flex gap-3"><Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /><span>{church.service.name}<br />{church.service.time}</span></p>
          </div>
          <div>
            <h2 className={heading}>Connect</h2>
            <p className="flex gap-3"><Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /><a className="break-all underline underline-offset-4 hover:text-secondary" href={`mailto:${church.email}`}>{church.email}</a></p>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {church.name}. All Rights Reserved.</p>
          <p className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary">Terms</Link>
            <a href="#main" aria-label="Back to top" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white hover:bg-secondary hover:text-ink"><Icon name="arrowUp" className="h-4 w-4" /></a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
