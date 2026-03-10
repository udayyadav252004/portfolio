"use client";

import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

type MagicWandProps = {
  className?: string;
};

type Sparkle = {
  key: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
};

export const MagicWand = forwardRef<HTMLDivElement, MagicWandProps>(
  function MagicWand({ className }, ref) {
    const sparkles = useMemo<Sparkle[]>(
      () =>
        Array.from({ length: 10 }).map((_, index) => ({
          key: index,
          left: `${8 + index * 8}%`,
          top: `${20 + ((index * 17) % 54)}%`,
          size: 2 + (index % 3),
          delay: index * 0.08,
          duration: 1.6 + (index % 4) * 0.25
        })),
      []
    );

    const rootClassName = className
      ? `pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-y-1/2 opacity-0 ${className}`
      : "pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-y-1/2 opacity-0";

    return (
      <div ref={ref} className={rootClassName} aria-hidden="true">
        <div className="relative h-10 w-[280px] will-change-transform">
          <div className="magic-wand-trail absolute left-0 top-1/2 h-[10px] w-[205px] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-300/60 to-violet-200/20 opacity-70 blur-[3px]" />

          {sparkles.map((sparkle) => (
            <motion.span
              key={sparkle.key}
              className="absolute rounded-full bg-blue-100/90"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                width: sparkle.size,
                height: sparkle.size,
                filter: "blur(0.4px)"
              }}
              animate={{ opacity: [0.08, 0.9, 0.08], scale: [0.4, 1.3, 0.4] }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="magic-wand-handle absolute left-[58px] top-1/2 h-[8px] w-[26px] -translate-y-1/2 rounded-full bg-gradient-to-r from-slate-800 to-slate-600 shadow-[0_0_18px_rgba(96,165,250,0.25)]" />
          <div className="magic-wand-shaft absolute left-[79px] top-1/2 h-[6px] w-[170px] -translate-y-1/2 rounded-full bg-gradient-to-r from-slate-300 via-blue-100 to-indigo-100 shadow-[0_0_22px_rgba(125,211,252,0.35)]" />

          <div className="magic-wand-tip absolute right-[16px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-blue-100/95 shadow-[0_0_24px_rgba(147,197,253,0.8)]">
            <div className="absolute inset-0 rounded-full bg-violet-200/70 blur-[2px]" />
            <motion.div
              className="absolute -inset-3 rounded-full border border-blue-200/45"
              animate={{ scale: [0.75, 1.3, 0.75], opacity: [0.2, 0.85, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    );
  }
);
