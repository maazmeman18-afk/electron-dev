import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us: Start Your Project",
  description:
    "Start your website, e-commerce or software project with Electron Developers in Ahmedabad and Pune. Answer seven quick questions, or call, email or WhatsApp us.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  "We review your enquiry and match it to the right service.",
  "We follow up to discuss your project in more detail.",
  "We share a proposal and next steps for getting started.",
];

const labelClass = "text-xs font-bold uppercase tracking-[0.2em] text-muted";
const linkClass =
  "text-lg font-semibold text-ink underline-offset-4 hover:underline";

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Form: first on mobile, right column on desktop */}
        <div className="order-first lg:order-last lg:col-span-7">
          <div className="card-outline rounded-3xl bg-paper p-6 sm:p-10 lg:sticky lg:top-28">
            <EnquiryForm variant="page" />
            <noscript>
              <p className="mt-6 rounded-2xl bg-sand p-4 text-sm">
                This form needs JavaScript. You can still reach us by email or
                phone using the details on this page.
              </p>
            </noscript>
          </div>
        </div>

        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Contact" size="md" as="h1">
            Let&rsquo;s build something that matters.
          </SectionHeading>
          <p className="mt-6 text-lg text-muted">
            Seven quick questions, and your answers open in WhatsApp ready to
            send. Prefer email or a call? Use the details below.
          </p>

          <div className="card-outline mt-10 rounded-3xl bg-sand p-6 sm:p-8">
            <ul className="space-y-5">
              <li>
                <p className={labelClass}>Email</p>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              <li>
                <p className={labelClass}>Phone</p>
                <ul className="space-y-1">
                  {site.phones.map((phone) => (
                    <li key={phone.href}>
                      <a href={phone.href} className={linkClass}>
                        {phone.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <p className={labelClass}>WhatsApp</p>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {site.phones[0].label}
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              </li>
              <li>
                <p className={labelClass}>Location</p>
                <p className="text-lg font-semibold">{site.location}</p>
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-2">
              {site.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-sm font-semibold transition-colors duration-150 hover:bg-lime"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <p className={labelClass}>What happens next</p>
            <ol className="mt-6 space-y-5">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-accent font-display text-sm font-bold"
                  >
                    0{index + 1}
                  </span>
                  <p className="pt-1.5 leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
