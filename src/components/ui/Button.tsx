import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

// primary (orange) is reserved for high-priority calls to action.
// On hover a colored layer slides across the button and the arrow nudges forward.
const variants = {
  primary: "bg-accent text-ink before:bg-secondary",
  secondary: "border border-primary text-primary before:bg-primary hover:text-white",
  dark: "bg-dark text-white before:bg-primary",
  outlineLight: "border border-white/70 text-white before:bg-white hover:text-dark",
} as const;

interface ButtonProps {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}

export function Button({ href, variant = "dark", children, className = "", arrow = true }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 before:absolute before:inset-0 before:-translate-x-full before:transition-transform before:duration-300 hover:before:translate-x-0 ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-3">
        {children}
        {arrow && <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </Link>
  );
}
