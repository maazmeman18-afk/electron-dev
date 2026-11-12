"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Item = { label: string; href: string };

export function MobileNav({
  items,
  pathname,
}: {
  items: readonly Item[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close the menu when the start-project dialog opens on top of it.
  useEffect(() => {
    const onEnquiry = () => setOpen(false);
    window.addEventListener("enquiry:open", onEnquiry);
    return () => window.removeEventListener("enquiry:open", onEnquiry);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Stop the page behind the menu from scrolling.
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 text-sm font-bold uppercase tracking-wide active:scale-[0.97] motion-reduce:transform-none"
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
        {open ? "Close" : "Menu"}
      </button>

      {/* Rendered into <body>: the header's backdrop blur would otherwise trap
          this fixed panel inside the 64px header bar. */}
      {open &&
        createPortal(
        <div
          id={panelId}
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto border-t-2 border-ink bg-paper px-5 pb-8 pt-2 animate-fade-in md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item, index) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline gap-4 border-b-2 border-line py-4 font-display text-4xl font-extrabold uppercase tracking-tight aria-[current=page]:text-primary"
                >
                  <span
                    aria-hidden="true"
                    className="font-sans text-sm font-bold text-muted"
                  >
                    0{index + 1}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Button
              href="/contact"
              size="lg"
              enquiry
              className="w-full"
            >
              Start a Project
            </Button>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={`mailto:${site.email}`} className="break-all">
                {site.email}
              </a>
            </div>
          </div>
        </div>,
          document.body
        )}
    </div>
  );
}
