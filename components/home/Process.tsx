import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeProcessSteps } from "@/lib/content/home";

/**
 * Four steps. On desktop a line draws across the top as the section scrolls
 * into view, and each step's outlined number fills in as the line reaches it.
 * On phones each number fills as its card scrolls in. Pure CSS
 * (scroll-driven animations, see globals.css); browsers without support, and
 * reduced motion, simply show the finished state.
 */
export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How we work">
          Four steps. No mystery.
        </SectionHeading>

        <div className="process-timeline mt-14">
          {/* Desktop progress track */}
          <div aria-hidden="true" className="process-track relative mb-6 hidden h-4 lg:block">
            <span className="absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-line" />
            <span className="process-line absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2 origin-left rounded-full bg-accent" />
            <span className="absolute inset-0 grid grid-cols-4 gap-5">
              {homeProcessSteps.map((step, index) => (
                <span
                  key={step.title}
                  className="relative h-4 w-4 rounded-full border-2 border-ink bg-paper"
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="process-fill absolute inset-[2px] rounded-full bg-accent" />
                </span>
              ))}
            </span>
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeProcessSteps.map((step, index) => (
              <li
                key={step.title}
                className="reveal group"
                style={{ "--i": index } as CSSProperties}
              >
                <Card hover padding="md" className="hover:bg-sand">
                  <span
                    aria-hidden="true"
                    className="relative block font-display text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-ink)] transition-colors duration-300 group-hover:text-primary"
                  >
                    0{index + 1}
                    {/* Solid copy that fades in over the outline. */}
                    <span className="process-num process-fill absolute inset-0 text-primary [-webkit-text-stroke:0]">
                      0{index + 1}
                    </span>
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-extrabold uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted">{step.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
