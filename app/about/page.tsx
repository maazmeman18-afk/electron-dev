import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { homePrinciples } from "@/lib/content/home";

const teamMembers = [
  {
    name: "Akshat Jain",
    role: "Graphics Designer & Backend Developer",
    bio: "Akshat combines creativity with technical expertise, designing stunning visuals and building robust backend systems.",
    initials: "AJ",
  },
  {
    name: "Maaz Meman",
    role: "Full Stack Developer & Project Manager",
    bio: "Maaz oversees project execution while developing both frontend and backend solutions.",
    initials: "MM",
  },
  {
    name: "Roshan Bagale",
    role: "Backend Developer & Project Manager",
    bio: "Roshan specializes in backend development and project coordination, ensuring seamless delivery.",
    initials: "RB",
  },
];

export const metadata: Metadata = {
  title: "About Our Web Team in Ahmedabad & Pune",
  description:
    "Meet Electron Developers, a design and development team in Ahmedabad and Pune building websites, e-commerce stores and custom business software.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        {/* Editorial hero */}
        <div className="mb-16 sm:mb-20">
          <SectionHeading eyebrow="About Electron Developers" size="md" as="h1">
            We&rsquo;re a partner in digital innovation.
          </SectionHeading>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            At Electron Developers, we don&rsquo;t just build websites; we build
            relationships. Our philosophy is rooted in collaboration,
            transparency, and a relentless pursuit of excellence to deliver
            solutions that drive real business growth.
          </p>
        </div>

        {/* What we work on - FeatureGrid of software areas */}
        <div className="mt-16 mb-20">
          <SectionHeading eyebrow="Our work" size="md">
            What we work on
          </SectionHeading>
          <FeatureGrid
            items={[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.5 3.75-5.5 3.75-9S14.5 5.5 12 3m0 18c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3M3.5 9h17M3.5 15h17"
                    />
                  </svg>
                ),
                title: "Business websites",
                text: "Fast, clear websites that explain what you do and turn visitors into enquiries.",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "E-commerce stores",
                text: "Online stores with cart, order management and checkout integrations.",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Software development",
                text: "CRM, ERP, inventory and billing software shaped around how your team works.",
              },
            ]}
            className="mt-10"
          />
        </div>

        {/* Team */}
        <div className="mt-20 mb-20 sm:mt-28 sm:mb-28">
          <SectionHeading eyebrow="Team" size="md">
            Meet the experts
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            The people who design, build and look after your product.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="card-outline reveal flex flex-col overflow-hidden rounded-3xl bg-paper transition-colors duration-300 hover:bg-sand"
              >
                <div className="border-b-2 border-ink bg-sand px-6 pb-5 pt-7">
                  <span
                    aria-hidden="true"
                    className="grid h-20 w-20 place-items-center rounded-full border-2 border-ink bg-primary font-display text-2xl font-extrabold text-paper shadow-[3px_3px_0_var(--color-ink)]"
                  >
                    {member.initials}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
                    {member.name}
                  </h3>
                  <p className="mt-3 self-start rounded-xl border-2 border-ink bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Why us teaser: the full story lives on /why-us */}
        <div className="card-outline grid gap-10 rounded-3xl bg-ink p-7 text-paper sm:p-12 lg:grid-cols-12 lg:items-center [&_*:focus-visible]:outline-accent">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              How we work
            </p>
            <h2 className="mt-3 text-display-md uppercase">
              Creative thinking.{" "}
              <span className="text-accent">Serious engineering.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-paper/75">
              See what a project with us looks like, from the first call to
              launch and support.
            </p>
            <Button href="/why-us" size="lg" className="mt-8">
              See how a project runs
            </Button>
          </div>
          <ol className="lg:col-span-6">
            {homePrinciples.slice(0, 3).map((principle, index) => (
              <li
                key={principle.title}
                className="flex gap-4 border-t border-paper/15 py-5 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="w-8 shrink-0 pt-1 font-display text-lg font-bold text-accent"
                >
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-paper/70">{principle.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing CTA */}
        <CtaBanner
          className="mt-20"
          title="Ready to build something great?"
          text="Tell us about your project in seven quick questions."
          secondary={{ href: "/work", label: "See our work" }}
        />
      </Container>
    </section>
  );
}
