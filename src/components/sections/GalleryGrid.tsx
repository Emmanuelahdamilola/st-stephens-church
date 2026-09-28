"use client";
import { useState } from "react";
import type { GalleryImage } from "@/types/content";
import { Media } from "@/components/ui/Media";
import { Lightbox } from "@/components/ui/Lightbox";

export function GalleryGrid({ images, categories }: { images: GalleryImage[]; categories: readonly string[] }) {
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = category === "All" ? images : images.filter((i) => i.category === category);
  // Alternate tile heights for an editorial, masonry-style rhythm.
  const heights = ["aspect-[3/4]", "aspect-square", "aspect-[4/3]"];

  return (
    <div>
      <div role="group" aria-label="Gallery categories" className="mb-10 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${category === c ? "border-dark bg-dark text-white" : "border-primary text-primary hover:bg-primary hover:text-white"}`}>{c}</button>
        ))}
      </div>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((img, i) => (
          <li key={img.id} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open image: ${img.alt}`} className="group block w-full text-left">
              <Media src={img.src} alt={img.alt} className={heights[i % heights.length]} />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </div>
  );
}
