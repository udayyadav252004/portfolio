"use client";

import { FormEvent, SVGProps, useState } from "react";
import { motion } from "framer-motion";

type SubmitState = "idle" | "sending" | "success" | "error";

type SocialLink = {
  label: string;
  href: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.25a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.71c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .08 1.54 1.03 1.54 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.67-.11-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.41.1 2.66.64.69 1.03 1.58 1.03 2.67 0 3.85-2.33 4.69-4.56 4.94.36.32.68.94.68 1.9v2.81c0 .27.18.58.69.48A10 10 0 0 0 12 2.25Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 12.48c0-3.02-1.61-4.42-3.76-4.42-1.73 0-2.5.95-2.93 1.62V8.5h-3.38V20h3.38v-6.39c0-1.68.32-3.31 2.4-3.31 2.05 0 2.08 1.91 2.08 3.42V20h3.38l-.01-7.52Z" />
    </svg>
  );
}

const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/i.udayyadav?igsh=MWJ1YjUxMWMwZ3M2eg==",
    Icon: InstagramIcon
  },
  {
    label: "GitHub",
    href: "https://github.com/udayyadav252004",
    Icon: GitHubIcon
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/udayadav",
    Icon: LinkedInIcon
  }
];

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? "")
        })
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; success?: boolean }
        | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Unable to send your message right now.");
      }

      setSubmitState("success");
      setFeedback("Message sent successfully.");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error ? error.message : "Unable to send your message right now."
      );
    }
  };

  return (
    <section id="contact" className="relative pb-20 pt-24 md:pb-24 md:pt-32" data-reveal>
      <div className="section-shell">
        <div className="grid gap-9 md:grid-cols-[1.05fr_1fr] md:items-start">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-blue-200/85">Contact</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-white md:text-5xl">
              Let us build something meaningful together.
            </h2>
            <p className="mt-6 text-slate-200/80 md:text-lg">
              Whether it is an AI concept, a software project, or a creative digital
              collaboration, I am open to opportunities where innovation matters.
            </p>

            <a
              href="mailto:udayyadav252004@gmail.com"
              className="mt-6 inline-flex text-sm tracking-[0.18em] text-cyan-200/85 transition-colors duration-300 hover:text-white"
            >
              UDAYYADAV252004@GMAIL.COM
            </a>

            <div className="mt-9 flex flex-wrap gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/20 bg-white/[0.03] text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/65 hover:bg-blue-500/10 hover:text-cyan-100"
                >
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
                disabled={submitState === "sending"}
                className="luminous-border inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-400/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-75"
              >
                {submitState === "sending" ? "Sending..." : "Send Message"}
              </motion.button>

              <p
                className={`h-5 text-xs ${
                  submitState === "error" ? "text-rose-200/90" : "text-blue-100/80"
                }`}
              >
                {feedback}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
