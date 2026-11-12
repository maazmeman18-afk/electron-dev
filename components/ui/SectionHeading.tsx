import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  children,
  className = "",
  size = "lg",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  size?: "lg" | "md";
  tone?: "light" | "dark";
  /** Use "h1" when this is the page's main heading. */
  as?: "h1" | "h2";
}) {
  const headingClass = size === "md" ? "text-display-md" : "text-display-lg";
  const eyebrowClass = tone === "dark" ? "text-paper/70" : "text-muted";

  return (
    <div className={className}>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>
        {eyebrow}
      </p>
      <Tag className={`mt-4 uppercase ${headingClass}`}>{children}</Tag>
    </div>
  );
}
