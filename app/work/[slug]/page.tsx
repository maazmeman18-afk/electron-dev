import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Tag } from "@/components/ui/Tag";
import { ArrowRightIcon } from "@/components/ui/icons";
import { projects, retiredProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";
import { Deliverables, domainOf } from "@/components/work/ProjectCards";
import { Testimonials } from "@/components/work/Testimonials";
import { ScreenGallery } from "@/components/work/ScreenGallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Every real case study is prerendered above, so navigating to one is already
// instant. Reading `params` only "blocks" for unknown slugs, where the page
// must answer with a real redirect (308) or 404 before streaming, so a
// <Suspense> fallback would be wrong here. No data is fetched.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} Case Study`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_IN",
      title: `${project.title} Case Study | ${site.name}`,
      description: project.description,
      url: `/work/${project.slug}`,
      images: [{ url: project.image.src, width: project.image.width, height: project.image.height }],
    },
  };
}

const eyebrow = "text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm";
const h2 =
  "mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl";

function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-paper"
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Projects removed from the site send visitors to the work page.
  if (retiredProjectSlugs.includes(slug)) permanentRedirect("/work");

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Client", value: project.client },
    { label: "Industry", value: project.industry },
    ...(project.locations ? [{ label: "Where", value: project.locations }] : []),
    { label: "We delivered", value: project.deliverables.join(", ") },
  ];

  // Breadcrumb trail for search results: Home > Our Work > this project.
  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Our Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${site.url}/work/${project.slug}` },
    ],
  }).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      {/* Hero */}
      <section className="pb-14 pt-12 sm:pb-20 sm:pt-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className={eyebrow}>
              <Link href="/work" className="underline-offset-4 hover:underline">
                Our work
              </Link>{" "}
              / Case study
            </p>
            <h1 className="mt-4 text-display-lg uppercase">{project.title}</h1>
            <p className="mt-3 text-lg font-semibold">{project.type}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
            <div className="mt-6">
              <Deliverables items={project.deliverables} />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {project.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 font-semibold transition-colors duration-200 ${
                    i === 0
                      ? "bg-accent shadow-[3px_3px_0_var(--color-ink)] hover:bg-ink hover:text-accent"
                      : "hover:bg-ink hover:text-paper"
                  }`}
                >
                  {link.label}
                  <span className="sr-only">(opens in a new tab)</span>
                  <ArrowRightIcon className="text-[1rem]" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <BrowserFrame
              src={project.image.src}
              alt={`Screenshot of the ${project.title} website`}
              width={project.image.width}
              height={project.image.height}
              domain={domainOf(project.url)}
            />
          </div>
        </Container>
      </section>

      {/* At a glance */}
      <section className="bg-sand">
        <Container>
          <dl className="grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="py-5 sm:pr-6">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* What we built */}
      <section className="py-16 sm:py-24">
        <Container>
          <p className={eyebrow}>What we built</p>
          <h2 className={h2}>
            {project.parts.length === 1
              ? "One product, built end to end"
              : `${project.parts.length} parts, one team`}
          </h2>
          <ol
            className={`mt-10 grid gap-6 ${
              project.parts.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
            }`}
          >
            {project.parts.map((part, i) => (
              <li
                key={part.title}
                className="card-outline reveal flex flex-col rounded-3xl bg-paper p-6 sm:p-8"
              >
                <span aria-hidden="true" className="font-display text-sm font-bold text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  {part.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{part.text}</p>
                <ul className="mt-5 space-y-3">
                  {part.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 font-medium">
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* SEO and analytics */}
      {project.seo.length > 0 && (
        <section className="border-y-2 border-ink bg-ink py-16 text-paper sm:py-24 [&_*:focus-visible]:outline-accent">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
                SEO and analytics
              </p>
              <h2 className="mt-3 text-display-md uppercase">
                Built to be <span className="text-accent">found.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-paper/75">
                Launch is where search starts. Here is how we set {project.client}{" "}
                up to be found on Google and to measure what it brings in.
              </p>
              <Link
                href="/services/seo-and-analytics"
                className="mt-6 inline-flex items-center gap-2 font-bold uppercase tracking-wide text-accent underline-offset-4 hover:underline"
              >
                Our SEO service
                <ArrowRightIcon className="text-[1rem]" />
              </Link>
            </div>
            <ol className="lg:col-span-7">
              {project.seo.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 border-t border-paper/15 py-5 last:border-b"
                >
                  <span aria-hidden="true" className="w-8 shrink-0 pt-0.5 font-display font-bold text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-lg font-semibold">{item}</span>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {/* Screens */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container>
            <p className={eyebrow}>Inside the product</p>
            <h2 className={h2}>The screens behind the business</h2>
            <ScreenGallery shots={project.gallery} />
          </Container>
        </section>
      )}

      {project.tech.length > 0 && (
        <section className="pb-16">
          <Container>
            <p className={eyebrow}>Built with</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Testimonials projectSlug={project.slug} />

      {/* Next project + CTA */}
      <section className="pb-20 pt-4 sm:pb-28">
        <Container>
          {next.slug !== project.slug && (
            <Link
              href={`/work/${next.slug}`}
              className="card-outline group flex flex-col gap-2 rounded-3xl bg-paper p-6 transition-colors duration-200 hover:bg-sand sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  Next case study
                </span>
                <span className="mt-1 block font-display text-3xl font-extrabold uppercase tracking-tight">
                  {next.title}
                </span>
              </span>
              <ArrowRightIcon className="text-[1.75rem] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          )}
          <CtaBanner
            className="mt-12"
            title="Want results like this?"
            text="Seven quick questions and we take it from there."
            secondary={{ href: "/work", label: "See all work" }}
          />
        </Container>
      </section>
    </>
  );
}
