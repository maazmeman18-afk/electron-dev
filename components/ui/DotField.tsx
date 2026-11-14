"use client";

import { useEffect, useRef } from "react";
import { createSpring2D, finePointerQuery, reducedMotionQuery } from "@/lib/spring";

/** Spotlight diameter in px; keep in sync with the h-/w- classes below. */
const SIZE = 360;

/**
 * Dotted background for a section. The dots are plain CSS (.dot-grid), so they
 * show without JavaScript and cost nothing. On mouse/trackpad devices a
 * spotlight of brighter dots follows the pointer while it is over the parent
 * section. The parent needs `relative isolate` so this can sit behind content.
 */
export function DotField({
  tone = "light",
  interactive = true,
  className = "",
}: {
  tone?: "light" | "accent" | "dark";
  /** false: static dots only, no spotlight following the pointer. */
  interactive?: boolean;
  className?: string;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const spot = spotRef.current;
    const host = field?.parentElement;
    if (!interactive) return;
    if (!field || !spot || !host || !window.matchMedia(finePointerQuery).matches) return;

    const reduce = window.matchMedia(reducedMotionQuery).matches;
    const half = SIZE / 2;
    const spring = createSpring2D((x, y) => {
      const left = x - half;
      const top = y - half;
      spot.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      // Keep the spotlight's dots on the same grid as the base dots.
      spot.style.backgroundPosition = `${-left}px ${-top}px`;
    });

    let inside = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = field.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!inside || reduce) {
        inside = true;
        spring.jump(x, y);
        spot.dataset.visible = "true";
      } else {
        spring.to(x, y);
      }
    };

    const onLeave = () => {
      inside = false;
      spot.dataset.visible = "false";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      spring.stop();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className={`dot-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        tone === "accent" ? "dot-grid--accent" : tone === "dark" ? "dot-grid--dark" : ""
      } ${className}`}
    >
      {interactive && (
        <div
          ref={spotRef}
          data-visible="false"
          className="dot-spot absolute left-0 top-0 h-[360px] w-[360px]"
        />
      )}
    </div>
  );
}
