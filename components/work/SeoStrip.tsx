import type { CSSProperties } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

const steps = [
  { title: "Research", text: "The words your customers type into Google, and who ranks for them today." },
  { title: "Technical SEO", text: "Speed, mobile, sitemap and structured data, so Google can read every page." },
  { title: "On-page SEO", text: "Titles, descriptions, headings and content written for people and search." },
  { title: "Local SEO", text: "Google Business Profile and local pages, so nearby customers find you." },
  { title: "Analytics", text: "Google Analytics 4 and Search Console, tracking enquiries, calls and WhatsApp." },
  { title: "Reports", text: "Monthly reports on rankings, traffic and enquiries, with what we do next." },
];

/** The SEO selling point: every build is made to be found. */
export function SeoStrip({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="seo-strip-heading"
      className={`border-y-2 border-ink bg-ink py-16 text-paper sm:py-24 [&_*:focus-visible]:outline-accent ${className}`}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
              SEO and analytics built in
            </p>
            <h2
              id="seo-strip-heading"
              className="mt-3 text-display-md uppercase"
            >
              Websites that get found,{" "}
              <span className="text-accent">not just built.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-paper/75">
              A good-looking site is only half the job. Every website and store we
              build is set up for Google from day one, and we keep growing it with
              SEO and analytics after launch.
            </p>
            <Link
              href="/services/seo-and-analytics"
              className="mt-6 inline-flex items-center gap-2 font-bold uppercase tracking-wide text-accent underline-offset-4 hover:underline"
            >
              See our SEO service
              <ArrowRightIcon className="text-[1rem]" />
            </Link>
          </div>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative rounded-3xl border-2 border-paper/20 p-6 transition-colors duration-200 hover:border-accent"
              // --c: column on desktop, so each row ticks left to right.
              style={{ "--c": index % 3 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="font-display text-sm font-bold text-accent"
              >
                0{index + 1}
              </span>
              {/* Ticks on as the card scrolls in (scroll-driven CSS). */}
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border-2 border-paper/25"
              >
                <span className="seo-tick grid h-full w-full place-items-center rounded-full bg-accent text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-paper/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
