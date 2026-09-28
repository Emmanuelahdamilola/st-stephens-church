import { Icon, type IconName } from "./Icon";
import type { ReactNode } from "react";

// A labelled row with a circular icon — the church's contact/service details use this everywhere
// (Visit section, footer, contact page) so the same information always looks the same.
export function IconRow({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-light text-primary"><Icon name={icon} className="h-5 w-5" /></span>
      <div><p className="text-xs font-bold uppercase tracking-widest text-primary">{label}</p><div className="mt-0.5">{children}</div></div>
    </div>
  );
}
