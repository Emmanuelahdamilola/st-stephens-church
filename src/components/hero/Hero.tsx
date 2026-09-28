"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { church } from "@/data/church";
import type { HeroSlide } from "@/data/hero";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 8000;
const [nameLine1, nameLine2] = church.name.split(/ (?=Anglican)/); // "St. Stephen's" / "Anglican Church"

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [userStopped, setUserStopped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [wipe, setWipe] = useState(false); // brief color panel that sweeps across on slide change
  const touchStartX = useRef<number | null>(null);
  const mounted = useRef(false);
  const many = slides.length > 1;
  const slide = slides[index];

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const autoplay = many && !reduce && !userStopped && !hovering && !focused;

  useEffect(() => { mounted.current = true; }, []);
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [autoplay, index, slides.length]);

  const goTo = useCallback((next: number) => {
    if (!reduce) { setWipe(true); setTimeout(() => setWipe(false), 500); }
    setIndex((next + slides.length) % slides.length);
    setUserStopped(true);
  }, [slides.length, reduce]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !many) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(dx > 0 ? index - 1 : index + 1);
    touchStartX.current = null;
  };

  const step = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : delay, ease },
  });
  const slideDelay = mounted.current ? 0.05 : 1.0;
  const control = "flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-dark";

  return (
    <section
      ref={sectionRef}
      data-dark
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-dark text-white"
      {...(many ? { "aria-roledescription": "carousel", "aria-label": `${church.name} highlights` } : {})}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      <motion.div aria-hidden className="absolute inset-x-0 -bottom-[5%] -top-[5%] -z-20" style={{ y: reduce ? 0 : parallaxY }}>
        <AnimatePresence>
          <motion.div key={slide.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0.01 : 1.2, ease }}>
            <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: reduce ? 0.01 : 10, ease: "linear" }}>
              {slide.image ? (
                <Image src={slide.image} alt={slide.imageAlt ?? ""} fill priority={index === 0} sizes="100vw" className="object-cover" />
              ) : (
                <div className="h-full w-full" style={{ background: "radial-gradient(ellipse at 75% 15%, rgb(var(--color-primary)) 0%, rgb(var(--color-dark)) 65%)" }} />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-dark via-dark/70 to-dark/50" />
      <div aria-hidden className="pattern-cross absolute inset-0 -z-10 opacity-60" />
      {/* Brief color panel sweep on manual slide change, echoing the reference's hard-cut transition. */}
      <AnimatePresence>
        {wipe && (
          <motion.div aria-hidden className="absolute inset-0 z-30 bg-primary" initial={{ x: "-100%" }} animate={{ x: "100%" }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} />
        )}
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-40 pt-36 text-center sm:px-8">
        <motion.span {...step(0.3)} className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-secondary/60 text-secondary">
          <Icon name="cross" className="h-7 w-7" />
        </motion.span>
        <motion.p {...step(0.5)} className="text-xs font-bold uppercase tracking-[0.5em] text-secondary sm:text-sm">{church.tagline}</motion.p>

        <h1 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-extrabold uppercase leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          {[nameLine1, nameLine2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span className="block" initial={{ y: reduce ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: reduce ? 0.01 : 0.9, delay: reduce ? 0 : 0.6 + i * 0.15, ease }}>{line}</motion.span>
            </span>
          ))}
        </h1>

        <AnimatePresence mode="wait">
          <motion.div key={slide.id} aria-live={autoplay ? "off" : "polite"}
            {...(many ? { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} of ${slides.length}` } : {})}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : slideDelay, ease }}>
            {slide.heading && <h2 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">{slide.heading}</h2>}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{slide.text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href={slide.primaryCta.href} variant="primary">{slide.primaryCta.label}</Button>
              {slide.secondaryCta && <Button href={slide.secondaryCta.href} variant="outlineLight" arrow={false}>{slide.secondaryCta.label}</Button>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {many && (
        <>
          {/* Edge arrows are a desktop affordance only: on narrow screens the content spans full width,
              so a vertically-centered arrow would sit on top of the text. Mobile relies on swipe + dots. */}
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous slide" className={`${control} absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 sm:left-8 sm:flex`}><Icon name="arrowLeft" className="h-5 w-5" /></button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Next slide" className={`${control} absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:right-8 sm:flex`}><Icon name="arrowRight" className="h-5 w-5" /></button>
          <div className="absolute inset-x-0 bottom-24 z-20 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2" role="group" aria-label="Choose a slide">
              {slides.map((s, i) => (
                <button key={s.id} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1} of ${slides.length}`} aria-current={i === index ? "true" : undefined} className="group p-2">
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-secondary" : "w-2.5 bg-white/40 group-hover:bg-white/70"}`} />
                </button>
              ))}
            </div>
            {!reduce && (
              <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white hover:text-dark" aria-label={userStopped ? "Play slideshow" : "Pause slideshow"} onClick={() => setUserStopped((v) => !v)}>
                <Icon name={userStopped ? "play" : "pause"} className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
