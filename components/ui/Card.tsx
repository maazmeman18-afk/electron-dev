import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

const paddingClasses: Record<Padding, string> = {
  sm: "p-3 sm:p-4",
  md: "p-7 sm:p-10",
  lg: "p-10",
};

export function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: Padding;
}) {
  return (
    <div
      className={`rounded-3xl border border-line transition-colors duration-300 ${paddingClasses[padding]} ${hover ? "hover:border-ink" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
