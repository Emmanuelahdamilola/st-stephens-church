"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Opacity only (no transform) so fixed-position children like the lightbox are never affected.
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  return <motion.div initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>{children}</motion.div>;
}
