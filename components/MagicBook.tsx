"use client";

import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

type MagicBookProps = {
  className?: string;
};

type Ember = {
  key: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

export const MagicBook = forwardRef<HTMLDivElement, MagicBookProps>(
  function MagicBook({ className }, ref) {
    const embers = useMemo<Ember[]>(
      () =>
        Array.from({ length: 14 }).map((_, index) => ({
          key: index,
          left: `${12 + ((index * 9) % 74)}%`,
          size: 3 + (index % 3),
          delay: index * 0.11,
          duration: 2.2 + (index % 4) * 0.35
        })),
      []
    );

    const rootClassName = className
      ? `pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 opacity-0 ${className}`
      : "pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 opacity-0";

    return (
      <div ref={ref} className={rootClassName} aria-hidden="true">
        <motion.div
          className="relative h-[240px] w-[340px] will-change-transform"
          animate={{ y: [0, -9, 0], rotateZ: [0, 0.55, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="magic-book-shell absolute inset-0 [perspective:1400px]">
            <div className="magic-book-glow absolute left-1/2 top-[56%] h-[165px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-[56px] bg-amber-300/25 blur-3xl" />

            <div className="absolute left-1/2 top-[58%] h-[118px] w-[230px] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
              <div className="magic-book-back absolute inset-0 rounded-[10px] border border-amber-100/35 bg-gradient-to-br from-[#3c1d4f] via-[#1f1642] to-[#0f132d] shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />

              <div className="magic-book-pages absolute inset-x-2 inset-y-[5px] rounded-[8px] bg-gradient-to-b from-amber-50/95 via-amber-100/90 to-amber-200/80 shadow-[inset_0_0_28px_rgba(250,204,21,0.4)]" />

              <div className="magic-book-front absolute inset-0 origin-left rounded-[10px] border border-amber-100/55 bg-gradient-to-br from-[#5b2e6f] via-[#2e1a54] to-[#121636] shadow-[0_12px_28px_rgba(56,24,95,0.45)]" />

              <div className="magic-book-spine absolute left-0 top-1/2 h-[104px] w-[16px] -translate-y-1/2 rounded-l-[8px] bg-gradient-to-b from-amber-200/70 to-amber-500/30" />

              <div className="magic-book-page-glow absolute left-1/2 top-[40%] h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/45 opacity-0 blur-2xl" />

              <div className="absolute inset-x-0 -top-24 flex items-end justify-center gap-8">
                <span className="magic-book-beam h-24 w-4 rounded-full bg-gradient-to-t from-amber-300/0 via-amber-200/80 to-amber-50/5 opacity-0 blur-[1px]" />
                <span className="magic-book-beam h-28 w-5 rounded-full bg-gradient-to-t from-amber-300/0 via-amber-100/90 to-amber-50/10 opacity-0 blur-[1px]" />
                <span className="magic-book-beam h-20 w-3 rounded-full bg-gradient-to-t from-amber-300/0 via-amber-300/75 to-amber-50/5 opacity-0 blur-[1px]" />
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[38%] h-[160px] w-[220px] -translate-x-1/2">
            {embers.map((ember) => (
              <motion.span
                key={ember.key}
                className="magic-book-particle absolute rounded-full bg-amber-100/85"
                style={{
                  left: ember.left,
                  bottom: "14%",
                  width: ember.size,
                  height: ember.size,
                  filter: "blur(0.3px)",
                  opacity: 0
                }}
                animate={{ y: [0, -56, -86], opacity: [0, 0.9, 0] }}
                transition={{
                  duration: ember.duration,
                  delay: ember.delay,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
);
