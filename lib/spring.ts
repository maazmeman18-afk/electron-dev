/**
 * A tiny 2D spring for decorative pointer-following (the cursor label and the
 * dot spotlight). It writes through `apply` on each animation frame, so the
 * caller sets `style.transform` directly and React never re-renders per move.
 *
 * Defaults are the Apple-style spring { duration: 0.5, bounce: 0.2 } from the
 * animate skill, converted to physics for mass 1:
 *   stiffness = (2π / duration)²       ≈ 158
 *   damping   = 4π (1 − bounce) / duration ≈ 20.1
 * The loop stops by itself once the value settles.
 */
export function createSpring2D(
  apply: (x: number, y: number) => void,
  { stiffness = 158, damping = 20.1 }: { stiffness?: number; damping?: number } = {},
) {
  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  let last = 0;

  const step = (now: number) => {
    // Clamp the step so a backgrounded tab does not launch the value.
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;

    vx += (stiffness * (tx - x) - damping * vx) * dt;
    vy += (stiffness * (ty - y) - damping * vy) * dt;
    x += vx * dt;
    y += vy * dt;

    const settled =
      Math.abs(tx - x) < 0.1 &&
      Math.abs(ty - y) < 0.1 &&
      Math.abs(vx) < 0.1 &&
      Math.abs(vy) < 0.1;

    if (settled) {
      x = tx;
      y = ty;
      vx = vy = 0;
      frame = 0;
      apply(x, y);
      return;
    }

    apply(x, y);
    frame = requestAnimationFrame(step);
  };

  return {
    /** Spring towards a new target. */
    to(nx: number, ny: number) {
      tx = nx;
      ty = ny;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    },
    /** Move straight to a point with no motion (first appearance, reduced motion). */
    jump(nx: number, ny: number) {
      cancelAnimationFrame(frame);
      frame = 0;
      x = tx = nx;
      y = ty = ny;
      vx = vy = 0;
      apply(x, y);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

/** True when the device has a real mouse or trackpad that can hover. */
export const finePointerQuery = "(hover: hover) and (pointer: fine)";
export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
