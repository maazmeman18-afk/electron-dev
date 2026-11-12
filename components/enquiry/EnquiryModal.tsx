"use client";

import { useEffect, useId, useRef } from "react";
import { EnquiryForm } from "./EnquiryForm";

/**
 * One dialog for the whole site. Any link with a `data-enquiry` attribute
 * (see Button's `enquiry` prop) opens it. Without JavaScript those links
 * still go to /contact.
 */
export function EnquiryModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target as Element | null;
      const trigger = target?.closest?.("a[data-enquiry]");
      const dialog = dialogRef.current;
      if (!trigger || !dialog || dialog.open) return;

      // Capture phase + stopPropagation: Next's <Link> would otherwise
      // handle the click first and navigate to /contact.
      event.preventDefault();
      event.stopPropagation();
      window.dispatchEvent(new Event("enquiry:open"));
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        document.documentElement.style.overflow = "";
      }}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) close();
      }}
      className="enquiry-dialog card-outline m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-3xl bg-paper p-0 text-ink sm:m-auto sm:max-w-xl sm:rounded-3xl"
    >
      <div className="relative p-6 pb-8 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-paper transition-colors duration-150 hover:bg-lime sm:right-6 sm:top-6"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <EnquiryForm variant="modal" titleId={titleId} />
      </div>
    </dialog>
  );
}
