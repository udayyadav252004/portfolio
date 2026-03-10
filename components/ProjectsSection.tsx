"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Lucky Cricket",
    description:
      "A desktop cricket game built with Python GUI interactions, animation logic, and engaging player feedback loops.",
    stack: ["Python", "GUI", "Game Logic"],
    preview: "bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-slate-900"
  },
  {
    title: "Library Management System",
    description:
      "A structured C++ project to manage records, borrowing flow, and efficient data handling for library operations.",
    stack: ["C++", "DSA", "System Design"],
    preview: "bg-gradient-to-br from-indigo-500/25 via-blue-500/25 to-slate-900"
  },
  {
    title: "Mood Booster",
    description:
      "An AI emotion-based music player that adapts playlists by interpreting user mood and emotional context.",
    stack: ["AI", "Python", "Music Intelligence"],
    preview: "bg-gradient-to-br from-cyan-500/25 via-sky-500/20 to-slate-900"
  },
  {
    title: "Web Music Player",
    description:
      "A modern web audio experience focused on fluid controls, smooth playback behavior, and clean interface design.",
    stack: ["Web Development", "JavaScript", "UX"],
    preview: "bg-gradient-to-br from-blue-400/25 via-violet-400/15 to-slate-900"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32" data-reveal>
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Projects</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold md:text-5xl">
            Interactive builds where logic, creativity, and AI meet.
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
              description={project.description}
              stack={project.stack}
              preview={project.preview}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
