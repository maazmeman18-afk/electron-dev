import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { ArrowRightIcon } from "@/components/ui/icons";
import { serviceCategories } from "@/lib/services";
import { SoftwareShowcase } from "@/components/home/SoftwareShowcase";
import { ProcessRow } from "@/components/home/ProcessRow";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, e-commerce development and custom software (CRM, ERP, inventory, billing) by Electron Developers, Ahmedabad.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        {/* Hero */}
        <div className="mb-16 sm:mb-20">
          <SectionHeading eyebrow="Services" size="md" as="h1">
            Built around how your business runs.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            We design and build digital experiences, e-commerce platforms and
            custom business systems that help companies operate and grow.
          </p>
        </div>

        {/* Service cards */}
        <ul className="mt-16 mb-24 grid gap-8 lg:grid-cols-2">
          {serviceCategories.map((category, index) => (
            <li
              key={category.slug}
              className={`card-outline reveal group relative flex flex-col overflow-hidden rounded-3xl bg-paper transition-colors duration-300 hover:bg-sand ${
                index === 2 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-sand px-6 py-4 sm:px-8">
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  Service 0{index + 1}
                </span>
                <span className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {category.items.length} offerings
                </span>
              </div>

              <div className="flex flex-1 flex-col px-6 py-7 sm:px-8 sm:py-8">
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                  {category.description}
                </p>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  What we build
                </p>
                <ul
                  className={`mt-4 grid gap-3 sm:grid-cols-2 ${index === 2 ? "lg:grid-cols-4" : ""}`}
                >
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-medium">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-paper"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The link stretches over the whole card, so the card is one click target. */}
              <Link
                href={`/services/${category.slug}`}
                className="flex items-center justify-between gap-4 border-t-2 border-ink bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-6px] focus-visible:outline-paper sm:px-8"
              >
                <span>
                  Explore service
                  <span className="sr-only">: {category.title}</span>
                </span>
                <ArrowRightIcon className="text-[1.125rem] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Software showcase */}
        <SoftwareShowcase />

        {/* Process */}
        <ProcessRow />

        {/* Closing CTA */}
        <CtaBanner
          className="mt-20"
          eyebrow="Have an idea?"
          title="Let’s build something that matters."
          secondary={{ href: "/work", label: "See our work" }}
        />
      </Container>
    </section>
  );
}
