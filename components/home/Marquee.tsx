import { homeMarqueeWords } from "@/lib/content/home";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`inline-block h-[1em] w-[1em] shrink-0 ${className}`}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v3m0 0v3m0-3h3m-3 0h-3m-5 5l-2 2m0 0l2 2m-2-2l-2-2m-2 2l2-2m0 0l2 2m0 0l2-2m-2 4l2-2"
      />
    </svg>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  const words = homeMarqueeWords;
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="px-6 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-5xl">
            {word}
          </span>
          <span aria-hidden="true" className="text-2xl text-paper sm:text-4xl">
            <SparkleIcon />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section className="overflow-hidden py-6">
      <div
        aria-hidden="true"
        className="group -mx-4 -rotate-1 bg-night py-5 text-accent sm:py-7"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
