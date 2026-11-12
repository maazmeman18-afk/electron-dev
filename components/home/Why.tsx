import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homePrinciples } from "@/lib/content/home";

export function Why() {
  return (
    <section className="bg-night py-20 text-paper sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="Why Electron Developers" size="md" tone="dark">
              Creative thinking. <span className="text-lime">Serious engineering.</span>
            </SectionHeading>
            <p className="mt-6 max-w-md text-lg text-paper/70">
              A studio that cares how the product looks and how the business
              behind it runs.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {homePrinciples.map((principle, index) => (
            <li
              key={principle.title}
              className="reveal grid grid-cols-[3rem_1fr] gap-x-4 border-t border-paper/15 py-7 last:border-b sm:grid-cols-[4.5rem_1fr]"
            >
              <span
                aria-hidden="true"
                className="font-display text-xl font-bold text-lime"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-lg text-paper/70">{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
