import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Tag } from "@/components/ui/Tag";
import { ArrowRightIcon } from "@/components/ui/icons";

type SoftwareCategory = {
  id: string;
  label: string;
  description: string;
  projectSlugs: string[];
};

// Software categories mapped to real projects from lib/projects.ts.
// NOTE: "Gujju CRM" and "GUJJUBAZAR CRM" are mentioned in the brief but do
// not exist in lib/projects.ts or public/work/. Flagged for the owner.
export const softwareCategories: SoftwareCategory[] = [
  {
    id: "crm-customer-management",
    label: "CRM and customer management",
    description:
      "Systems that streamline customer management, sales tracking and inventory for CRM-based businesses.",
    projectSlugs: ["crm-manager"],
  },
  {
    id: "inventory-operations",
    label: "Inventory and operations",
    description:
      "Tools built around your process so your team stops fighting spreadsheets.",
    projectSlugs: [],
  },
  {
    id: "e-commerce-stores",
    label: "E-commerce stores",
    description:
      "Online stores with cart, order management and checkout integrations.",
    projectSlugs: ["ecommerce-anon", "cake-bakery"],
  },
  {
    id: "booking-rental-systems",
    label: "Booking and rental systems",
    description:
      "Booking platforms with admin panels to manage listings, reservations and enquiries.",
    projectSlugs: ["car-rental"],
  },
  {
    id: "business-websites-portals",
    label: "Business websites and portals",
    description:
      "Professional websites that explain what you do and turn visitors into enquiries.",
    projectSlugs: ["lakshraj-enterprise", "earth-movers"],
  },
  {
    id: "real-estate-platforms",
    label: "Real estate platforms",
    description:
      "Property listing platforms with dynamic navigation and client enquiry management.",
    projectSlugs: ["build-state", "electron-real-estate"],
  },
];

// Only categories with at least one real project become tabs, so an empty
// category never appears on the site.
type ShownCategory = SoftwareCategory & { projects: Project[] };

const shownCategories: ShownCategory[] = softwareCategories
  .map((category) => ({
    ...category,
    projects: projects.filter((project) =>
      category.projectSlugs.includes(project.slug)
    ),
  }))
  .filter((category) => category.projects.length > 0);

const tabInputId = (id: string) => `software-tab-${id}`;

// Tabs are radio inputs, so the switcher works without JavaScript. These rules
// link each radio to its label and panel. They are built only from the static
// category data above, never from user input.
const tabRules = shownCategories
  .map((category) => {
    const input = `#${tabInputId(category.id)}`;
    const label = `label[for="${tabInputId(category.id)}"]`;
    return `
${input}:checked ~ .software-tablist ${label} { background-color: var(--color-ink); border-color: var(--color-ink); color: var(--color-paper); }
${input}:focus-visible ~ .software-tablist ${label} { outline: 3px solid var(--color-ink); outline-offset: 3px; }
${input}:checked ~ .software-panels > [data-tab="${category.id}"] { display: block; }`;
  })
  .join("\n");

// Kept with the component (not only in globals.css) so the switcher never
// depends on a stale stylesheet. If the browser restores a state with no tab
// checked, the first category shows.
const baseRules = `
.software-showcase .software-panel { display: none; }
.software-showcase:not(:has(input[name="software-category"]:checked)) .software-panel:first-child { display: block; }`;

export function SoftwareShowcase({ className = "" }: { className?: string }) {
  return (
    <section className={`software-showcase py-20 sm:py-28 border-t border-line ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {shownCategories.map((category, index) => (
          <input
            key={category.id}
            type="radio"
            name="software-category"
            autoComplete="off"
            id={tabInputId(category.id)}
            defaultChecked={index === 0}
            className="sr-only"
          />
        ))}
        <style dangerouslySetInnerHTML={{ __html: baseRules + tabRules }} />

        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Software we build
            </p>
            <h2 className="mt-2 text-display-lg uppercase font-extrabold leading-none tracking-tight">
              Built for how your business runs
            </h2>
          </div>
          <div className="software-tablist -mx-5 flex w-full gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {shownCategories.map((category) => (
              <label
                key={category.id}
                htmlFor={tabInputId(category.id)}
                className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-line bg-sand px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:bg-lime"
              >
                {category.label}
              </label>
            ))}
          </div>
        </div>

        <div className="software-panels">
          {shownCategories.map((category) => (
            <div
              key={category.id}
              data-tab={category.id}
              className="software-panel"
            >
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-lg text-muted leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.projects.map((project) => (
                      <li key={project.slug} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-lime"
                        />
                        <span className="text-muted">{project.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`grid gap-6 ${category.projects.length > 1 ? "sm:grid-cols-2" : "max-w-xl"}`}
                >
                  {category.projects.map((project) => (
                    <article
                      key={project.slug}
                      className="group relative grid gap-4"
                    >
                      <BrowserFrame
                        src={project.image.src}
                        alt={`Screenshot of ${project.title}`}
                        width={project.image.width}
                        height={project.image.height}
                        domain={project.url
                          .replace("https://", "")
                          .replace("http://", "")}
                      />
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-extrabold uppercase leading-none tracking-tight">
                          {project.title}
                        </h3>
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-ink underline-offset-4 hover:underline"
                        >
                          Case study{" "}
                          <ArrowRightIcon className="text-[0.875rem]" />
                        </Link>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Tag key={tech} label={tech} />
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
