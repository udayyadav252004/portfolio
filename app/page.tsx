"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ParticleField } from "@/components/ParticleField";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { TopNav } from "@/components/TopNav";
import { VisionSection } from "@/components/VisionSection";

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroDone(true);
    }
  }, []);

  useEffect(() => {
    if (!introDone || !rootRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 54
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 83%",
              once: true
            }
          }
        );
      });

      const parallaxLayers = gsap.utils.toArray<HTMLElement>("[data-parallax]");

      parallaxLayers.forEach((layer) => {
        gsap.to(layer, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [introDone]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-obsidian text-soft-white">
      <ParticleField />

      {!introDone ? <IntroOverlay onComplete={() => setIntroDone(true)} /> : null}

      <div
        ref={rootRef}
        className={`relative z-10 transition-opacity duration-1000 ${
          introDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <TopNav />

        <HeroSection />

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[1300px] w-[1300px] -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl" />
          </div>

          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <VisionSection />
          <ContactSection />
        </div>

        <footer className="section-shell pb-10 text-center text-xs uppercase tracking-[0.2em] text-slate-300/50">
          Uday Yadav - Crafted with code, curiosity, and intelligence
        </footer>
      </div>
    </main>
  );
}
