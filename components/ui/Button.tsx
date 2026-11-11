import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:bg-ink hover:text-lime",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink underline underline-offset-4 hover:translate-y-0",
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
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
