import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
              key={service.title}
              className={`reveal group flex flex-col bg-sand hover:bg-lime ${service.span}`}
            >
              <Card hover padding="md">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl">
                    {service.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="font-display text-xl font-bold text-muted group-hover:text-ink"
                  >
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 max-w-md text-lg text-muted group-hover:text-ink">
                  {service.description}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2 pt-2 lg:mt-auto">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-ink/25 bg-paper px-4 py-1.5 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
