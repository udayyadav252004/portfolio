export type PortfolioChatRole = "user" | "assistant";

export type PortfolioChatMessage = {
  role: PortfolioChatRole;
  content: string;
};

export const initialAssistantMessage =
  "Hi, I'm Uday's AI assistant. Ask me anything about his projects, skills, or work.";

const assistantRules = [
  "You are Uday's AI assistant, not a general chatbot.",
  "Answer only using the portfolio knowledge below.",
  "Be professional, friendly, concise, and confident.",
  "Keep replies short: usually 2 to 4 lines max.",
  "Highlight StartupMantra when the user asks about the best or flagship project.",
  "If the information is missing or outside the portfolio, reply: I don't have that information yet.",
  "Do not mention being trained on broad internet data.",
  "Guide the visitor naturally toward projects, skills, or contact details when relevant."
].join("\n");

const portfolioKnowledge = [
  "About Uday:",
  "- Uday Yadav is a Computer Science Engineering student focused on intelligent systems, AI-powered workflows, prompt engineering, and innovation-driven product building.",
  "- He combines engineering fundamentals with creative digital product thinking.",
  "",
  "Skills:",
  "- Programming: C, C++, Python",
  "- AI and tools: Prompt Engineering, ChatGPT, AI Content Creation",
  "- Development: Web Development, Problem Solving, Innovation",
  "- Project stack experience also includes React, Next.js, Tailwind CSS, Node.js, Express, Firebase, OpenRouter, GSAP, Framer Motion, Three.js, HTML, CSS, JavaScript, Tkinter, and Vercel.",
  "",
  "Projects:",
  "- StartupMantra - Your Idea, Our Roadmap: Featured project. An AI-powered platform that turns startup ideas into structured execution roadmaps with mentorship-style guidance. Tagline: Turn your idea into a roadmap in minutes. Stack: React, Tailwind CSS, Node.js, Express, Firebase, OpenRouter. GitHub: https://github.com/udayyadav252004/startupmantra Live: https://startupmantra.vercel.app/",
  "- UD Growth Labs - Business Growth Website: A conversion-focused business website designed to generate leads through WhatsApp integration, with dynamic reviews and real-time engagement features. Tagline: Built to convert visitors into real business leads. Stack: HTML, CSS, JavaScript, Node.js, Vercel. GitHub: https://github.com/udayyadav252004/udgrowthlabs Live: https://udgrowthlabs.vercel.app/",
  "- Lucky Cricket: A Python-based cricket simulation game combining randomness and player decisions with real-time commentary. Tagline: The Game of Luck. Stack: Python, Tkinter. GitHub: https://github.com/udayyadav252004/Lucky-Cricket",
  "- Personal Portfolio: A modern, interactive portfolio with cinematic animations and immersive UI. Tagline: Not just a portfolio - an experience. Stack: Next.js, React, Tailwind, GSAP, Framer Motion, Three.js. GitHub: https://github.com/udayyadav252004/portfolio Live: https://uday-yadav-portfolio.vercel.app/",
  "",
  "Contact:",
  "- Email: udayyadav252004@gmail.com",
  "- GitHub: https://github.com/udayyadav252004",
  "- LinkedIn: https://www.linkedin.com/in/udayadav",
  "- Instagram: https://www.instagram.com/i.udayyadav?igsh=MWJ1YjUxMWMwZ3M2eg=="
].join("\n");

export function buildSystemPrompt() {
  return `${assistantRules}\n\nPortfolio knowledge:\n${portfolioKnowledge}`;
}

export function trimConversation(messages: PortfolioChatMessage[], limit = 10) {
  return messages
    .filter(
      (message): message is PortfolioChatMessage =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .slice(-limit);
}

function includesAny(source: string, keywords: string[]) {
  return keywords.some((keyword) => source.includes(keyword));
}

export function getLocalAssistantReply(query: string) {
  const normalized = query.toLowerCase();

  if (includesAny(normalized, ["startupmantra", "startup mantra"])) {
    return [
      "StartupMantra is Uday's featured AI product.",
      "It turns startup ideas into execution roadmaps with mentorship-style guidance and a use-first, login-later flow.",
      "Stack: React, Tailwind CSS, Node.js, Express, Firebase, and OpenRouter."
    ].join("\n");
  }

  if (
    includesAny(normalized, [
      "best project",
      "flagship project",
      "top project",
      "main project",
      "featured project"
    ])
  ) {
    return [
      "StartupMantra is the standout project right now.",
      "It is an AI platform that helps founders turn ideas into structured roadmaps in minutes.",
      "You can explore it live at startupmantra.vercel.app."
    ].join("\n");
  }

  if (includesAny(normalized, ["ud growth", "growth labs", "business growth website"])) {
    return [
      "UD Growth Labs is a conversion-focused business website.",
      "It is built to turn visitors into real leads through WhatsApp integration, dynamic reviews, and real-time engagement.",
      "Stack: HTML, CSS, JavaScript, Node.js, and Vercel."
    ].join("\n");
  }

  if (includesAny(normalized, ["lucky cricket", "cricket game"])) {
    return [
      "Lucky Cricket is a Python-based cricket simulation game.",
      "It mixes randomness, player decisions, and real-time commentary to make the experience feel lively.",
      "Stack: Python and Tkinter."
    ].join("\n");
  }

  if (includesAny(normalized, ["portfolio", "this website", "site"])) {
    return [
      "This portfolio is designed as an immersive experience, not just a static showcase.",
      "It uses Next.js, React, Tailwind, GSAP, Framer Motion, and Three.js for the cinematic feel."
    ].join("\n");
  }

  if (includesAny(normalized, ["skills", "technology", "technologies", "tech stack", "stack"])) {
    return [
      "Uday works across C, C++, Python, modern web development, and AI-driven workflows.",
      "He also builds with React, Next.js, Tailwind CSS, Node.js, Express, Firebase, GSAP, Framer Motion, and Three.js."
    ].join("\n");
  }

  if (
    includesAny(normalized, [
      "who is uday",
      "about uday",
      "about him",
      "tell me about uday",
      "background"
    ])
  ) {
    return [
      "Uday Yadav is a Computer Science Engineering student focused on intelligent systems and innovation-driven products.",
      "His work blends coding fundamentals, AI-powered workflows, and creative digital product thinking."
    ].join("\n");
  }

  if (includesAny(normalized, ["projects", "work", "portfolio projects"])) {
    return [
      "The main projects are StartupMantra, UD Growth Labs, Lucky Cricket, and this portfolio.",
      "StartupMantra is the featured AI product, while the others show web, growth, and interactive build experience."
    ].join("\n");
  }

  if (includesAny(normalized, ["contact", "email", "reach", "hire", "linkedin", "instagram", "github"])) {
    return [
      "You can reach Uday at udayyadav252004@gmail.com.",
      "GitHub: github.com/udayyadav252004",
      "LinkedIn: linkedin.com/in/udayadav"
    ].join("\n");
  }

  return "I don't have that information yet.";
}
