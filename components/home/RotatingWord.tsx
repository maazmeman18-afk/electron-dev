"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cycles through words in place. All words share one grid cell, so the line
 * keeps the height of the longest word and nothing below it jumps. The first
 * word is in the server HTML, so the headline reads correctly without JS.
 * Rotation pauses while the headline is off screen or the tab is hidden.
 */
export function RotatingWord({
  words,
  interval = 2600,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = true;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(el);

    const timer = window.setInterval(() => {
      if (onScreen && !document.hidden) {
        setIndex((i) => (i + 1) % words.length);
      }
    }, interval);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [words.length, interval]);

  return (
    <span ref={ref} className={`inline-grid ${className}`}>
      {words.map((word, i) => (
        <span
          key={word}
          className={`col-start-1 row-start-1 ${
            i === index ? "animate-word-in" : "invisible"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
