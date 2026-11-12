import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RotatingWord } from "./RotatingWord";

const starburstPoints = Array.from({ length: 24 }, (_, index) => {
  const radius = index % 2 === 0 ? 50 : 38;
  const angle = (Math.PI * 2 * index) / 24;
  return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

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

function ArrowRightIcon({ className = "" }: { className?: string }) {
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
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );
}

function Starburst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points={starburstPoints} fill="currentColor" />
    </svg>
  );
}

function SpinningBadge() {
  return (
    <Link
      href="/contact"
      data-enquiry=""
      aria-label="Start a project"
      className="group relative grid h-28 w-28 place-items-center sm:h-36 sm:w-36 rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-accent hover:text-ink"
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path
            id="hero-badge-circle"
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="17"
          fontWeight="700"
          letterSpacing="2"
          className="font-display uppercase"
        >
          <textPath href="#hero-badge-circle" textLength="455">
            Start a project <SparkleIcon className="inline-block translate-x-[-1px]" /> Start a project <SparkleIcon className="inline-block translate-x-[-1px]" />
          </textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className="text-4xl transition-transform duration-300 group-hover:rotate-45 motion-reduce:transform-none"
      >
        <ArrowRightIcon className="text-[1.5rem]" />
      </span>
    </Link>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          Digital studio · Ahmedabad, India
        </p>

        <h1 className="mt-6 text-display-xl text-[clamp(2.75rem,7vw,6.25rem)] uppercase">
          <span className="sr-only">We turn ideas into digital products.</span>
          <span aria-hidden="true">
            We turn{" "}
            <span className="inline-block -rotate-2 rounded-[0.18em] border-[0.04em] border-ink bg-accent px-[0.14em]">
              ideas
            </span>{" "}
            into
            <RotatingWord
              className="block text-primary lg:whitespace-nowrap"
              words={[
                "digital products.",
                "websites.",
                "online stores.",
                "CRM systems.",
                "business software.",
              ]}
            />
          </span>
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-lg text-muted sm:text-xl">
              Websites, e-commerce platforms and business systems engineered to
              help ambitious businesses move forward.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href="/contact" size="lg" enquiry>
                Start a Project
              </Button>
              <Button href="/work" size="lg" variant="outline">
                Explore Our Work
              </Button>
            </div>
          </div>

          {/* Sticker cluster: decorative apart from the badge link. */}
          <div className="relative h-44 sm:h-56 lg:col-span-6 lg:h-64">
            <div
              aria-hidden="true"
              className="absolute left-0 top-2 animate-sticker-in motion-reduce:animate-sticker-fade [--tilt:-8deg] [rotate:var(--tilt)] sm:left-[6%]"
            >
              <span className="block rounded-full border-2 border-ink bg-paper px-5 py-2 font-display text-lg font-bold uppercase shadow-[4px_4px_0_var(--color-ink)]">
                E-commerce
              </span>
            </div>

            <div
              aria-hidden="true"
              className="absolute left-[46%] top-12 animate-sticker-in motion-reduce:animate-sticker-fade [animation-delay:80ms] [--tilt:6deg] [rotate:var(--tilt)] sm:left-[38%] sm:top-20"
            >
              <span className="relative grid h-20 w-20 place-items-center text-accent sm:h-28 sm:w-28">
                <Starburst className="absolute inset-0 h-full w-full" />
                <span className="relative font-display text-xl font-extrabold uppercase text-ink">
                  CRM
                </span>
              </span>
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 animate-sticker-in motion-reduce:animate-sticker-fade [animation-delay:160ms] [--tilt:4deg] [rotate:var(--tilt)] sm:bottom-2 sm:left-[10%]"
            >
              <span className="block rounded-xl bg-ink px-5 py-2 font-display text-lg font-bold uppercase text-accent">
                ERP + Billing
              </span>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:right-[4%]">
              <SpinningBadge />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
