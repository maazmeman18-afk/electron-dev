"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";

type Item = { label: string; href: string };

export function MobileNav({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center rounded-full border border-ink px-5 text-sm font-semibold"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id={panelId}
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper px-5 pb-10 pt-4"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="border-b border-line py-5 font-display text-4xl font-bold uppercase tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" className="mt-8 w-full" onClick={close}>
            Start a Project
          </Button>
        </div>
      )}
    </div>
  );
}
