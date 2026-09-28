"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/content";
import { Icon } from "./Icon";

interface Props { images: GalleryImage[]; index: number; onClose: () => void; onChange: (index: number) => void }

export function Lightbox({ images, index, onClose, onChange }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const image = images[index];
  const go = (step: number) => onChange((index + step + images.length) % images.length);

  // Lock page scroll, focus the close button, and give focus back to the thumbnail on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => { document.body.style.overflow = ""; opener?.focus(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Tab") { e.preventDefault(); closeButton.current?.focus(); } // only the close button is tabbable besides arrows
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const nav = "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 text-white hover:bg-white hover:text-dark";

  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" data-dark className="fixed inset-0 z-[70] flex items-center justify-center bg-dark/95 p-4"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touchStartX.current === null) return; const dx = e.changedTouches[0].clientX - touchStartX.current; if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1); touchStartX.current = null; }}>
      <button ref={closeButton} type="button" onClick={onClose} aria-label="Close image viewer" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/40 text-white hover:bg-white hover:text-dark"><Icon name="close" className="h-5 w-5" /></button>
      <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${nav} left-3`}><Icon name="arrowLeft" className="h-5 w-5" /></button>
      <figure className="relative h-[70vh] w-full max-w-4xl">
        {image.src ? <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" /> : <div role="img" aria-label={image.alt} className="h-full w-full bg-gradient-to-br from-primary to-dark" />}
      </figure>
      <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${nav} right-3`}><Icon name="arrowRight" className="h-5 w-5" /></button>
      <p aria-live="polite" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">{index + 1} / {images.length}</p>
    </div>
  );
}
