"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  tagline: string;
  stack: string[];
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
};

type TiltState = {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
};

export function ProjectCard({
  title,
  tagline,
  stack,
  description,
  image,
  githubUrl,
  liveUrl,
  featured = false
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
      className={`group relative rounded-3xl ${featured ? "md:col-span-2" : ""}`}
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
      <div
        className={`glass-panel relative overflow-hidden rounded-3xl p-6 md:p-7 ${
          featured
            ? "border-blue-300/35 shadow-[0_0_0_1px_rgba(147,197,253,0.22),0_28px_60px_rgba(37,99,235,0.18)]"
            : ""
        }`}
      >
        <div
          className={`relative mb-6 overflow-hidden rounded-[1.5rem] ${
            featured ? "h-64 md:h-80" : "h-52"
          }`}
        >
          <Image
            src={image}
            alt={title}
            fill
            priority={featured}
            sizes={
              featured
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/92 to-transparent" />

          {featured ? (
            <span className="absolute left-4 top-4 rounded-full border border-amber-300/45 bg-amber-300/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-100">
              Featured
            </span>
          ) : null}
        </div>

        <div className="relative z-10">
          <h3
            className={`text-white ${featured ? "text-3xl md:text-[2rem]" : "text-2xl"}`}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-cyan-200/80">
            {tagline}
          </p>
          <p className="mt-4 max-w-3xl text-slate-200/80">{description}</p>

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

          <div className="mt-6 flex flex-wrap gap-3">
            {liveUrl ? (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="luminous-border inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/35 to-cyan-400/20 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(59,130,246,0.22)]"
              >
                View Live
              </Link>
            ) : null}

            <Link
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-100/20 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-300 hover:border-blue-200/60 hover:bg-blue-500/15"
            >
              GitHub
            </Link>
          </div>
        </div>

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
