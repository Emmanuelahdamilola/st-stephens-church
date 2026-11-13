import type { Leader } from "@/data/leaders";
import { church } from "@/data/church";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";

type SocialKey = keyof NonNullable<Leader["socials"]>;
const socialIcon: Record<SocialKey, IconName> = { facebook: "facebook", instagram: "instagram", x: "x", youtube: "youtube", email: "mail", phone: "phone" };
const socialName: Record<SocialKey, string> = { facebook: "Facebook", instagram: "Instagram", x: "X", youtube: "YouTube", email: "Email", phone: "Phone" };

export function LeaderCard({ leader }: { leader: Leader }) {
  // A leader with no personal links falls back to the church's own channels on hover.
  const usingChurchLinks = !leader.socials;
  const socials = leader.socials ?? { facebook: church.facebookUrl, email: church.email };
  const subject = usingChurchLinks ? church.name : leader.name;
  const entries = (Object.entries(socials) as [SocialKey, string | undefined][]).filter((e): e is [SocialKey, string] => Boolean(e[1]));

  const hrefFor = (key: SocialKey, value: string) => (key === "email" ? (value.startsWith("mailto:") ? value : `mailto:${value}`) : key === "phone" ? (value.startsWith("tel:") ? value : `tel:${value}`) : value);
  const labelFor = (key: SocialKey) => (key === "phone" ? `Call ${subject}` : key === "email" ? `Email ${subject}` : `${subject} on ${socialName[key]}`);

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
        <Media src={leader.image} alt={`Portrait of ${leader.name}`} className="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 50vw" />
        {!leader.image && <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-light"><Icon name="cross" className="h-20 w-20 text-primary/20" /></div>}
        <div aria-hidden className="absolute inset-0 bg-dark/0 transition-colors duration-500 group-hover:bg-dark/55" />

        {/* Contact column, revealed on hover/focus; stays visible on touch devices. */}
        <ul className="absolute left-4 top-4 flex -translate-x-3 flex-col gap-2 opacity-0 transition-all duration-500 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100">
          {entries.map(([key, value]) => (
            <li key={key}>
              <a href={hrefFor(key, value)} {...(key === "email" || key === "phone" ? {} : { target: "_blank", rel: "noopener noreferrer" })} aria-label={labelFor(key)}
                className="flex h-9 w-9 items-center justify-center border border-white/70 text-white transition-colors hover:bg-secondary hover:text-ink">
                <Icon name={socialIcon[key]} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>

        <span aria-hidden className="badge-drop absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-secondary text-ink shadow-md"><Icon name="book" className="h-4 w-4" /></span>

        {/* Name/role caption bar, always visible on the photo itself. Right padding keeps text clear of the badge. */}
        <div className="absolute inset-x-0 bottom-0 bg-dark/90 py-3 pl-4 pr-16">
          <h3 className="font-heading text-lg font-bold leading-tight text-white">{leader.name}</h3>
          <p className="mt-0.5 text-xs font-bold uppercase tracking-widest text-secondary">{leader.title}</p>
          {leader.credentials && <p className="mt-0.5 text-[11px] text-white/70">{leader.credentials}</p>}
        </div>
      </div>
      {leader.bio && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-primary">Read profile</summary>
          <p className="mt-2 text-sm text-muted">{leader.bio}</p>
        </details>
      )}
    </div>
  );
}