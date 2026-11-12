import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { homeServices } from "@/lib/content/home";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { getYear } from "@/lib/year";

const headingClass =
  "text-sm font-semibold uppercase tracking-wider text-muted";

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="border-t border-line bg-sand">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-2xl font-bold leading-tight tracking-tight">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <h2 className={headingClass}>Services</h2>
          <ul className="mt-5 space-y-3">
            {homeServices.map((service) => (
              <li key={service.title}>
                <Link href="/services" className="hover:underline underline-offset-4">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className={headingClass}>Get in touch</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:underline underline-offset-4">
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="hover:underline underline-offset-4">
                  {phone.label}
                </a>
              </li>
            ))}
            <li className="text-muted">{site.location}</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {site.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built for ambitious businesses.</p>
        </Container>
      </div>
    </footer>
  );
}
