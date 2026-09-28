import { images } from "./images";

export interface HeroSlide {
  id: string;
  image?: string;   // path in /public. Without one, the branded gradient is used.
  imageAlt?: string;
  heading?: string; // optional extra line under the tagline
  text: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

// Wording comes from the church's supplied description. Add or remove slides freely;
// with a single slide the carousel controls disappear.
export const heroSlides: HeroSlide[] = [
  {
    id: "welcome",
    image: images.churchBuilding.src,
    imageAlt: images.churchBuilding.alt,
    text: "A vibrant community of believers dedicated to worship, fellowship, and service.",
    primaryCta: { label: "Plan Your Visit", href: "/plan-a-visit" },
    secondaryCta: { label: "Discover Our Church", href: "/about" },
  },
  {
    id: "belonging",
    image: images.worshipProcession.src,
    imageAlt: images.worshipProcession.alt,
    text: "A welcoming place where everyone can find support, inspiration, and a sense of belonging.",
    primaryCta: { label: "Plan Your Visit", href: "/plan-a-visit" },
    secondaryCta: { label: "Our Ministries", href: "/ministries" },
  },
  {
    id: "scripture",
    image: images.choirProcession.src,
    imageAlt: images.choirProcession.alt,
    text: "Sharing God's love and growing in faith through compassionate outreach, rooted in the truth of Holy Scripture.",
    primaryCta: { label: "Plan Your Visit", href: "/plan-a-visit" },
    secondaryCta: { label: "Watch Sermons", href: "/sermons" },
  },
];
