import type { Sermon } from "@/types/content";

// No sermons have been supplied yet, so none are listed (the homepage section hides itself and the
// Sermons page shows a "coming soon" message). To add one, copy this entry:
// { id: "first-sunday-of-advent", title: "Sermon title", speaker: "Ven. J.A.O. Oshatimehin", date: "2026-11-29",
//   series: "Series name", category: "Sunday Worship", image: "/images/preaching.jpg",
//   videoUrl: "https://...", audioUrl: "https://...", description: "One or two sentences." },
// TODO: Replace with sermons from the API
export const sermons: Sermon[] = [];