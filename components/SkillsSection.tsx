"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Programming",
    skills: ["C", "C++", "Python"]
  },
  {
    title: "AI & Tools",
    skills: ["Prompt Engineering", "ChatGPT", "AI Content Creation"]
  },
  {
    title: "Development",
    skills: ["Web Development", "Problem Solving", "Innovation"]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 md:py-32" data-reveal>
      <div className="section-shell">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Skills</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold md:text-5xl">
            Technical capability with an AI-first mindset.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              className="group glass-panel rounded-3xl p-7 transition-all duration-500 hover:border-blue-200/40 hover:shadow-glow-soft"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <h3 className="text-2xl font-semibold text-blue-100">{group.title}</h3>
              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-xl border border-slate-300/20 bg-white/[0.02] px-4 py-3 text-slate-100/90 transition-all duration-400 group-hover:border-blue-300/40 group-hover:bg-blue-500/10"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
