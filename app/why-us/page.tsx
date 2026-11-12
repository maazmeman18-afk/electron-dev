import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { ProjectSimulator } from "@/components/why/ProjectSimulator";
import { homePrinciples } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "See how a project with Electron Developers runs, from brief to launch and support, and why businesses build their websites, stores and software with us.",
  alternates: { canonical: "/why-us" },
};

// One plain-language takeaway per principle in lib/content/home.ts (same order).
const takeaways = [
  "You get a product that fits how your team already works.",
  "No forcing your process into a template that almost fits.",
  "Your product stays fast, secure and easy to update.",
  "Adding features later does not mean rebuilding from scratch.",
  "You always know what is being built, and when.",
  "Launch day is not the last time you hear from us.",
];

const pills = [
  { label: "Websites", tone: "bg-accent" },
  { label: "E-commerce", tone: "bg-paper" },
  { label: "Software development", tone: "bg-ink text-paper" },
];

export default function WhyUsPage() {
  return (
    <>
      <section className="pb-12 pt-12 sm:pb-16 sm:pt-20">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Why Electron Developers
          </p>
          <h1 className="mt-4 max-w-5xl text-display-lg uppercase">
            Creative thinking.{" "}
            <span className="text-primary">Serious engineering.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            We design and build websites, online stores and custom business
            software. Walk through a project below to see how working with us
            feels, step by step.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <li
                key={pill.label}
                className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold uppercase tracking-wide ${pill.tone}`}
              >
                {pill.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Interactive walkthrough */}
      <section
        aria-labelledby="sim-heading"
        className="border-y-2 border-ink bg-sand py-14 sm:py-20"
      >
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Walk through a project
          </p>
          <h2
            id="sim-heading"
            className="mt-3 mb-10 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl"
          >
            From first call to <span className="text-primary">live product</span>
          </h2>
          <ProjectSimulator />
        </Container>
      </section>

      {/* Reasons */}
      <section className="py-16 sm:py-24">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            What you can count on
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
            {homePrinciples.length} reasons to{" "}
            <span className="text-primary">build with us</span>
          </h2>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homePrinciples.map((principle, index) => (
              <li
                key={principle.title}
                className="card-outline reveal flex flex-col rounded-3xl bg-paper p-6 transition-colors duration-300 hover:bg-sand sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-ink)]"
                >
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold uppercase leading-tight tracking-tight sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
                <p className="mt-auto pt-5">
                  <span className="block rounded-2xl border-l-4 border-accent bg-sand px-4 py-3 text-sm font-semibold">
                    {takeaways[index]}
                  </span>
                </p>
              </li>
            ))}
          </ol>

          <CtaBanner
            className="mt-16 sm:mt-20"
            eyebrow="Have an idea?"
            title="Got an idea? Let’s build it."
            text="Seven quick questions and we take it from there."
            secondary={{ href: "/work", label: "See our work" }}
          />
        </Container>
      </section>
    </>
  );
}
