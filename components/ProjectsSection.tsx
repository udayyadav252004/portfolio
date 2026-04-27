"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "StartupMantra \u2014 Your Idea, Our Roadmap",
    tagline: "Turn your idea into a roadmap in minutes.",
    description:
      'An AI-powered platform that transforms startup ideas into structured execution roadmaps with mentorship-style guidance. Designed with a "use-first, login-later" approach for a seamless experience.',
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "Firebase", "OpenRouter"],
    image: "/projects/startupmantra.png",
    githubUrl: "https://github.com/udayyadav252004/startupmantra",
    liveUrl: "https://startupmantra.vercel.app/",
    featured: true
  },
  {
    title: "UD Growth Labs \u2014 Business Growth Website",
    tagline: "Built to convert visitors into real business leads.",
    description:
      "A conversion-focused business website designed to generate leads through WhatsApp integration, with dynamic reviews and real-time engagement features.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Vercel"],
    image: "/projects/udgrowthlabs.png",
    githubUrl: "https://github.com/udayyadav252004/udgrowthlabs",
    liveUrl: "https://udgrowthlabs.vercel.app/"
  },
  {
    title: "Lucky Cricket",
    tagline: "The Game of Luck",
    description:
      "A Python-based cricket simulation game combining randomness and player decisions with real-time commentary.",
    stack: ["Python", "Tkinter"],
    image: "/projects/lucky-cricket.png",
    githubUrl: "https://github.com/udayyadav252004/Lucky-Cricket"
  },
  {
    title: "Personal Portfolio",
    tagline: "Not just a portfolio \u2014 an experience.",
    description:
      "A modern, interactive portfolio featuring cinematic animations and immersive UI.",
    stack: ["Next.js", "React", "Tailwind", "GSAP", "Framer Motion", "Three.js"],
    image: "/projects/portfolio.png",
    githubUrl: "https://github.com/udayyadav252004/portfolio",
    liveUrl: "https://uday-yadav-portfolio.vercel.app/"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32" data-reveal>
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Projects</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold md:text-5xl">
            Built across AI products, growth websites, games, and immersive web experiences.
          </h2>
        </div>

        <motion.div
          className="grid gap-7 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tagline={project.tagline}
              description={project.description}
              stack={project.stack}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              featured={project.featured}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
