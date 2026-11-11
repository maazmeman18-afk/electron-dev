import Link from "next/link";
import { navItems } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 underline-offset-4 hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" size="sm">
            Start a Project
          </Button>
        </nav>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
