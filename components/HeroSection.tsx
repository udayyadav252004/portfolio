"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { GlowButton } from "./GlowButton";

export function HeroSection() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 100]);
  const imageCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const imageCard = imageCardRef.current;

    if (!imageCard) {
      return;
    }

    const floatTween = gsap.to(imageCard, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      floatTween.kill();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 md:pt-32">
      <div className="absolute inset-0 subtle-grid opacity-45" aria-hidden="true" />

      <div className="section-shell relative z-10 flex min-h-[82vh] items-center">
        <div className="grid w-full items-center gap-12 md:grid-cols-2">
          <motion.div style={{ y: parallaxY }} className="max-w-4xl">
            <motion.p
              className="mb-5 text-xs uppercase tracking-[0.35em] text-blue-200/85 md:text-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              AI ENTHUSIAST | DEVELOPER | INNOVATOR
            </motion.p>

            <motion.h1
              className="gradient-heading text-balance text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 }}
            >
              Uday Yadav
            </motion.h1>

            <motion.p
              className="mt-8 max-w-2xl text-balance text-base text-slate-200/80 md:text-xl"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25 }}
            >
              Building intelligent systems, creative tools, and meaningful digital
              experiences.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.35 }}
            >
              <GlowButton href="#projects" label="View Portfolio" />
              <GlowButton href="#contact" label="Contact Me" variant="ghost" />
            </motion.div>
          </motion.div>

          <div className="flex justify-center md:justify-end">
            <div ref={imageCardRef} className="relative w-[min(76vw,320px)] md:w-[320px]">
              <div
                className="absolute inset-0 rounded-[1.75rem] bg-blue-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-2 rounded-[2rem] border border-blue-100/15"
                aria-hidden="true"
              />

              <Image
                src="/uday.png"
                alt="Uday Yadav"
                width={320}
                height={380}
                priority
                className="relative h-auto w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mesh-layer" data-parallax aria-hidden="true" />
    </section>
  );
}
