"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Scroll distance before the header may hide, so it never hides at the top. */
const HIDE_AFTER = 160;
/** Ignore tiny scroll jitter (trackpads report many 1px moves). */
const THRESHOLD = 6;

export function Header() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Hide while reading down the page, come back as soon as the visitor
      // scrolls up. With reduced motion the header simply stays put.
      if (reduce.matches || y < HIDE_AFTER) {
        setHidden(false);
      } else if (y > lastY.current + THRESHOLD) {
        setHidden(true);
      } else if (y < lastY.current - THRESHOLD) {
        setHidden(false);
      } else {
        return;
      }
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page always starts with the header in view (state adjusted during
  // render, React's recommended alternative to a reset effect).
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setHidden(false);
  }

  return (
    <header
      // Keyboard users tabbing into the header always get it back.
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-50 border-b transition-[translate,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-line bg-paper/85 shadow-[0_10px_30px_-18px_rgb(14_58_79/0.35)] backdrop-blur-md [@media(prefers-reduced-transparency:reduce)]:bg-paper"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="relative py-2 text-[0.9rem] font-semibold uppercase tracking-wide text-ink/80 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200 after:ease-out hover:text-ink hover:after:scale-x-100 aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" size="sm" enquiry className="ml-1">
            Start a Project
          </Button>
        </nav>

        <MobileNav items={navItems} pathname={pathname} />
      </div>
    </header>
  );
}
