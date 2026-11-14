import Link from "next/link";
import { navItems, site } from "@/lib/site";
import { homeServices } from "@/lib/content/home";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { DotField } from "@/components/ui/DotField";
import { getYear } from "@/lib/year";

const headingClass = "text-xs font-bold uppercase tracking-[0.2em] text-accent";
const labelClass = "text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper/45";
// Underline on hover reads clearly on navy without turning the text cyan.
const linkClass =
  "text-paper/85 underline decoration-transparent decoration-2 underline-offset-[6px] transition-[color,text-decoration-color] duration-150 hover:text-paper hover:decoration-accent";

const [emailUser, emailDomain] = site.email.split("@");

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-paper [&_*:focus-visible]:outline-accent">
      {/* Static dots only here: a moving highlight behind text is too busy. */}
      <DotField tone="dark" interactive={false} />

      <Container className="grid gap-x-6 gap-y-10 pb-12 pt-14 sm:grid-cols-2 sm:pt-20 lg:grid-cols-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-7 max-w-sm font-display text-[1.75rem] font-extrabold leading-[1.02] tracking-tight [text-wrap:balance] sm:text-4xl">
            Websites that get found,{" "}
            <span className="text-accent">not just built.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Website, e-commerce and software development company in Ahmedabad
            and Pune, working with businesses across India and abroad.
          </p>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Say hi!"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full border-2 border-paper/40 px-6 font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Chat on WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className={headingClass}>Services</h2>
          <ul className="mt-4 space-y-2.5">
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
          {/* A wrapping row on phones, a list on larger screens. */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 sm:block sm:space-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-3">
          <h2 className={headingClass}>Say hello</h2>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-1">
            <div className="col-span-2 lg:col-span-1">
              <dt className={labelClass}>Email</dt>
              <dd className="mt-1">
                {/* If it has to wrap, wrap at the @ rather than mid-word. */}
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {emailUser}
                  <wbr />@{emailDomain}
                </a>
              </dd>
            </div>
            <div>
              <dt className={labelClass}>Call</dt>
              {site.phones.map((phone) => (
                <dd key={phone.href} className="mt-1">
                  <a href={phone.href} className={`${linkClass} whitespace-nowrap`}>
                    {phone.label}
                  </a>
                </dd>
              ))}
            </div>
            <div>
              <dt className={labelClass}>Based in</dt>
              <dd className="mt-1 text-paper/85">{site.location}</dd>
            </div>
          </dl>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-paper/15">
        <Container className="flex flex-col gap-5 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2">
            {site.social.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center rounded-full border border-paper/30 px-3.5 font-semibold text-paper/85 transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-6 sm:order-first">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                © {year} {site.name}
              </span>
              <Link href="/privacy" className="transition-colors duration-150 hover:text-paper">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors duration-150 hover:text-paper">
                Terms
              </Link>
            </p>
            <a
              href="#main"
              aria-label="Back to top"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/30 text-paper/85 transition-colors duration-150 hover:border-accent hover:text-accent sm:hidden"
            >
              <span aria-hidden="true">↑</span>
            </a>
          </div>
          <a
            href="#main"
            className="hidden items-center gap-1.5 font-semibold text-paper/80 transition-colors duration-150 hover:text-accent sm:inline-flex"
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </Container>
      </div>

      {/* Oversized wordmark in halftone dots, cropped by the bottom edge. */}
      <p
        aria-hidden="true"
        className="wordmark-dots pointer-events-none mt-4 -mb-[0.04em] select-none whitespace-nowrap text-center font-display text-[clamp(4rem,18vw,17rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em]"
      >
        Electron
      </p>
    </footer>
  );
}
