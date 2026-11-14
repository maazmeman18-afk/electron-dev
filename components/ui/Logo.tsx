import Image from "next/image";
import Link from "next/link";

/**
 * The Electron Developers logo. `tone="light"` draws it in white for dark
 * backgrounds (the mark is a single-colour PNG, so a filter recolours it).
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label="Electron Developers, home"
      className="group inline-flex items-center gap-2.5"
    >
      <Image
        src="/brand/mark.png"
        alt=""
        width={254}
        height={232}
        preload={!light}
        className={`h-10 w-auto transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none ${
          light ? "brightness-0 invert" : ""
        }`}
      />
      <span
        className={`font-display text-base font-extrabold uppercase leading-none tracking-tight ${
          light ? "text-paper" : "text-navy"
        }`}
      >
        Electron
        <span className="mt-0.5 block text-[0.68rem] font-semibold tracking-[0.24em]">
          Developers
        </span>
      </span>
    </Link>
  );
}
