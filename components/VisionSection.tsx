"use client";

import { motion } from "framer-motion";

export function VisionSection() {
  return (
    <section id="vision" className="relative py-28 md:py-36" data-reveal>
      <div className="section-shell relative overflow-hidden rounded-[2rem] border border-blue-300/20 bg-gradient-to-br from-slate-900/70 to-blue-950/25 px-8 py-16 md:px-14 md:py-20">
        <motion.div
          className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"
          animate={{ y: [0, -20, 0], x: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ y: [0, 14, 0], x: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Vision</p>
        <motion.blockquote
          className="mt-6 max-w-4xl text-balance text-3xl font-semibold leading-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          "I believe technology should not just solve problems, it should inspire
          people."
        </motion.blockquote>
      </div>
    </section>
  );
}
