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
  padding = "md",
}: {
  children: ReactNode;
  className?: string;
  /** Ignored: each caller sets its own hover colours. Kept so existing callers compile. */
  hover?: boolean;
  padding?: Padding;
}) {
  return (
    <div
      className={`card-outline rounded-3xl transition-colors duration-300 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
