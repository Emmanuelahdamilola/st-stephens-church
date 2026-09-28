import Link from "next/link";
import type { Ministry } from "@/data/ministries";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  return (
    <Link href={`/ministries/${ministry.slug}`} className="group relative block h-full">
      {/* Outer wrapper stays un-clipped so the floating badge below can overlap outside the photo. */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
          <div className="relative transition-transform duration-700 group-hover:scale-110">
            <Media src={ministry.image} alt={`${ministry.name} ministry`} className="aspect-[4/3]" />
            {!ministry.image && (
              <>
                <div aria-hidden className="pattern-cross absolute inset-0" />
                <Icon name={ministry.icon} className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-white/20" />
              </>
            )}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <span aria-hidden className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-secondary text-ink shadow-md transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon name={ministry.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="px-2 pt-10">
        <h3 className="font-heading text-lg font-bold">{ministry.name}</h3>
        <p className="mt-2 text-sm text-muted">{ministry.description}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          Learn more <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </p>
      </div>
    </Link>
  );
}
