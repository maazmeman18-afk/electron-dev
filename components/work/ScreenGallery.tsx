"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/projects";
import { reducedMotionQuery } from "@/lib/spring";

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const OPEN_MS = 320;
const CLOSE_MS = 240;

/**
 * Case-study screenshots. Clicking one opens it full size in a native
 * <dialog> (focus is trapped, Esc closes, focus returns to the thumbnail),
 * growing out of the thumbnail so it is clear where it came from, and
 * shrinking back into place on close. Without JavaScript the thumbnails are
 * plain images; with reduced motion the dialog simply appears.
 */
export function ScreenGallery({ shots }: { shots: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closing = useRef(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Transform that puts the big image exactly over the thumbnail. */
  const fromThumb = (index: number) => {
    const thumb = thumbRefs.current[index]?.querySelector("img");
    const image = imageRef.current;
    if (!thumb || !image) return null;
    const a = thumb.getBoundingClientRect();
    const b = image.getBoundingClientRect();
    if (!b.width || !b.height) return null;
    return `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  };

  // Open: show the dialog, then grow the image from its thumbnail.
  useEffect(() => {
    if (openIndex === null) return;
    const dialog = dialogRef.current;
    const image = imageRef.current;
    if (!dialog || !image) return;
    if (!dialog.open) dialog.showModal();
    if (window.matchMedia(reducedMotionQuery).matches) return;
    const from = fromThumb(openIndex);
    if (!from) return;
    image.animate([{ transform: from }, { transform: "none" }], {
      duration: OPEN_MS,
      easing: EASE_OUT,
    });
    dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
  }, [openIndex]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const image = imageRef.current;
    if (!dialog || openIndex === null || closing.current) return;
    const finish = () => {
      closing.current = false;
      dialog.close();
      setOpenIndex(null);
    };
    const to = window.matchMedia(reducedMotionQuery).matches ? null : fromThumb(openIndex);
    if (!to || !image) return finish();
    closing.current = true;
    image.animate([{ transform: "none" }, { transform: to }], {
      duration: CLOSE_MS,
      easing: EASE_OUT,
      fill: "forwards",
    });
    dialog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: CLOSE_MS, easing: "ease-in", fill: "forwards" })
      .finished.then(() => {
        image.getAnimations().forEach((a) => a.cancel());
        dialog.getAnimations().forEach((a) => a.cancel());
        finish();
      });
  }, [openIndex]);

  const shot = openIndex === null ? null : shots[openIndex];

  // Group by product (Website, Android app, CRM) in the order they appear,
  // keeping each shot's overall index for the lightbox.
  const groups: { name: string; items: { shot: GalleryImage; index: number }[] }[] = [];
  shots.forEach((item, index) => {
    const found = groups.find((g) => g.name === item.group);
    if (found) found.items.push({ shot: item, index });
    else groups.push({ name: item.group, items: [{ shot: item, index }] });
  });

  return (
    <>
      {groups.map(({ name, items }) => {
        const phone = items[0].shot.height > items[0].shot.width;
        return (
          <section key={name} className="mt-10 first:mt-8">
            {groups.length > 1 && (
              <h3 className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl">
                {name}
              </h3>
            )}
            <ul
              // Compact thumbnails: three across on desktop; click to see full size.
              className={`mt-4 grid ${
                phone
                  ? "max-w-md grid-cols-2 gap-4 sm:gap-6"
                  : `gap-5 sm:grid-cols-2 lg:gap-6 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`
              }`}
            >
              {items.map(({ shot: item, index: i }) => (
                <li key={item.src}>
                  <figure>
                    <button
                      type="button"
                      ref={(el) => {
                        thumbRefs.current[i] = el;
                      }}
                      onClick={() => setOpenIndex(i)}
                      data-cursor="Zoom in"
                      aria-label={`Enlarge: ${item.alt}`}
                      className={`card-outline block w-full cursor-zoom-in overflow-hidden bg-paper ${
                        phone ? "rounded-[1.5rem]" : "rounded-2xl"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        sizes={phone ? "(min-width: 768px) 220px, 45vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                        className="h-auto w-full"
                      />
                    </button>
                    <figcaption className="mt-2.5 text-xs font-semibold leading-snug text-muted sm:text-sm">{item.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <dialog
        ref={dialogRef}
        aria-label={shot ? shot.caption : "Screenshot"}
        onCancel={(event) => {
          // Esc: run the closing animation instead of vanishing.
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          // A click on the dark backdrop (the dialog itself) closes it.
          if (event.target === event.currentTarget) close();
        }}
        className="screen-dialog m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 sm:p-8"
      >
        {shot && (
          <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4">
            <Image
              ref={imageRef}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="100vw"
              className="pointer-events-auto h-auto max-h-[80dvh] w-auto max-w-full origin-top-left rounded-2xl border-2 border-ink bg-paper"
            />
            <p className="pointer-events-auto max-w-2xl text-center text-sm font-semibold text-paper">
              {shot.caption}
            </p>
            <button
              type="button"
              onClick={close}
              className="pointer-events-auto absolute right-4 top-4 inline-flex h-11 items-center gap-2 rounded-full border-2 border-paper/60 bg-ink px-4 text-sm font-bold uppercase text-paper transition-colors duration-150 hover:border-accent hover:text-accent sm:right-8 sm:top-8"
            >
              Close
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
