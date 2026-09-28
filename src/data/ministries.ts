import type { IconName } from "@/components/ui/Icon";

export interface Ministry {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: IconName;
  image?: string;
  // Fill these in when the church supplies them; the detail page shows "coming soon" otherwise.
  mission?: string;
  serves?: string;
  meeting?: string;
  leaders?: string[];
  contact?: string;
}

// TODO: Replace mock ministries with API
export const ministries: Ministry[] = [
  { id: "children", name: "Children", slug: "children", icon: "smile", description: "Description coming soon." },
  { id: "women", name: "Women Union & Young Wives", slug: "women-union-young-wives", icon: "heart", description: "Description coming soon." },
  { id: "youth", name: "Youth", slug: "youth", icon: "star", description: "Description coming soon." },
  { id: "prayer-warriors", name: "Prayer Warriors", slug: "prayer-warriors", icon: "flame", description: "Description coming soon." },
  { id: "choir", name: "Choir", slug: "choir", icon: "music", description: "Description coming soon." },
  { id: "brigade", name: "Boys & Girls Brigade", slug: "boys-girls-brigade", icon: "shield", description: "Description coming soon." },
];
