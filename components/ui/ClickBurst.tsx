"use client";

import { useEffect, useRef } from "react";
import { reducedMotionQuery } from "@/lib/spring";

/** Words that pop out on each click, taken in turn so they never repeat back to back. */
const WORDS = ["Website!", "CRM!", "SEO!", "Maaz!", "Let’s talk!"];

/** Sticker colours, matching the hero stickers. */
const STYLES = [
  "bg-accent text-ink",
  "bg-ink text-accent",
  "bg-lime text-ink",
  "bg-paper text-ink",
];

const SPARK_COLORS = ["var(--color-accent)", "var(--color-ink)", "var(--color-primary)"];

const SPARKLE_SVG =
  '<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0c.6 5.6 3.4 8.6 12 12-8.6 3.4-11.4 6.4-12 12-.6-5.6-3.4-8.6-12-12C8.6 8.6 11.4 5.6 12 0z"/></svg>';

/** Never more than this many bursts on screen, however fast someone clicks. */
const MAX_LIVE = 5;
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
/** Total life of a word sticker; it is fully visible for roughly 1.1s of it. */
const HOLD_MS = 1800;

/**
 * Bursts only fire on open page space. Anything clickable or card-like is
 * skipped so the effect never competes with a real action.
 */
const SKIP =
  "a, button, [role='button'], summary, input, textarea, select, option, label, " +
  "[contenteditable], dialog, article, .card-outline, [data-cursor], [data-enquiry], [data-no-burst]";

/**
 * A playful click effect for the whole site: wherever someone clicks or taps,
 * a sticker word pops up and floats away while sparkles burst outward.
 * Decorative only (aria-hidden, no pointer events). It only fires on open page
 * space: links, buttons, cards, form fields and the dialog are skipped. With reduced motion
 * the word just fades in place and there are no sparkles.
 */
export function ClickBurst() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduce = window.matchMedia(reducedMotionQuery);
    let wordIndex = 0;
    let live = 0;

    const burst = (x: number, y: number) => {
      live += 1;
      const pending: Promise<unknown>[] = [];
      const made: HTMLElement[] = [];

      // The word sticker
      const word = document.createElement("span");
      word.textContent = WORDS[wordIndex % WORDS.length];
      word.className = `absolute left-0 top-0 whitespace-nowrap rounded-full border-2 border-ink px-3.5 py-1.5 font-display text-sm font-extrabold uppercase tracking-tight shadow-[3px_3px_0_var(--color-ink)] ${
        STYLES[wordIndex % STYLES.length]
      }`;
      wordIndex += 1;
      word.style.zIndex = "1"; // above its own sparkles
      layer.appendChild(word);
      made.push(word);

      // Keep the sticker fully on screen near the edges.
      const width = word.offsetWidth;
      const height = word.offsetHeight;
      const margin = 8;
      const viewport = document.documentElement.clientWidth; // excludes the scrollbar
      const left = Math.min(Math.max(x - width / 2, margin), viewport - width - margin);
      const top = Math.max(y - height - 14, margin);
      const tilt = Math.round(Math.random() * 16 - 8);
      const at = `translate(${left}px, ${top}px) rotate(${tilt}deg)`;

      pending.push(
        reduce.matches
          ? word.animate(
              [
                { opacity: 0, transform: at },
                { opacity: 1, transform: at, offset: 0.12 },
                { opacity: 1, transform: at, offset: 0.78 },
                { opacity: 0, transform: at },
              ],
              { duration: HOLD_MS, easing: "linear", fill: "both" },
            ).finished
          : word.animate(
              [
                { opacity: 0, transform: `${at} translateY(8px) scale(0.6)`, easing: EASE_OUT },
                // Pop in fast, then hold and drift gently so it can be read.
                { opacity: 1, transform: `${at} translateY(-6px) scale(1)`, offset: 0.14, easing: "ease-out" },
                { opacity: 1, transform: `${at} translateY(-18px) scale(1)`, offset: 0.78, easing: "ease-in" },
                { opacity: 0, transform: `${at} translateY(-34px) scale(0.96)` },
              ],
              // Easing lives on each step above, so the overall timing is linear.
              { duration: HOLD_MS, easing: "linear", fill: "both" },
            ).finished,
      );

      // Sparkles
      if (!reduce.matches) {
        const count = 8;
        for (let i = 0; i < count; i++) {
          const spark = document.createElement("span");
          const size = 9 + Math.random() * 8;
          spark.innerHTML = SPARKLE_SVG;
          spark.className = "absolute left-0 top-0";
          spark.style.width = `${size}px`;
          spark.style.height = `${size}px`;
          spark.style.color = SPARK_COLORS[i % SPARK_COLORS.length];
          layer.appendChild(spark);
          made.push(spark);

          const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
          const distance = 30 + Math.random() * 30;
          const dx = Math.cos(angle) * distance;
          const dy = Math.sin(angle) * distance;
          const origin = `translate(${x - size / 2}px, ${y - size / 2}px)`;

          pending.push(
            spark.animate(
              [
                { opacity: 1, transform: `${origin} scale(0.4) rotate(0deg)`, easing: EASE_OUT },
                { opacity: 1, transform: `${origin} translate(${dx * 0.75}px, ${dy * 0.75}px) scale(1) rotate(45deg)`, offset: 0.45, easing: "ease-in" },
                { opacity: 0, transform: `${origin} translate(${dx}px, ${dy}px) scale(0) rotate(90deg)` },
              ],
              { duration: 600 + Math.random() * 200, easing: "linear", fill: "both" },
            ).finished,
          );
        }
      }

      Promise.allSettled(pending).then(() => {
        made.forEach((el) => el.remove());
        live -= 1;
      });
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.isPrimary || live >= MAX_LIVE) return;
      const target = event.target instanceof Element ? event.target : null;
      if (
        target?.closest(SKIP)
      ) {
        return;
      }
      burst(event.clientX, event.clientY);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    />
  );
}
