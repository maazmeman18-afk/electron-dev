import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CtaBanner } from "@/components/ui/CtaBanner";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ArrowRightIcon } from "@/components/ui/icons";
import { projects } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: `${project.title} (${project.type})`,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  // Build feature grid items from the project description (split into phrases)
  return (
    <section className="py-20 sm:py-28">
      <Container>
        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Selected work
            </p>
            <h1 className="mt-4 text-display-md uppercase font-extrabold leading-none tracking-tight sm:text-xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{project.type}</p>
            <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
              {project.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 hover:text-ink whitespace-nowrap"
              >
                Visit live site
                <span className="sr-only">(opens in a new tab)</span>
                <ArrowRightIcon className="text-[1rem]" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-1">
            <BrowserFrame
              src={project.image.src}
              alt={`Screenshot of ${project.title}`}
              width={project.image.width}
              height={project.image.height}
              domain={project.url.replace("https://", "").replace("http://", "")}
            />
          </div>
        </div>


        {/* Built with - Tags */}
        <div className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted mb-6">
            Built with
          </p>
          <div className="flex flex-wrap gap-3 list-none">
            {project.tech.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
        </div>

        {/* Previous / Next project links */}
        <nav aria-label="More projects" className="mt-20 grid gap-4 sm:grid-cols-2">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="card-outline group flex flex-col gap-2 rounded-3xl bg-paper p-6 transition-colors duration-200 hover:bg-sand"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                &larr; Previous project
              </span>
              <span className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight">
                {prevProject.title}
              </span>
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="card-outline group flex flex-col gap-2 rounded-3xl bg-paper p-6 transition-colors duration-200 hover:bg-sand sm:col-start-2 sm:items-end sm:text-right"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Next project &rarr;
              </span>
              <span className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight">
                {nextProject.title}
              </span>
            </Link>
          )}
        </nav>

        {/* CTA */}
        <CtaBanner
          className="mt-20"
          title="Let’s build your next project."
          secondary={{ href: "/work", label: "See all work" }}
        />
      </Container>
    </section>
  );
}
