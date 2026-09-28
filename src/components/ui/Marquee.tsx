import { Icon } from "./Icon";

// Slow scrolling word band. Decorative only (hidden from screen readers); pauses on hover; stops for reduced motion.
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 font-heading text-2xl uppercase tracking-[0.2em] text-secondary sm:text-3xl">
          {item}
          <Icon name="cross" className="h-5 w-5 text-white/40" />
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden data-dark className="marquee overflow-hidden bg-dark py-6">
      <div className="marquee-track flex w-max">{row}{row}</div>
    </div>
  );
}
