"use client";

import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  stack: string[];
  description: string;
  preview: string;
};

type TiltState = {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
};

export function ProjectCard({
  title,
  stack,
  description,
  preview
}: ProjectCardProps) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50
  });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - relY) * 10,
      rotateY: (relX - 0.5) * 12,
      glowX: relX * 100,
      glowY: relY * 100
    });
  };

  const onLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glowX: 50,
      glowY: 50
    });
  };

  return (
    <motion.article
      className="group relative rounded-3xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.2s ease-out"
      }}
    >
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
        <div
          className={`relative mb-6 h-44 overflow-hidden rounded-2xl ${preview}`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-200/10 to-black/55" />
          <div className="absolute -left-12 top-16 h-36 w-52 rotate-12 rounded-3xl border border-blue-100/30 bg-white/10 backdrop-blur-sm" />
          <div className="absolute right-2 top-8 h-16 w-20 rounded-lg border border-slate-100/25 bg-slate-900/40" />
          <div className="absolute bottom-7 right-6 h-10 w-36 rounded-full border border-cyan-100/20 bg-black/35" />
        </div>

        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-slate-200/80">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-blue-300/20 bg-blue-500/10 px-3 py-1 text-xs tracking-wide text-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 rounded-full border border-slate-100/20 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-400 hover:border-blue-200/60 hover:bg-blue-500/15"
        >
          View Details
        </button>

        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(59,130,246,0.26), transparent 45%)`
          }}
        />
      </div>
    </motion.article>
  );
}
