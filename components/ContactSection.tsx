"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" }
];

export function ContactSection() {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSending(true);
    setSent(false);

    window.setTimeout(() => {
      setIsSending(false);
      setSent(true);
      form.reset();
    }, 1200);
  };

  return (
    <section id="contact" className="relative pb-20 pt-24 md:pb-24 md:pt-32" data-reveal>
      <div className="section-shell">
        <div className="grid gap-9 md:grid-cols-[1.05fr_1fr] md:items-start">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Contact</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-white md:text-5xl">
              Let's build something meaningful together.
            </h2>
            <p className="mt-6 text-slate-200/80 md:text-lg">
              Whether it is an AI concept, a software project, or a creative digital
              collaboration, I am open to opportunities where innovation matters.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-200/20 bg-white/[0.03] px-4 py-2 text-sm transition-all duration-300 hover:border-blue-300/65 hover:bg-blue-500/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-7 md:p-8">
            <div className="space-y-5">
              <label className="block text-sm text-slate-200">
                Name
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-xl border border-slate-300/25 bg-black/35 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-300/80 focus:shadow-glow-soft"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm text-slate-200">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-xl border border-slate-300/25 bg-black/35 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-300/80 focus:shadow-glow-soft"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm text-slate-200">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-300/25 bg-black/35 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-300/80 focus:shadow-glow-soft"
                  placeholder="Tell me about your idea..."
                />
              </label>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                disabled={isSending}
                className="luminous-border inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-400/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-75"
              >
                {isSending ? "Sending..." : "Send Message"}
              </motion.button>

              <p className="h-5 text-xs text-blue-100/80">{sent ? "Message sent successfully." : ""}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
