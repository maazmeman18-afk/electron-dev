"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 transition-colors duration-200 ${
        scrolled
          ? "border-ink bg-paper/85 backdrop-blur-md [@media(prefers-reduced-transparency:reduce)]:bg-paper"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="relative py-2 text-sm font-semibold uppercase tracking-wide text-ink/70 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200 after:ease-out hover:text-ink hover:after:scale-x-100 aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none"
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" size="sm" enquiry className="ml-2">
            Start a Project
          </Button>
        </nav>

        <MobileNav items={navItems} pathname={pathname} />
      </div>
    </header>
  );
}
