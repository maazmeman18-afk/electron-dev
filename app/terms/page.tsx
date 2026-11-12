import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tocItems = [
  { label: "Acceptance of terms", href: "#acceptance" },
  { label: "Services and engagement", href: "#services" },
  { label: "Payment", href: "#payment" },
  { label: "Intellectual property", href: "#ip" },
  { label: "Liability", href: "#liability" },
  { label: "Termination", href: "#termination" },
  { label: "Contact us", href: "#contact" },
];

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the Electron Developers website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        {/* Sticky table of contents on desktop */}
        <aside
          className="lg:col-span-2 lg:sticky lg:top-24 hidden lg:block"
          aria-label="Table of contents"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">
            On this page
          </p>
          <ul className="space-y-2 list-none">
            {tocItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-muted hover:text-ink hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-span-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
            Draft: pending legal review
          </p>
          <SectionHeading eyebrow="Terms" size="md" as="h1">
            Terms of service
          </SectionHeading>
          <p className="mt-6 max-w-xl text-lg text-muted">
            This is a draft placeholder. Electron Developers does not yet have
            finalised terms of service. This page will be replaced with the
            approved legal text once reviewed.
          </p>

          <section id="acceptance" className="mt-12 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Acceptance of terms
            </h3>
            <p className="text-muted leading-relaxed">
              By contacting Electron Developers or commissioning work, you
              agree to these terms once finalised.
            </p>
          </section>

          <section id="services" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Services and engagement
            </h3>
            <p className="text-muted leading-relaxed">
              We design and build digital experiences, e-commerce platforms and
              custom business systems. The scope of each engagement will be
              agreed in writing before work begins.
            </p>
          </section>

          <section id="payment" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Payment
            </h3>
            <p className="text-muted leading-relaxed">
              Payment terms, including any deposit and schedule, will be set
              out in the project agreement.
            </p>
          </section>

          <section id="ip" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Intellectual property
            </h3>
            <p className="text-muted leading-relaxed">
              Ownership of deliverables will be agreed in the project
              agreement. We do not claim ownership of your pre-existing
              materials.
            </p>
          </section>

          <section id="liability" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Liability
            </h3>
            <p className="text-muted leading-relaxed">
              Our liability is limited to the fees paid for the relevant
              engagement, to the fullest extent permitted by law.
            </p>
          </section>

          <section id="termination" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Termination
            </h3>
            <p className="text-muted leading-relaxed">
              Either party may terminate the engagement with written notice.
              Terms for termination will be set out in the project agreement.
            </p>
          </section>

          <section id="contact" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Contact us
            </h3>
            <p className="text-muted leading-relaxed">
              For questions about these terms, email
              <a href={`mailto:${"electondevelopers6@gmail.com"}`} className="text-ink underline underline-offset-4 hover:text-ink">
                electondevelopers6@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
