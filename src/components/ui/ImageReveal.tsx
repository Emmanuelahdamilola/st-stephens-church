"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Photo fade-and-settle reveal on scroll. Uses opacity/scale rather than an animated clip-path:
// clip-path is the same "curtain" idea but is far more prone to compositor paint glitches
// (a photo intermittently rendering as a solid block) on software-rendered/GPU-less browsers.
// `initial` always has the same shape (both here and in the server-rendered markup) so the OS-level
// reduced-motion preference — only knowable after mount — can't cause a hydration mismatch; only the
// transition's duration is shortened for reduced motion, so it still resolves, just without the motion.
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div className={className}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduce ? 0.01 : 0.9, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}