import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const tocItems = [
  { label: "Information we collect", href: "#collect" },
  { label: "How we use your information", href: "#use" },
  { label: "Sharing and disclosure", href: "#sharing" },
  { label: "Your rights", href: "#rights" },
  { label: "Contact us", href: "#contact" },
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Electron Developers collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
          <SectionHeading eyebrow="Privacy" size="md" as="h1">
            Privacy policy
          </SectionHeading>
          <p className="mt-6 max-w-xl text-lg text-muted">
            This is a draft placeholder. Electron Developers does not yet have
            a finalised privacy policy. This page will be replaced with the
            approved legal text once reviewed.
          </p>

          <section id="collect" className="mt-12 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Information we collect
            </h3>
            <p className="text-muted leading-relaxed">
              We collect only the information you voluntarily provide through
              our contact form (name, email, company, service interest,
              project description and budget range). This information is used
              solely to respond to your enquiry.
            </p>
          </section>

          <section id="use" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              How we use your information
            </h3>
            <p className="text-muted leading-relaxed">
              Your details are used to reply to your enquiry and discuss
              potential projects. We do not use your information for marketing
              unless you ask us to.
            </p>
          </section>

          <section id="sharing" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Sharing and disclosure
            </h3>
            <p className="text-muted leading-relaxed">
              We do not sell or share your personal data with third parties.
            </p>
          </section>

          <section id="rights" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Your rights
            </h3>
            <p className="text-muted leading-relaxed">
              You may request access to, correction of, or deletion of your
              personal data by contacting us at the email address below.
            </p>
          </section>

          <section id="contact" className="mt-10 border-t border-line pt-8">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight mb-4">
              Contact us
            </h3>
            <p className="text-muted leading-relaxed">
              For questions about this privacy policy, email
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4 hover:text-ink">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
