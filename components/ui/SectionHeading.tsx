import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  children,
  className = "",
  size = "lg",
  tone = "light",
}: {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  size?: "lg" | "md";
  tone?: "light" | "dark";
}) {
  const headingClass = size === "md" ? "text-display-md" : "text-display-lg";
  const eyebrowClass = tone === "dark" ? "text-paper/70" : "text-muted";

  return (
    <div className={className}>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 uppercase ${headingClass}`}>{children}</h2>
    </div>
  );
}
