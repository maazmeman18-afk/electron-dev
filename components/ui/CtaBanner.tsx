import type { ReactNode } from "react";
import { Button } from "./Button";

/** Closing call to action used at the end of inner pages. */
export function CtaBanner({
  eyebrow = "Ready to start?",
  title,
  text,
  secondary,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  secondary?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={`card-outline rounded-3xl bg-accent p-7 sm:p-12 lg:p-14 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em]">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-display-md uppercase">{title}</h2>
      {text && <p className="mt-4 max-w-xl text-lg font-medium">{text}</p>}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/contact" size="lg" variant="dark" enquiry>
          Start a Project
        </Button>
        {secondary && (
          <Button href={secondary.href} size="lg" variant="outline">
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );
}
