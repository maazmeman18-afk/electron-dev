import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { homeServices } from "@/lib/content/home";

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Services" className="max-w-4xl">
          Built around how your business runs.
        </SectionHeading>

        <ul className="mt-14 grid gap-5 lg:grid-cols-12">
          {homeServices.map((service, index) => (
            <li
              key={service.slug}
              className={`reveal group flex flex-col ${service.span}`}
            >
              <Link
                href={`/services/${service.slug}`}
                data-cursor="Explore"
                className="flex h-full flex-col"
              >
                <Card
                  padding="md"
                  className="flex h-full flex-col bg-sand group-hover:bg-lime"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="font-display text-xl font-bold text-muted transition-colors duration-300 group-hover:text-ink"
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-5 max-w-md text-lg text-muted transition-colors duration-300 group-hover:text-ink">
                    {service.description}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2 pt-2 lg:mt-auto list-none">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/25 bg-paper px-4 py-1.5 text-sm font-medium"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 whitespace-nowrap font-semibold text-ink underline underline-offset-4">
                    View details <ArrowRightIcon className="text-[1rem]" />
                  </span>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
