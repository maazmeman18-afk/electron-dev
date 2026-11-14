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
}: {
  item: Testimonial;
  featured: boolean;
  showLink: boolean;
}) {
  return (
    <figure
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-8 ${
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
            featured ? "text-8xl" : "text-6xl"
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
          featured
            ? "font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl lg:text-3xl"
            : "text-base sm:text-lg"
        }`}
      >
        {item.quote}
      </blockquote>

      <figcaption
        className={`mt-8 flex items-center gap-3 border-t-2 pt-5 ${
          featured ? "border-paper/15" : "border-line"
        }`}
      >
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display text-base font-extrabold text-ink"
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
 * Layout: the first quote is featured (large, on navy). On desktop the rest sit
 * beside and below it; on phones all cards sit in a swipeable row.
 */
export function Testimonials({
  projectSlug,
  withContainer = true,
  className = "",
}: {
  /** Only show quotes for this case study. */
  projectSlug?: string;
  withContainer?: boolean;
  className?: string;
}) {
  const items: Testimonial[] = projectSlug
    ? publishedTestimonials.filter((t) => t.projectSlug === projectSlug)
    : publishedTestimonials;

  if (items.length === 0) return null;

  const single = items.length === 1;

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
            ? "mt-10"
            : "-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
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
                  : `reveal w-[86%] shrink-0 snap-center sm:w-[70%] lg:w-auto ${
                      featured ? "lg:col-span-2 lg:row-span-2" : ""
                    }`
              }
            >
              <Card item={item} featured={featured} showLink={!projectSlug} />
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
