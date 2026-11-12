import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeProcessSteps } from "@/lib/content/home";

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How we work">
          Four steps. No mystery.
        </SectionHeading>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeProcessSteps.map((step, index) => (
            <li
              key={step.title}
              className="reveal group"
            >
              <Card hover padding="md" className="hover:bg-sand">
                <span
                  aria-hidden="true"
                  className="block font-display text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-ink)] transition-colors duration-300 group-hover:text-lime"
                >
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-display text-2xl font-extrabold uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
