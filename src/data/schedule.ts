import { church } from "./church";

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  note?: string;
}

// The regular weekly programme, as printed on the church bulletin (Sunday worship comes from church.ts).
export const weeklySchedule: ScheduleItem[] = [
  { id: "sunday-worship", day: "Sunday", time: church.service.time, title: church.service.name },
  { id: "bible-study", day: "Monday", time: "3:00 PM", title: "Bible Study", note: "Every Monday" },
  { id: "mothers-union", day: "Monday", time: "4:00 PM", title: "Mothers' Union meeting", note: "First Monday of every month" },
  { id: "womens-meeting", day: "Tuesday", time: "5:00 PM", title: "Women's meeting" },
  { id: "midweek-communion", day: "Wednesday", time: "5:00 PM", title: "Mid-Week Holy Communion", note: "Every Wednesday evening" },
  { id: "guild-meeting", day: "Friday", time: "5:00 PM", title: "Boys', girls' and ladies' guild meeting", note: "Every Friday" },
];