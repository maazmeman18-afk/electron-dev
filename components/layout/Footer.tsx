import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { homeServices } from "@/lib/content/home";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getYear } from "@/lib/year";

const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-accent";
const linkClass =
  "text-paper/75 transition-colors duration-150 hover:text-accent";

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="bg-ink text-paper [&_*:focus-visible]:outline-accent">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-20 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-4">
          {/* The logo is navy, so it sits on a light tile here. */}
          <div className="inline-flex rounded-2xl bg-paper px-3 py-2">
            <Logo />
          </div>
          <p className="mt-8 max-w-md font-display text-3xl font-extrabold sm:text-4xl uppercase leading-[0.95] tracking-tight">
            We turn ideas into{" "}
            <span className="text-accent">digital products.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" enquiry>
              Start a Project
            </Button>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border-2 border-paper/40 px-6 font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className={headingClass}>Services</h2>
          <ul className="mt-5 space-y-3">
            {homeServices.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3">
          <h2 className={headingClass}>Say hello</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className={linkClass}>
                  {phone.label}
                </a>
              </li>
            ))}
            <li className="text-paper/55">{site.location}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/15">
        <Container className="flex flex-col gap-4 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-2">
            {site.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-paper/30 px-3 py-1 font-semibold text-paper/80 transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
