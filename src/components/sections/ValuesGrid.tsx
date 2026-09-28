import { church } from "@/data/church";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const valueIcons: Record<string, IconName> = {
  Worship: "music", Fellowship: "users", Service: "heart", "God's love": "sun",
  Faith: "cross", "Holy Scripture": "book", "Compassionate outreach": "globe", Community: "home",
};

// The church's eight values as icon tiles, staggered every other item for an asymmetric rhythm.
// Shared by the homepage About section and the standalone About page so both stay identical.
export function ValuesGrid() {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
      {church.values.map((value, i) => (
        <li key={value} className={i % 2 === 1 ? "sm:mt-8" : ""}>
          <Reveal delay={i * 0.05} className="h-full">
            <div className="group flex h-full flex-col items-center gap-3 rounded-lg bg-white px-4 py-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
              <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-light text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                <Icon name={valueIcons[value] ?? "cross"} className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-sm font-bold leading-snug">{value}</h3>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
