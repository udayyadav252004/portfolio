"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" }
];

export function TopNav() {
  return (
    <motion.header
      className="fixed left-1/2 top-4 z-30 w-[94%] max-w-4xl -translate-x-1/2"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass-panel rounded-full px-5 py-3 md:px-7">
        <div className="flex items-center justify-between gap-4">
          <a href="#hero" className="text-sm font-semibold tracking-[0.2em] text-blue-200">
            UDAY
          </a>

          <div className="hidden items-center gap-5 text-sm text-slate-200/90 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 hover:text-blue-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="rounded-full border border-blue-300/35 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-100 transition-all duration-300 hover:border-blue-200/70 hover:bg-blue-500/15"
          >
            LET'S TALK
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
