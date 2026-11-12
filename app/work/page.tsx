import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { projects } from "@/lib/projects";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SoftwareShowcase } from "@/components/home/SoftwareShowcase";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Websites, e-commerce stores, CRM systems and booking platforms designed and built by Electron Developers. See the live projects.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        {/* Hero */}
        <div className="mt-16 mb-20">
          <SectionHeading eyebrow="Selected work" size="md" as="h1">
            Things we have built.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            We design and build software that helps companies operate and grow
            — CRM and inventory systems, e-commerce stores, booking platforms
            and custom business applications.
          </p>
        </div>

        {/* Filter tabs */}
        <FilterTabs />

        {/* Featured projects - two per row, large BrowserFrame cards */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="reveal group relative grid gap-6">
              <Card
                hover
                className="bg-sand hover:bg-lime"
              >
                <BrowserFrame
                  src={project.image.src}
                  alt={`Screenshot of ${project.title}`}
                  width={project.image.width}
                  height={project.image.height}
                  domain={project.url.replace("https://", "").replace("http://", "")}
                />
              </Card>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {project.type}
                </p>
                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                  <Link
                    href={`/work/${project.slug}`}
                    className="after:absolute after:inset-0 text-ink hover:text-ink"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-4 max-w-xl text-muted">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2 list-none">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 hover:text-ink whitespace-nowrap"
                >
                  Visit live site
                  <span className="sr-only">(opens in a new tab)</span>
                  <svg
                    className="text-[1rem]"
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
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Remaining projects - smaller grid */}
        {otherProjects.length > 0 && (
          <div className="mt-24 border-t border-line pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-md uppercase font-extrabold tracking-tight">
                More projects
              </h2>
              <Link
                href="/work"
                className="text-sm font-semibold text-ink underline-offset-4 hover:text-ink hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <article key={project.slug} className="reveal group">
                  <Card
                    hover
                    padding="sm"
                    className="bg-sand hover:bg-lime"
                  >
                    <BrowserFrame
                      src={project.image.src}
                      alt={`Screenshot of ${project.title}`}
                      width={project.image.width}
                      height={project.image.height}
                      domain={project.url.replace("https://", "").replace("http://", "")}
                    />
                  </Card>
                  <div className="mt-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                      {project.type}
                    </p>
                    <h4 className="mt-2 font-display text-xl font-extrabold uppercase leading-none tracking-tight">
                      <Link
                        href={`/work/${project.slug}`}
                        className="text-ink hover:text-ink"
                      >
                        {project.title}
                      </Link>
                    </h4>
                    <p className="mt-3 text-sm text-muted line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 list-none">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line px-3 py-1 text-xs font-medium"
                        >
                          {tech}
                        </li>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Software showcase */}
        <SoftwareShowcase className="mt-24" />
      </Container>
    </section>
  );
}
