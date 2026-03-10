"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    title: "Education",
    text: "Computer Science Engineering student focused on strong fundamentals, practical software development, and future-ready AI applications."
  },
  {
    title: "Skills",
    text: "Comfortable with C, C++, and Python, with hands-on experience in prompt engineering and AI-powered workflows."
  },
  {
    title: "Interests",
    text: "Exploring artificial intelligence, digital product creativity, and tools that combine technical depth with human-centered impact."
  },
  {
    title: "Vision",
    text: "Building systems that are intelligent, useful, and emotionally resonant while pushing the limits of innovation."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32" data-reveal>
      <div className="section-shell">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">About</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-white md:text-5xl">
            A Computer Science student shaping ideas into intelligent digital reality.
          </h2>
          <p className="mt-6 text-balance text-slate-200/80 md:text-lg">
            Uday Yadav is focused on combining engineering precision with creative
            ambition. His journey is grounded in coding fundamentals and elevated by
            a deep interest in AI, prompt engineering, and innovation-driven product
            thinking.
          </p>
        </div>

        <div className="relative ml-2 border-l border-blue-300/20 pl-7 md:pl-10">
          {timeline.map((item, index) => (
            <motion.article
              key={item.title}
              className="relative mb-10 max-w-3xl last:mb-0"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <span className="absolute -left-[2.45rem] top-2 h-3 w-3 rounded-full bg-blue-400 shadow-glow" />
              <h3 className="text-xl font-semibold text-blue-100 md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-slate-200/80 md:text-lg">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
