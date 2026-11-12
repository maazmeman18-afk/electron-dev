"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { projects } from "@/lib/projects";

type FilterTab = {
  label: string;
  value: string;
};

const filterTabs: FilterTab[] = [
  { label: "All", value: "all" },
  { label: "Business websites", value: "business-website" },
  { label: "E-commerce", value: "e-commerce-website" },
  { label: "CRM and business software", value: "crm-system" },
  { label: "Booking and apps", value: "booking-system" },
  { label: "Real estate", value: "real-estate-platform" },
];

export function FilterTabs({ className = "" }: { className?: string }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = useCallback(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveFilter("all");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`work-filter-${tab.value}`}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-ink text-paper"
                  : "bg-sand border border-line text-ink hover:bg-lime hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id="work-filter-results"
        className="mt-12 grid gap-8 lg:grid-cols-2 transition-opacity duration-150 ease-out"
        aria-live="polite"
      >
        {filteredProjects().map((project) => (
          <article
            key={project.slug}
            id={`work-filter-${project.slug}`}
            className="reveal group relative grid gap-6"
          >
            <div
              className={`card-outline overflow-hidden rounded-3xl bg-sand transition-colors duration-300 group-hover:bg-lime sm:p-4`}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={project.image.src}
                  alt={`Screenshot of ${project.title}`}
                  width={project.image.width}
                  height={project.image.height}
                  className="h-full w-full object-cover object-top motion-reduce:transform-none"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
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
    </div>
  );
}
