import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] motion-reduce:transform-none focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "border-2 border-ink bg-accent text-ink shadow-[3px_3px_0_var(--color-ink)] hover:bg-ink hover:text-accent",
  dark: "bg-ink text-paper hover:bg-primary",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Opens the start-project dialog instead of navigating (falls back to the link without JS). */
  enquiry?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  enquiry = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  }`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        data-enquiry={enquiry ? "" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
