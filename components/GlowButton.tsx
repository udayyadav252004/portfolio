import Link from "next/link";

type GlowButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
};

export function GlowButton({ href, label, variant = "primary" }: GlowButtonProps) {
  const baseClass =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-500";

  const variantClass =
    variant === "primary"
      ? "luminous-border bg-gradient-to-r from-blue-500/35 to-cyan-400/20 text-white hover:shadow-glow hover:-translate-y-0.5"
      : "border border-slate-300/30 bg-white/[0.02] text-slate-100 hover:border-blue-300/70 hover:bg-blue-400/10";

  return (
    <Link href={href} className={`${baseClass} ${variantClass}`}>
      {label}
      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
        ->
      </span>
    </Link>
  );
}
