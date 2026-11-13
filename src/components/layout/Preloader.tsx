"use client";
import { useEffect, useState } from "react";
import { church } from "@/data/church";
import { Icon } from "@/components/ui/Icon";
import { PRELOADER_EXIT_MS, PRELOADER_KEY, PRELOADER_MAX_MS, PRELOADER_MIN_MS, PRELOADER_ONCE_PER_SESSION } from "@/lib/preloader";

type Phase = "loading" | "leaving" | "done";

// Branded splash that covers the page until it is ready. It is part of the server-rendered HTML, so it is
// on screen from the very first paint (no flash of half-loaded content). It lifts when the page has loaded
// (images, scripts, fonts), but never sooner than PRELOADER_MIN_MS and never later than PRELOADER_MAX_MS.
// Without JavaScript, the <noscript> rule in the layout hides it so the site is never blocked.
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    let seen = false;
    if (PRELOADER_ONCE_PER_SESSION) {
      try { seen = sessionStorage.getItem(PRELOADER_KEY) === "1"; } catch { /* storage blocked: just show it */ }
    }
    if (seen) { setPhase("done"); return; }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduceMotion ? 300 : PRELOADER_MIN_MS;
    const exitMs = reduceMotion ? 200 : PRELOADER_EXIT_MS;
    const site = document.getElementById("site");
    const root = document.documentElement;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;
    const started = performance.now();

    // While the splash is up: no scrolling, and nothing behind it can be reached with the keyboard or a screen reader.
    root.style.overflow = "hidden";
    site?.setAttribute("inert", "");
    const release = () => { root.style.overflow = ""; site?.removeAttribute("inert"); };

    // The bar eases towards 90% while loading, then completes when the page is ready.
    const ticker = setInterval(() => setProgress((p) => (p < 90 ? p + (90 - p) * 0.08 : p)), 120);

    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(ticker);
      setProgress(100);
      try { sessionStorage.setItem(PRELOADER_KEY, "1"); } catch { /* ignore */ }
      timers.push(setTimeout(() => setPhase("leaving"), 250)); // let the bar visibly complete
      timers.push(setTimeout(() => { setPhase("done"); release(); }, 250 + exitMs));
    };

    const loaded = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    const fontsReady = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const tooSlow = new Promise<void>((resolve) => timers.push(setTimeout(resolve, PRELOADER_MAX_MS)));

    Promise.race([Promise.all([loaded, fontsReady]), tooSlow]).then(() => {
      const wait = Math.max(0, minMs - (performance.now() - started));
      timers.push(setTimeout(finish, wait));
    });

    return () => { clearInterval(ticker); timers.forEach(clearTimeout); release(); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      data-dark
      role="status"
      aria-live="polite"
      className={`preloader pattern-cross fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark text-white transition-transform duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-opacity motion-reduce:duration-200 ${phase === "leaving" ? "-translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0" : ""}`}
    >
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgb(var(--color-primary) / 0.45), transparent 65%)" }} />
      <div className="relative flex flex-col items-center px-6 text-center">
        <span aria-hidden className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-secondary/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-secondary [animation-duration:1.4s]" />
          <Icon name="cross" className="h-8 w-8 text-secondary" />
        </span>
        <p className="mt-8 font-heading text-2xl font-bold sm:text-3xl">{church.name}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.4em] text-secondary">{church.tagline}</p>
        <div aria-hidden className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-secondary transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <span className="sr-only">Loading {church.name}</span>
      </div>
    </div>
  );
}