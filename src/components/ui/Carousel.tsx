"use client";
import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "./Icon";

interface Props {
  label: string;      // e.g. "Our ministries"
  itemLabel: string;  // singular, e.g. "ministry" -> "Previous ministry"
  children: ReactNode;
  slideClassName?: string;
}

// Shared carousel for ministries, sermons, events, testimonials. Swipe, drag, arrow keys and diamond controls all work.
export function Carousel({ label, itemLabel, children, slideClassName = "basis-[82%] sm:basis-1/2 lg:basis-1/3" }: Props) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const slides = Children.toArray(children);

  useEffect(() => {
    if (!api) return;
    const update = () => { setCanPrev(api.canScrollPrev()); setCanNext(api.canScrollNext()); };
    update();
    api.on("select", update).on("reInit", update);
    return () => { api.off("select", update).off("reInit", update); };
  }, [api]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") api?.scrollPrev();
    if (e.key === "ArrowRight") api?.scrollNext();
  }, [api]);

  const arrow = "btn-diamond flex h-9 w-9 items-center justify-center border-2 border-primary text-primary transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-3">
        <button type="button" className={arrow} aria-label={`Previous ${itemLabel}`} disabled={!canPrev} onClick={() => api?.scrollPrev()}><Icon name="arrowLeft" className="h-3.5 w-3.5" /></button>
        <button type="button" className={arrow} aria-label={`Next ${itemLabel}`} disabled={!canNext} onClick={() => api?.scrollNext()}><Icon name="arrowRight" className="h-3.5 w-3.5" /></button>
      </div>
      {/* The mobile basis (82%) leaves part of the next card visible. */}
      <div ref={viewportRef} className="overflow-hidden" tabIndex={0} onKeyDown={onKeyDown} aria-label={`${label}. Use left and right arrow keys.`}>
        <ul className="-ml-6 flex">
          {slides.map((slide, i) => (
            <li key={i} className={`min-w-0 shrink-0 grow-0 pl-6 ${slideClassName}`} aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>{slide}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
