import Link from "next/link";
import type { Project } from "@/lib/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Tag } from "@/components/ui/Tag";
import { ArrowRightIcon } from "@/components/ui/icons";

export function RelatedProjects({
  projects: relatedProjects,
  heading,
}: {
  projects: Project[];
  heading?: string;
}) {
  return (
    <div className="mt-16">
      {heading && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted mb-6">
          {heading}
        </p>
      )}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProjects.map((project) => (
          <li key={project.slug} className="reveal group">
            <BrowserFrame
              src={project.image.src}
              alt={`Screenshot of ${project.title}`}
              width={project.image.width}
              height={project.image.height}
              domain={project.url.replace("https://", "").replace("http://", "")}
            />
            <div className="mt-5">
              <h3 className="font-display text-xl font-extrabold uppercase leading-none tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{project.type}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </div>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4 hover:text-ink whitespace-nowrap"
              >
                Visit live site
                <span className="sr-only">(opens in a new tab)</span>
                <ArrowRightIcon className="text-[0.875rem]" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
