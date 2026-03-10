"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { MagicBook } from "./MagicBook";
import { MagicWand } from "./MagicWand";
import { ParticleField } from "./ParticleField";
import { SpellBurstEffect, SpellBurstHandle } from "./SpellBurstEffect";

type IntroOverlayProps = {
  onComplete: () => void;
};

type TextParticle = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  size: number;
  drift: number;
};

const NAME_TEXT = "Uday Yadav";
const TAGLINE_TEXT = "Turning ideas into intelligent digital experiences";

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleVeilRef = useRef<HTMLDivElement | null>(null);
  const wandRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const spellEffectRef = useRef<SpellBurstHandle | null>(null);
  const nameCanvasWrapRef = useRef<HTMLDivElement | null>(null);
  const nameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const completionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const wand = wandRef.current;
    const book = bookRef.current;

    if (!container || !wand || !book) {
      return;
    }

    completionRef.current = false;

    const wandTip = wand.querySelector<HTMLElement>(".magic-wand-tip");
    const wandTrail = wand.querySelector<HTMLElement>(".magic-wand-trail");
    const bookFront = book.querySelector<HTMLElement>(".magic-book-front");
    const bookBeams = book.querySelectorAll<HTMLElement>(".magic-book-beam");
    const bookGlow = book.querySelector<HTMLElement>(".magic-book-page-glow");
    const bookParticles = book.querySelectorAll<HTMLElement>(".magic-book-particle");

    const wandEntryX = -Math.min(window.innerWidth * 0.86, 980);
    const wandCenterX = -Math.min(window.innerWidth * 0.06, 68);
    const wandCastX = Math.min(window.innerWidth * 0.08, 88);

    gsap.set(particleVeilRef.current, { opacity: 0 });
    gsap.set(wand, {
      opacity: 0,
      x: wandEntryX,
      y: 16,
      rotation: -8,
      transformOrigin: "88% 56%"
    });
    gsap.set(book, {
      opacity: 0,
      scale: 0.65,
      y: 24,
      transformOrigin: "50% 50%"
    });
    gsap.set(nameRef.current, { opacity: 0, y: 24, filter: "blur(10px)" });
    gsap.set(taglineRef.current, { opacity: 0, y: 18 });
    gsap.set(nameCanvasWrapRef.current, { opacity: 0 });

    if (wandTrail) {
      gsap.set(wandTrail, { opacity: 0.35, scaleX: 0.55, transformOrigin: "100% 50%" });
    }
    if (bookFront) {
      gsap.set(bookFront, { rotateY: 0, transformOrigin: "0% 50%" });
    }
    if (bookBeams.length > 0) {
      gsap.set(bookBeams, { opacity: 0, scaleY: 0.18, transformOrigin: "50% 100%" });
    }
    if (bookGlow) {
      gsap.set(bookGlow, { opacity: 0, scale: 0.65, transformOrigin: "50% 50%" });
    }
    if (bookParticles.length > 0) {
      gsap.set(bookParticles, { opacity: 0, y: 16, scale: 0.5 });
    }

    let nameRaf = 0;

    const clearNameCanvas = () => {
      const canvas = nameCanvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const runNameMorph = () => {
      const canvas = nameCanvasRef.current;
      const wrapper = nameCanvasWrapRef.current;
      if (!canvas || !wrapper) {
        return;
      }

      const bounds = wrapper.getBoundingClientRect();
      if (bounds.width < 20 || bounds.height < 20) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(bounds.width * dpr);
      const height = Math.floor(bounds.height * dpr);

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      const glyphCanvas = document.createElement("canvas");
      glyphCanvas.width = width;
      glyphCanvas.height = height;
      const glyphCtx = glyphCanvas.getContext("2d");
      if (!glyphCtx) {
        return;
      }

      const fontSize = Math.floor(Math.min(width * 0.19, height * 0.66));
      glyphCtx.clearRect(0, 0, width, height);
      glyphCtx.textAlign = "center";
      glyphCtx.textBaseline = "middle";
      glyphCtx.fillStyle = "#ffffff";
      glyphCtx.font = `600 ${fontSize}px var(--font-space-grotesk), sans-serif`;
      glyphCtx.fillText(NAME_TEXT, width / 2, height / 2);

      const imageData = glyphCtx.getImageData(0, 0, width, height).data;
      const baseStep = Math.max(4, Math.floor(width / 190));
      let particles: TextParticle[] = [];

      for (let y = 0; y < height; y += baseStep) {
        for (let x = 0; x < width; x += baseStep) {
          const alpha = imageData[(y * width + x) * 4 + 3];
          if (alpha < 90) {
            continue;
          }

          particles.push({
            sx: width * 0.5 + (Math.random() - 0.5) * width * 0.22,
            sy: height * 0.9 + Math.random() * height * 0.1,
            tx: x,
            ty: y,
            size: (1.2 + Math.random() * 1.2) * dpr,
            drift: (Math.random() - 0.5) * 11
          });
        }
      }

      if (particles.length > 920) {
        const stride = Math.ceil(particles.length / 920);
        particles = particles.filter((_, index) => index % stride === 0);
      }

      const start = performance.now();
      const duration = 1650;

      const draw = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = easeOutCubic(progress);

        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = "lighter";

        for (let index = 0; index < particles.length; index += 1) {
          const particle = particles[index];
          const drift = (1 - eased) * particle.drift * dpr;
          const pulse = 0.85 + Math.sin(now * 0.008 + index * 0.42) * 0.12;
          const x =
            particle.sx +
            (particle.tx - particle.sx) * eased +
            Math.sin(now * 0.005 + index) * drift;
          const y =
            particle.sy +
            (particle.ty - particle.sy) * eased -
            Math.cos(now * 0.004 + index) * drift * 0.65;
          const alpha = 0.2 + eased * 0.75;

          ctx.fillStyle = `rgba(198, 226, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, particle.size * pulse, 0, Math.PI * 2);
          ctx.fill();
        }

        if (progress < 1) {
          nameRaf = window.requestAnimationFrame(draw);
          return;
        }

        ctx.globalCompositeOperation = "source-over";
        ctx.shadowColor = "rgba(147, 197, 253, 0.9)";
        ctx.shadowBlur = 18 * dpr;
        ctx.fillStyle = "rgba(239, 246, 255, 0.94)";
        ctx.font = `600 ${fontSize}px var(--font-space-grotesk), sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(NAME_TEXT, width / 2, height / 2);
      };

      nameRaf = window.requestAnimationFrame(draw);
    };

    const playBurst = () => {
      spellEffectRef.current?.cast();

      gsap.fromTo(
        particleVeilRef.current,
        { opacity: 0.98 },
        { opacity: 0.82, duration: 0.66, ease: "power2.out" }
      );
    };

    const revealPortfolio = () => {
      if (completionRef.current) {
        return;
      }
      completionRef.current = true;
      onComplete();
    };

    const timeline = gsap.timeline({
      defaults: {
        ease: "power2.out"
      }
    });

    timeline.to(particleVeilRef.current, { opacity: 0.94, duration: 1.1 }, 1);

    timeline.to(wand, { opacity: 1, duration: 0.35 }, 2);
    timeline.to(
      wand,
      {
        x: wandCenterX,
        y: -8,
        rotation: -2,
        duration: 1.9,
        ease: "power3.out"
      },
      2
    );

    if (wandTrail) {
      timeline.to(
        wandTrail,
        { scaleX: 1, opacity: 0.95, duration: 1.8, ease: "sine.out" },
        2.05
      );
    }

    timeline.to(
      wand,
      {
        x: wandCastX,
        y: -14,
        duration: 1.1,
        ease: "sine.inOut"
      },
      3.5
    );

    timeline.to(
      wand,
      {
        rotation: -24,
        duration: 0.23,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      },
      4
    );

    if (wandTip) {
      timeline.to(
        wandTip,
        {
          scale: 1.5,
          duration: 0.24,
          repeat: 1,
          yoyo: true,
          transformOrigin: "50% 50%",
          ease: "power2.out"
        },
        4.03
      );
    }

    timeline.add(playBurst, 5);
    timeline.to(wand, { opacity: 0, duration: 0.52 }, 5.14);

    timeline.to(
      book,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out"
      },
      5.45
    );

    if (bookGlow) {
      timeline.to(bookGlow, { opacity: 0.96, scale: 1.28, duration: 0.88 }, 5.52);
    }

    if (bookFront) {
      timeline.to(
        bookFront,
        {
          rotateY: -118,
          duration: 1.16,
          ease: "power2.inOut"
        },
        6.45
      );
    }

    if (bookBeams.length > 0) {
      timeline.to(
        bookBeams,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.84,
          stagger: 0.06,
          ease: "power2.out"
        },
        6.52
      );
    }

    if (bookParticles.length > 0) {
      timeline.to(
        bookParticles,
        {
          opacity: 1,
          y: -34,
          scale: 1,
          duration: 1.15,
          stagger: 0.035,
          ease: "power2.out"
        },
        6.62
      );
    }

    timeline.add(() => {
      runNameMorph();
    }, 8.55);

    timeline.to(nameCanvasWrapRef.current, { opacity: 1, duration: 0.4 }, 8.55);
    timeline.to(
      nameRef.current,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out"
      },
      9.05
    );

    timeline.to(nameCanvasWrapRef.current, { opacity: 0, duration: 0.58 }, 9.88);
    timeline.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 9.82);

    timeline.to(book, { opacity: 0, duration: 0.78 }, 10.9);
    timeline.to(particleVeilRef.current, { opacity: 0.5, duration: 0.72 }, 11);

    timeline.to(
      container,
      {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onStart: revealPortfolio
      },
      11.1
    );

    timeline.add(revealPortfolio, 11.98);

    return () => {
      timeline.kill();
      window.cancelAnimationFrame(nameRaf);
      clearNameCanvas();
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-[#02030a]"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute inset-0 bg-[#03040d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(73,100,182,0.34),rgba(4,6,16,0.95)_62%)]" />
      <ParticleField
        mode="intro"
        className="pointer-events-none absolute inset-0 z-10 opacity-95"
      />
      <div
        ref={particleVeilRef}
        className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_54%,rgba(132,153,255,0.2),rgba(4,5,14,0.92)_68%)]"
      />

      <div className="absolute inset-0 z-30">
        <SpellBurstEffect ref={spellEffectRef} />
        <MagicWand ref={wandRef} />
        <MagicBook ref={bookRef} />

        <div className="absolute inset-x-0 top-[58%] z-40 flex flex-col items-center px-6 text-center">
          <div
            ref={nameCanvasWrapRef}
            className="pointer-events-none absolute -top-24 h-44 w-[min(92vw,760px)] opacity-0"
          >
            <canvas ref={nameCanvasRef} className="h-full w-full" />
          </div>

          <h1
            ref={nameRef}
            className="gradient-heading opacity-0 text-5xl font-semibold tracking-tight drop-shadow-[0_0_26px_rgba(147,197,253,0.62)] will-change-transform md:text-7xl" style={{ filter: "blur(10px)" }}
          >
            {NAME_TEXT}
          </h1>

          <p
            ref={taglineRef}
            className="mt-6 max-w-2xl opacity-0 text-balance text-base tracking-wide text-slate-100/90 will-change-transform md:text-xl"
          >
            {TAGLINE_TEXT}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

