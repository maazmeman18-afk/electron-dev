import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects, otherProjects, type Project } from "@/lib/projects";

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <article
      className={`reveal group relative grid gap-6 ${
        wide ? "lg:col-span-2 lg:grid-cols-12 lg:items-center lg:gap-10" : ""
      }`}
    >
      <Card
        hover
        padding="sm"
        className={`bg-sand hover:bg-lime ${wide ? "lg:col-span-7" : ""}`}
      >
        <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-paper">
          <Image
            src={project.image.src}
            alt={`Screenshot of ${project.title}`}
            width={project.image.width}
            height={project.image.height}
            sizes={wide ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 46vw, 100vw"}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
      </Card>

      <div className={wide ? "lg:col-span-5" : ""}>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          {project.type}
        </p>
        <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0"
          >
            {project.title}
            <span className="sr-only"> (opens the live site in a new tab)</span>
          </a>
        </h3>
        <p className="mt-4 max-w-xl text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium"
            >
              {tech}
            </li>
          ))}
        </ul>
        <p
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-2 font-semibold underline-offset-4 group-hover:underline"
        >
          Visit live site <ArrowRightIcon className="text-[1rem]" />
        </p>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" size="md">
            Things we have built.
          </SectionHeading>
          <Button href="/work" variant="outline">
            See all work
          </Button>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-16 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} wide={index === 0} />
          ))}
        </div>

        <h3 className="mt-24 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          More projects
        </h3>
        <ul className="mt-5 border-t border-ink">
          {otherProjects.map((project) => (
            <li key={project.slug} className="border-b border-line">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-2 py-5 transition-colors duration-200 hover:bg-lime sm:px-4"
              >
                <span className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  {project.title}
                </span>
                <span className="flex items-center gap-4 text-sm font-medium text-muted group-hover:text-ink">
                  {project.type}
                  <span aria-hidden="true" className="text-lg">
                    <ArrowRightIcon className="text-[1rem]" />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
