import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Electron Developers, home"
      className="group inline-flex items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-full bg-lime font-display text-base font-extrabold text-ink transition-transform duration-300 group-hover:rotate-12 motion-reduce:transform-none"
      >
        E
      </span>
      <span className="font-display text-base font-extrabold uppercase leading-none tracking-tight">
        Electron
        <span className="block text-[0.7rem] font-semibold tracking-[0.24em] text-muted">
          Developers
        </span>
      </span>
    </Link>
  );
}
