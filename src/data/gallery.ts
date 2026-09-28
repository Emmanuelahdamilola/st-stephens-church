import type { GalleryImage } from "@/types/content";
import { images } from "./images";

export const galleryCategories = ["Worship", "Fellowship", "Community", "Youth", "Children", "Outreach", "Special Events"] as const;

// Real photos only. The gallery page shows a category tab only once it has at least one photo.
export const galleryImages: GalleryImage[] = [
  { id: "worship-procession", category: "Worship", src: images.worshipProcession.src, alt: images.worshipProcession.alt },
  { id: "choir-procession", category: "Worship", src: images.choirProcession.src, alt: images.choirProcession.alt },
  { id: "preaching", category: "Worship", src: images.preaching.src, alt: images.preaching.alt },
  { id: "congregation", category: "Fellowship", src: images.congregation.src, alt: images.congregation.alt },
  { id: "speaker", category: "Fellowship", src: images.speaker.src, alt: images.speaker.alt },
  { id: "church-building", category: "Community", src: images.churchBuilding.src, alt: images.churchBuilding.alt },
  { id: "clergy-group", category: "Outreach", src: images.clergyGroup.src, alt: images.clergyGroup.alt },
];
