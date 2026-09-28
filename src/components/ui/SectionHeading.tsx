interface Props {
  eyebrow: string;
  title: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

// Kicker + bold sans title + a short double-dash rule underneath.
export function SectionHeading({ eyebrow, title, tone = "light", align = "left", className = "" }: Props) {
  const dark = tone === "dark";
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <p className={`mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${center ? "justify-center" : ""} ${dark ? "text-secondary" : "text-primary"}`}>
        <span aria-hidden className={`h-px w-6 ${dark ? "bg-secondary" : "bg-primary"}`} />
        {eyebrow}
      </p>
      <h2 className={`font-heading text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      <span aria-hidden className={`mt-4 flex gap-1.5 ${center ? "justify-center" : ""}`}>
        <span className="h-1 w-7 rounded-full bg-secondary" />
        <span className={`h-1 w-3 rounded-full ${dark ? "bg-white/30" : "bg-primary/25"}`} />
      </span>
    </div>
  );
}
