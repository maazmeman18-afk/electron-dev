"use client";

import { useEffect, useRef } from "react";
import { createSpring2D, finePointerQuery, reducedMotionQuery } from "@/lib/spring";

/** Distance from the pointer, so the label never covers what is being clicked. */
const OFFSET = 18;

/**
 * A sticker label that follows the mouse over any element with a
 * `data-cursor="Label"` attribute. The real cursor stays visible; this sits
 * beside it. Mouse and trackpad only, never on touch. With reduced motion the
 * label tracks the pointer exactly instead of trailing it.
 */
export function CursorLabel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text || !window.matchMedia(finePointerQuery).matches) return;

    const reduce = window.matchMedia(reducedMotionQuery).matches;
    const spring = createSpring2D((x, y) => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    let visible = false;
    let px = -100;
    let py = -100;

    const show = (label: string) => {
      if (text.textContent !== label) text.textContent = label;
      if (!visible) {
        visible = true;
        spring.jump(px + OFFSET, py + OFFSET);
        root.dataset.visible = "true";
      }
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      root.dataset.visible = "false";
    };

    const check = (target: EventTarget | null) => {
      const host =
        target instanceof Element ? target.closest<HTMLElement>("[data-cursor]") : null;
      const label = host?.dataset.cursor;
      if (label) show(label);
      else hide();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      px = event.clientX;
      py = event.clientY;
      check(event.target);
      if (!visible) return;
      if (reduce) spring.jump(px + OFFSET, py + OFFSET);
      else spring.to(px + OFFSET, py + OFFSET);
    };

    // Content moves under a still pointer while scrolling.
    const onScroll = () => {
      if (px < 0) return;
      check(document.elementFromPoint(px, py));
    };

    const onLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spring.stop();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-visible="false"
      className="cursor-label pointer-events-none fixed left-0 top-0 z-[70]"
    >
      <span className="cursor-label-pill inline-block whitespace-nowrap rounded-full border-2 border-ink bg-accent px-3.5 py-1.5 font-display text-sm font-extrabold uppercase tracking-tight text-ink shadow-[3px_3px_0_var(--color-ink)]">
        <span ref={textRef} />
      </span>
    </div>
  );
}
