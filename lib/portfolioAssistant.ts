export type PortfolioChatRole = "user" | "assistant";

export type PortfolioChatMessage = {
  role: PortfolioChatRole;
  content: string;
};

type PortfolioTopic =
  | "startupmantra"
  | "ud-growth-labs"
  | "lucky-cricket"
  | "portfolio"
  | "skills"
  | "contact"
  | "uday";

type ProjectTopic = Extract<
  PortfolioTopic,
  "startupmantra" | "ud-growth-labs" | "lucky-cricket" | "portfolio"
>;

type ProjectKnowledge = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  problem: string;
  howItWorks: string;
  features: string;
  stack: string;
  challenges?: string;
  solutions?: string;
  impact?: string;
  futureScope?: string;
  links: string;
  highlight: string;
};

export const initialAssistantMessage =
  "Hi, I'm Uday's AI assistant. Ask me anything about his projects, skills, or work.";

export const unknownAssistantMessage =
  "I don't have that information yet, but I can help with his projects or skills.";

const projectKnowledge: Record<ProjectTopic, ProjectKnowledge> = {
  startupmantra: {
    name: "StartupMantra",
    shortName: "StartupMantra",
    tagline: "Turn your idea into a roadmap in minutes.",
    description:
      "StartupMantra is an AI-powered platform that transforms raw startup ideas into structured execution roadmaps.",
    problem:
      "It solves the gap between having an idea and knowing how to execute it.",
    howItWorks:
      "A user enters an idea, and AI generates a refined idea, problem statement, solution, audience, tasks, risks, and tools in one vertical flow UI.",
    features:
      "Key features include AI idea generation, roadmap creation, task breakdown, risk analysis, tool suggestions, mentor-style guidance, guest mode, login, and multi-model fallback AI.",
    stack: "React, Next.js, Node.js, Firebase, Tailwind CSS, and OpenRouter.",
    challenges:
      "The main challenges were structured AI output, consistency, and handling AI failures.",
    solutions:
      "Those were handled with prompt engineering, output-formatting logic, and a fallback model system.",
    impact:
      "It reduces planning time, helps beginners move faster, and has strong SaaS potential.",
    futureScope:
      "Future scope includes a dashboard, idea saving, collaboration, and monetization.",
    links:
      "GitHub: github.com/udayyadav252004/startupmantra | Live: startupmantra.vercel.app",
    highlight:
      "It is Uday's flagship project because it combines AI integration, product thinking, and execution-focused UX."
  },
  "ud-growth-labs": {
    name: "UD Growth Labs",
    shortName: "UD Growth Labs",
    tagline: "Built to convert visitors into real business leads.",
    description:
      "UD Growth Labs is a conversion-focused business website built for lead generation.",
    problem:
      "It solves the problem of websites attracting traffic but failing to convert visitors into actual leads.",
    howItWorks:
      "Visitors interact with pricing plans, WhatsApp buttons, and a review system that creates instant lead paths.",
    features:
      "Key features include WhatsApp lead generation, dynamic reviews, live average rating calculation, responsive UI, and conversion-focused design.",
    stack: "HTML, CSS, JavaScript, Node.js serverless, and Vercel.",
    challenges:
      "The main challenges were designing for conversion and implementing dynamic rating updates.",
    impact:
      "It helps improve lead generation and builds trust through reviews.",
    links:
      "GitHub: github.com/udayyadav252004/udgrowthlabs | Live: udgrowthlabs.vercel.app",
    highlight:
      "It shows Uday's ability to connect product design with real business outcomes."
  },
  "lucky-cricket": {
    name: "Lucky Cricket",
    shortName: "Lucky Cricket",
    tagline: "The Game of Luck.",
    description:
      "Lucky Cricket is a Python-based cricket game combining logic and randomness for interactive gameplay.",
    problem:
      "It addresses how simple games can feel flat when they lack interaction and unpredictability.",
    howItWorks:
      "The player makes choices, randomness drives runs and wickets, and the score updates in real time.",
    features:
      "It includes single-player and multiplayer modes, real-time commentary, GUI interaction, and event-driven logic.",
    stack: "Python and Tkinter.",
    impact:
      "It demonstrates Uday's ability to turn programming logic into an engaging user experience.",
    links: "GitHub: github.com/udayyadav252004/Lucky-Cricket",
    highlight:
      "Its core concept is event-driven programming combined with randomness simulation."
  },
  portfolio: {
    name: "Developer Portfolio",
    shortName: "the portfolio",
    tagline: "Not just a portfolio - an experience.",
    description:
      "This is a cinematic, interactive portfolio designed to showcase Uday's projects and skills with a strong product feel.",
    problem:
      "It solves the problem of portfolios feeling static and forgettable.",
    howItWorks:
      "It combines a cinematic intro, project storytelling, and an AI assistant to create a more immersive visitor journey.",
    features:
      "Key features include the magic wand intro, dynamic project showcase, AI assistant, glassmorphism, glow effects, and smooth animations.",
    stack: "Next.js, React, Tailwind CSS, GSAP, Framer Motion, and Three.js.",
    impact:
      "It creates a strong first impression and demonstrates both full-stack and AI integration skills.",
    links:
      "GitHub: github.com/udayyadav252004/portfolio | Live: uday-yadav-portfolio.vercel.app",
    highlight:
      "It is designed to feel like a product experience rather than a static profile page."
  }
};

const assistantRules = [
  "You are Uday Yadav's AI assistant.",
  "Your job is to help users, recruiters, and visitors understand who Uday is, what he builds, how he thinks, and how to contact him.",
  "Answer like a confident, professional, and intelligent developer assistant.",
  "Use only the portfolio knowledge below. Do not guess, hallucinate, or answer beyond it.",
  "Keep replies short and impactful: usually 2 to 5 lines max.",
  "Start with a direct answer, then highlight the key point clearly.",
  "Do not sound like a generic AI chatbot or mention broad training data.",
  "Use prior chat context for follow-up questions like 'it', 'this project', 'tell me more', or 'what about its tech stack'.",
  "If a visitor asks about the best, top, or flagship project, highlight StartupMantra first.",
  `If information is unknown or missing, reply exactly: ${unknownAssistantMessage}`,
  "Prefer crisp, structured wording over long explanations."
].join("\n");

const portfolioKnowledge = [
  "ABOUT UDAY YADAV",
  "- Uday Yadav is an aspiring software developer based in Bhopal, Madhya Pradesh.",
  "- He is pursuing a B.Tech in Computer Science Engineering from RGPV University from 2022 to 2026.",
  "- His CGPA is around 7.5.",
  "- He has strong foundations in Python, C++, and C.",
  "- He is highly interested in real-world applications built with React, Next.js, Node.js, and AI tools.",
  "- He is known for fast learning ability, strong problem-solving, analytical thinking, and turning ideas into working products.",
  "- He actively explores ChatGPT and Gemini to build intelligent systems and automate workflows.",
  "- He secured 1st rank in the LB5 HackerRank contest and participated in hackathons like Codeactive 3.0.",
  "",
  "SKILLS",
  "- Technical: Python, C++, C, React, Next.js, JavaScript, Node.js, Express, Firebase, Tailwind CSS, GSAP, Framer Motion, Three.js, AI integration with OpenAI, OpenRouter, and Gemini.",
  "- Soft skills: Communication, teamwork, adaptability, leadership, and presentation skills.",
  "",
  "PROJECTS",
  "- StartupMantra - Your Idea, Our Roadmap:",
  "  Description: An AI-powered platform that transforms raw startup ideas into structured execution roadmaps.",
  "  Problem solved: Many people have ideas but struggle to execute them. StartupMantra bridges the gap between idea and execution.",
  "  How it works: The user enters an idea, AI refines it, and generates a problem statement, solution, target audience, tasks, risks, and tools in a single vertical flow UI.",
  "  Key features: AI-based idea generation, roadmap creation, task breakdown, risk analysis, tool suggestions, mentor-style guidance, guest mode, login system, and multi-model fallback AI.",
  "  Stack: React, Next.js, Node.js, Firebase, Tailwind CSS, OpenRouter.",
  "  Challenges: Structured AI output, consistent responses, and handling AI failures.",
  "  Solutions: Prompt engineering, fallback model system, and output formatting logic.",
  "  Impact: Reduces planning time, helps beginners build startups, and has strong SaaS potential.",
  "  Future scope: Dashboard system, idea saving, collaboration features, and monetization.",
  "  GitHub: https://github.com/udayyadav252004/startupmantra",
  "  Live: https://startupmantra.vercel.app/",
  "  Tagline: Turn your idea into a roadmap in minutes.",
  "- UD Growth Labs - Business Growth Website:",
  "  Description: A conversion-focused website for lead generation through WhatsApp integration.",
  "  Problem solved: Businesses struggle to convert website visitors into actual leads.",
  "  How it works: Users interact with pricing plans, WhatsApp buttons, and a review system to create instant lead paths.",
  "  Key features: WhatsApp lead generation, dynamic review and rating system, live average rating calculation, responsive UI, and conversion-focused design.",
  "  Stack: HTML, CSS, JavaScript, Node.js serverless, Vercel.",
  "  Challenges: Designing a conversion-focused UI and implementing dynamic rating updates.",
  "  Impact: Improves lead generation and builds trust through reviews.",
  "  GitHub: https://github.com/udayyadav252004/udgrowthlabs",
  "  Live: https://udgrowthlabs.vercel.app/",
  "  Tagline: Built to convert visitors into real business leads.",
  "- Lucky Cricket - The Game of Luck:",
  "  Description: A Python-based cricket game combining logic and randomness for interactive gameplay.",
  "  Problem solved: Traditional simple games often lack interaction and unpredictability.",
  "  How it works: The player makes choices, randomness drives outcomes like runs and wickets, and the score updates in real time.",
  "  Key features: Single-player and multiplayer modes, real-time commentary, GUI-based interaction, and event-driven logic.",
  "  Stack: Python, Tkinter.",
  "  Concept: Event-driven programming plus randomness simulation.",
  "  GitHub: https://github.com/udayyadav252004/Lucky-Cricket",
  "  Tagline: The Game of Luck.",
  "- Developer Portfolio:",
  "  Description: A cinematic, interactive portfolio built to showcase projects and skills with a unique experience.",
  "  Key features: Magic wand to book intro, AI chatbot assistant, dynamic project showcase, glassmorphism, glow effects, and smooth animations.",
  "  Stack: Next.js, React, Tailwind CSS, GSAP, Framer Motion, Three.js.",
  "  Impact: Creates a strong first impression and demonstrates full-stack plus AI skills.",
  "  GitHub: https://github.com/udayyadav252004/portfolio",
  "  Live: https://uday-yadav-portfolio.vercel.app/",
  "  Tagline: Not just a portfolio - an experience.",
  "",
  "CONTACT",
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

function detectTopicFromText(text: string): PortfolioTopic | null {
  const normalized = text.toLowerCase();

  if (includesAny(normalized, ["startupmantra", "startup mantra"])) {
    return "startupmantra";
  }

  if (includesAny(normalized, ["ud growth", "growth labs", "business growth website"])) {
    return "ud-growth-labs";
  }

  if (includesAny(normalized, ["lucky cricket", "cricket game"])) {
    return "lucky-cricket";
  }

  if (includesAny(normalized, ["portfolio", "this website", "site"])) {
    return "portfolio";
  }

  if (includesAny(normalized, ["skills", "technology", "technologies", "tech stack"])) {
    return "skills";
  }

  if (includesAny(normalized, ["contact", "email", "reach", "hire", "linkedin", "instagram", "github"])) {
    return "contact";
  }

  if (
    includesAny(normalized, [
      "who is uday",
      "about uday",
      "background",
      "education",
      "where is he from",
      "strength",
      "mindset",
      "approach"
    ])
  ) {
    return "uday";
  }

  return null;
}

function inferCurrentTopic(messages: PortfolioChatMessage[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const topic = detectTopicFromText(messages[index].content);

    if (topic) {
      return topic;
    }
  }

  return null;
}

function isFollowUpQuestion(text: string) {
  const normalized = text.toLowerCase();

  return (
    includesAny(normalized, [
      "tell me more",
      "more about it",
      "more about this",
      "what about it",
      "what about this",
      "its tech stack",
      "its stack",
      "what problem does it solve",
      "what problem does this solve",
      "how does it work",
      "how does this work",
      "what are its features",
      "what about the features",
      "what about the challenges",
      "what about the impact",
      "future scope",
      "tell me more about that"
    ]) ||
    /(^|\s)(it|this project|that project|this one|that one)(\s|$)/.test(normalized)
  );
}

function getProjectReply(topic: ProjectTopic, intent: string) {
  const project = projectKnowledge[topic];

  if (intent === "stack") {
    return [
      `${project.name} uses ${project.stack}`,
      `That stack fits the product well because ${project.highlight.toLowerCase()}`
    ].join("\n");
  }

  if (intent === "problem") {
    return [
      `${project.name} solves a clear problem.`,
      project.problem
    ].join("\n");
  }

  if (intent === "how") {
    return [
      `${project.shortName} works in a straightforward product flow.`,
      project.howItWorks
    ].join("\n");
  }

  if (intent === "features") {
    return [
      `${project.name} is feature-rich but focused.`,
      project.features
    ].join("\n");
  }

  if (intent === "challenges" && project.challenges) {
    return [
      `${project.name} had a few key implementation challenges.`,
      project.challenges,
      project.solutions ? `Uday handled them with ${project.solutions.toLowerCase()}` : ""
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (intent === "impact" && project.impact) {
    return [
      `${project.name} creates practical value.`,
      project.impact
    ].join("\n");
  }

  if (intent === "future" && project.futureScope) {
    return [
      `${project.name} has strong room to grow.`,
      project.futureScope
    ].join("\n");
  }

  if (intent === "links") {
    return [
      `${project.name} is available here:`,
      project.links
    ].join("\n");
  }

  return [
    project.description,
    project.highlight,
    `Tagline: ${project.tagline}`
  ].join("\n");
}

function detectIntent(text: string) {
  const normalized = text.toLowerCase();

  if (includesAny(normalized, ["tech stack", "stack", "technologies", "built with"])) {
    return "stack";
  }

  if (includesAny(normalized, ["problem", "why", "solve"])) {
    return "problem";
  }

  if (includesAny(normalized, ["how it works", "how does it work", "workflow", "flow"])) {
    return "how";
  }

  if (includesAny(normalized, ["feature", "features"])) {
    return "features";
  }

  if (includesAny(normalized, ["challenge", "challenges"])) {
    return "challenges";
  }

  if (includesAny(normalized, ["impact", "result", "results"])) {
    return "impact";
  }

  if (includesAny(normalized, ["future", "scope", "roadmap"])) {
    return "future";
  }

  if (includesAny(normalized, ["github", "live", "link", "links"])) {
    return "links";
  }

  return "summary";
}

export function getLocalAssistantReply(
  query: string,
  messages: PortfolioChatMessage[] = []
) {
  const normalized = query.toLowerCase();
  const explicitTopic = detectTopicFromText(query);
  const inferredTopic = inferCurrentTopic(messages);
  const activeTopic =
    explicitTopic || (isFollowUpQuestion(query) ? inferredTopic : inferredTopic);
  const intent = detectIntent(query);

  if (
    includesAny(normalized, [
      "best project",
      "top project",
      "flagship project",
      "featured project",
      "main project"
    ])
  ) {
    return [
      "StartupMantra is the best project to start with.",
      "It solves a real founder problem by converting raw ideas into structured execution roadmaps in minutes.",
      "It also shows Uday's strength in AI integration, prompt engineering, and product thinking."
    ].join("\n");
  }

  if (
    activeTopic &&
    (activeTopic === "startupmantra" ||
      activeTopic === "ud-growth-labs" ||
      activeTopic === "lucky-cricket" ||
      activeTopic === "portfolio")
  ) {
    return getProjectReply(activeTopic, intent);
  }

  if (includesAny(normalized, ["skills", "technology", "technologies", "stack", "tech stack"])) {
    return [
      "Uday's core strengths are Python, C++, C, React, Next.js, Node.js, and AI integration.",
      "He also works with Firebase, Tailwind CSS, GSAP, Framer Motion, Three.js, OpenAI, OpenRouter, and Gemini.",
      "On the softer side, he brings communication, adaptability, teamwork, leadership, and presentation skills."
    ].join("\n");
  }

  if (
    includesAny(normalized, [
      "who is uday",
      "about uday",
      "background",
      "education",
      "where is he from"
    ])
  ) {
    return [
      "Uday Yadav is an aspiring software developer from Bhopal, Madhya Pradesh.",
      "He is pursuing B.Tech in Computer Science Engineering at RGPV University from 2022 to 2026, with a CGPA around 7.5.",
      "He is especially focused on real-world software, AI workflows, and turning ideas into working products."
    ].join("\n");
  }

  if (
    includesAny(normalized, [
      "strength",
      "strengths",
      "problem solving",
      "approach",
      "thinking",
      "mindset"
    ])
  ) {
    return [
      "Uday is known for fast learning, analytical thinking, and a strong problem-solving mindset.",
      "He tends to break ideas into practical systems, then turns them into working products with clean execution.",
      "That is especially visible in StartupMantra and this portfolio."
    ].join("\n");
  }

  if (includesAny(normalized, ["hackathon", "competition", "hackerrank", "lb5", "codeactive"])) {
    return [
      "Uday secured 1st rank in the LB5 HackerRank contest and has also participated in hackathons like Codeactive 3.0.",
      "That adds a strong competitive and practical layer to his development profile."
    ].join("\n");
  }

  if (includesAny(normalized, ["chatgpt", "gemini", "ai tools", "ai integration"])) {
    return [
      "Uday actively explores AI tools like ChatGPT and Gemini to build intelligent systems and automate workflows.",
      "He also integrates OpenAI, OpenRouter, and multi-model fallback patterns into real product ideas like StartupMantra."
    ].join("\n");
  }

  if (includesAny(normalized, ["projects", "work", "portfolio projects"])) {
    return [
      "The main projects are StartupMantra, UD Growth Labs, Lucky Cricket, and this cinematic developer portfolio.",
      "StartupMantra is the headline AI product, while the others show business website, gameplay logic, and full-stack UI strength."
    ].join("\n");
  }

  if (includesAny(normalized, ["contact", "email", "reach", "hire", "linkedin", "instagram", "github"])) {
    return [
      "You can contact Uday at udayyadav252004@gmail.com.",
      "GitHub: github.com/udayyadav252004",
      "LinkedIn: linkedin.com/in/udayadav"
    ].join("\n");
  }

  return unknownAssistantMessage;
}
