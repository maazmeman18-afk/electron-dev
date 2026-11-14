import Link from "next/link";
import { publishedTestimonials, type Testimonial } from "@/lib/testimonials";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function Card({
  item,
  featured,
  showLink,
  large,
}: {
  item: Testimonial;
  featured: boolean;
  showLink: boolean;
  /** Bigger type and padding, for the Our Work page. */
  large: boolean;
}) {
  return (
    <figure
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-6 ${large ? "sm:p-8 lg:p-10" : ""} ${
        featured
          ? "card-outline bg-ink text-paper"
          : "card-outline bg-paper text-ink"
      }`}
    >
      {featured && <div aria-hidden="true" className="dot-grid dot-grid--dark absolute inset-0 -z-10" />}

      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className={`font-display font-extrabold leading-[0.6] text-accent ${
            large ? (featured ? "text-7xl" : "text-6xl") : "text-5xl"
          }`}
        >
          &ldquo;
        </span>
        {item.service && (
          <span
            className={`rounded-full border-2 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide ${
              featured ? "border-paper/30 text-paper/85" : "border-ink"
            }`}
          >
            {item.service}
          </span>
        )}
      </div>

      <blockquote
        className={`mt-4 flex-1 leading-relaxed [text-wrap:pretty] ${
          !large
            ? // Compact: the same size on every card so they read as equals.
              "text-[0.95rem] sm:text-base"
            : featured
              ? "max-w-4xl font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-[1.75rem]"
              : "text-base sm:text-lg"
        }`}
      >
        {item.quote}
      </blockquote>

      <figcaption
        className={`mt-6 flex items-center gap-3 border-t-2 pt-4 ${
          featured ? "border-paper/15" : "border-line"
        }`}
      >
        <span
          aria-hidden="true"
          className={`grid shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display font-extrabold text-ink ${
            large ? "h-12 w-12 text-base" : "h-10 w-10 text-sm"
          }`}
        >
          {initials(item.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display font-extrabold uppercase tracking-tight">
            {item.name}
          </span>
          <span className={`block text-sm ${featured ? "text-paper/65" : "text-muted"}`}>
            {item.role ? `${item.role}, ` : ""}
            {item.company}
          </span>
        </span>
      </figcaption>

      {showLink && item.projectSlug && (
        <Link
          href={`/work/${item.projectSlug}`}
          className={`mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold uppercase tracking-wide underline-offset-4 hover:underline ${
            featured ? "text-accent" : "text-primary"
          }`}
        >
          Read the case study
          <ArrowRightIcon className="text-[0.95rem]" />
        </Link>
      )}
    </figure>
  );
}

/**
 * Client testimonials. Renders nothing until lib/testimonials.ts has at least
 * one entry with a real, approved quote, so the site never shows placeholders.
 *
 * Layouts (desktop; phones and tablets always use a swipeable row):
 * - "compact" (Home): equal cards, three across, the first on navy.
 * - "large" (Our Work): the first quote full width in large type on navy,
 *   the rest as equal wide cards two across below it.
 */
export function Testimonials({
  projectSlug,
  size = "compact",
  withContainer = true,
  className = "",
}: {
  /** Only show quotes for this case study. */
  projectSlug?: string;
  size?: "compact" | "large";
  withContainer?: boolean;
  className?: string;
}) {
  const items: Testimonial[] = projectSlug
    ? publishedTestimonials.filter((t) => t.projectSlug === projectSlug)
    : publishedTestimonials;

  if (items.length === 0) return null;

  const single = items.length === 1;
  const large = size === "large";

  const content = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            What clients say
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
            In their words
          </h2>
        </div>
        {!single && (
          <p className="text-sm font-semibold text-muted lg:hidden" aria-hidden="true">
            Swipe to read more →
          </p>
        )}
      </div>

      <ul
        className={
          single
            ? "mt-10 max-w-md"
            : `-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 ${
                large ? "lg:grid-cols-2" : "lg:grid-cols-3"
              }`
        }
      >
        {items.map((item, i) => {
          const featured = i === 0;
          return (
            <li
              key={`${item.name}-${item.company}`}
              className={
                single
                  ? ""
                  : `reveal w-[86%] shrink-0 snap-center sm:w-[60%] md:w-[46%] lg:w-auto ${
                      large && featured ? "lg:col-span-2" : ""
                    }`
              }
            >
              <Card item={item} featured={featured} showLink={!projectSlug} large={large} />
            </li>
          );
        })}
      </ul>
    </>
  );

  if (!withContainer) return <div className={className}>{content}</div>;

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <Container>{content}</Container>
    </section>
  );
}
