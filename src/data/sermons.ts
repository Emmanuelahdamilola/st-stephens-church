import type { Sermon } from "@/types/content";
import { images } from "./images";

// SAMPLE ENTRIES so the layout can be seen. Replace with real sermons from the backend.
// TODO: Replace mock sermons with API
export const sermons: Sermon[] = [
  { id: "sample-1", image: images.preaching.src, title: "Sample sermon title", speaker: "To be announced", date: "2026-01-04", series: "Sample series", category: "Sunday Worship", description: "Sample description. The church will add real sermons." },
  { id: "sample-2", image: images.worshipProcession.src, title: "Another sample sermon", speaker: "To be announced", date: "2026-01-11", series: "Sample series", category: "Sunday Worship", description: "Sample description. The church will add real sermons." },
  { id: "sample-3", image: images.congregation.src, title: "A third sample sermon", speaker: "To be announced", date: "2026-01-18", series: "Another series", category: "Special Service", description: "Sample description. The church will add real sermons." },
];
