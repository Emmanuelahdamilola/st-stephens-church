"use client";
import { useLayoutEffect, useState } from "react";

// SSR-safe reduced-motion check. Always starts `false` (matching the server-rendered markup exactly)
// and only flips after mount, so the OS-level preference never causes a hydration mismatch —
// framer-motion's own `useReducedMotion` resolves synchronously on the client, which does not match SSR.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
