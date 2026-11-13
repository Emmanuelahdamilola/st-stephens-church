import type { ChurchEvent } from "@/types/content";
import { church } from "./church";

// The church programme for 2026, as printed on the church bulletin. The bulletin gives dates only, so
// no start times are shown (add `time: "9:00 AM"` to an entry once the church confirms one).
// The bulletin also lists a "Sisters Anniversary" with no date; add it here once a date is known.
// TODO: Connect events to database
const programme = (id: string, title: string, date: string): ChurchEvent => ({
  id,
  title,
  date,
  location: church.name,
  description: "Part of the church programme for 2026.",
});

export const events: ChurchEvent[] = [
  programme("group-1-anniversary-2026", "Group 1 Anniversary", "2026-04-12"),
  programme("fathers-day-men-anniversary-2026", "Father's Day / Men Anniversary", "2026-06-21"),
  programme("group-2-anniversary-2026", "Group 2 Anniversary", "2026-07-12"),
  programme("group-3-anniversary-2026", "Group 3 Anniversary", "2026-09-27"),
  programme("women-anniversary-2026", "Women Anniversary", "2026-10-04"),
  programme("choir-anniversary-2026", "Choir Anniversary", "2026-10-18"),
  programme("guild-of-stewards-and-wardens-anniversary-2026", "Guild of Stewards and Wardens Anniversary", "2026-10-25"),
  programme("youth-harvest-anniversary-fyb-thanksgiving-2026", "Youth Harvest / Anniversary / FYB Thanksgiving", "2026-11-15"),
  programme("adult-harvest-2026", "Adult Harvest", "2026-11-22"),
  programme("group-4-anniversary-2026", "Group 4 Anniversary", "2026-12-06"),
  programme("christmas-carol-2026", "Christmas Carol", "2026-12-20"),
  programme("st-stephens-day-love-feast-2026", "St. Stephen's Day & Love Feast", "2026-12-26"),
];