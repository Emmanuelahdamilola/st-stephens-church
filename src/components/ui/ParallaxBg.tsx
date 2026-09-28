"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Full-bleed background photo that drifts slowly as you scroll. The parent section needs `relative isolate`.
export function ParallaxBg({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-x-0 -inset-y-[10%]">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
