import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://udayyadav.dev"),
  title: "Uday Yadav | AI Enthusiast Portfolio",
  description:
    "Personal portfolio of Uday Yadav, Computer Science student and AI enthusiast building intelligent systems, creative tools, and meaningful digital experiences.",
  keywords: [
    "Uday Yadav",
    "Computer Science",
    "AI Enthusiast",
    "Prompt Engineering",
    "Portfolio",
    "Python",
    "C++",
    "Web Development"
  ],
  openGraph: {
    title: "Uday Yadav | AI Enthusiast Portfolio",
    description:
      "Turning ideas into intelligent digital experiences through AI, software engineering, and creative development.",
    type: "website",
    url: "https://udayyadav.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday Yadav | AI Enthusiast Portfolio",
    description:
      "Turning ideas into intelligent digital experiences through AI, software engineering, and creative development."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-obsidian text-soft-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
