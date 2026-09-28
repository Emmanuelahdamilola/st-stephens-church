import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/content";
import { galleryCategories } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export const metadata: Metadata = { title: "Gallery", description: "Photos from the life of St. Stephen's Anglican Church.", alternates: { canonical: "/gallery" } };

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return (
    <>
      <PageHero eyebrow="Life together" title="Gallery" />
      <section className="py-20"><Container><GalleryGrid images={images} categories={galleryCategories.filter((c) => images.some((i) => i.category === c))} /></Container></section>
    </>
  );
}
