import { Icon, type IconName } from "./Icon";

type Tone = "primary" | "secondary" | "dark";
const tones: Record<Tone, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-ink",
  dark: "bg-dark text-white",
};

// Map-pin/teardrop badge, most often used overlapping the bottom edge of a banner or photo.
export function Badge({ icon, tone = "secondary", size = "h-16 w-16", className = "" }: { icon: IconName; tone?: Tone; size?: string; className?: string }) {
  return (
    <span aria-hidden className={`badge-drop flex ${size} items-center justify-center shadow-lg ${tones[tone]} ${className}`}>
      <Icon name={icon} className="h-6 w-6" />
    </span>
  );
}
