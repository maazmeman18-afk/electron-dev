import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { RelatedProjects } from "@/components/home/RelatedProjects";
import { Tag } from "@/components/ui/Tag";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProcessRow } from "@/components/home/ProcessRow";
import { FlowDiagram } from "@/components/services/FlowDiagram";
import { BeforeAfter } from "@/components/services/BeforeAfter";
import { serviceFlows } from "@/lib/content/service-flows";
import { serviceCategories, serviceItemText, serviceSlugs } from "@/lib/services";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

// Inline SVG icons for feature grid items
function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  );
}

function ShoppingCartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({
    slug,
  }));
}

// Every real service page is prerendered above, so navigating to one is
// already instant. Reading `params` only "blocks" for unknown slugs, where the
// page must answer with a real redirect (308) or 404 before streaming, so a
// <Suspense> fallback would be wrong here. No data is fetched.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = serviceCategories.find((c) => c.slug === slug);
  if (!category) {
    return { title: "Service not found" };
  }
  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: `${category.seoTitle} | ${site.name}`,
      description: category.seoDescription,
      url: `/services/${category.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // The AI & Automation service was folded into Software Development.
  if (slug === "ai-and-automation") {
    permanentRedirect("/services/custom-business-software");
  }

  const category = serviceCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Short sticker on the hero mock-up for each service. Labels, not claims.
  const heroSticker: Record<string, string> = {
    "website-development": "Website!",
    "e-commerce-development": "Shop online!",
    "custom-business-software": "CRM + billing",
    "seo-and-analytics": "SEO ready",
  };

  // Case studies that show each service.
  const projectsByService: Record<string, string[]> = {
    "website-development": ["lakshraj-enterprise", "gujjubazar"],
    "e-commerce-development": ["gujjubazar"],
    "custom-business-software": ["gujjubazar"],
    "seo-and-analytics": ["gujjubazar", "lakshraj-enterprise"],
  };
  const relatedProjects = (projectsByService[slug] ?? [])
    .map((projectSlug) => projects.find((p) => p.slug === projectSlug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  // Tech tags from related projects
  const allTech = new Set<string>();
  relatedProjects.forEach((p) => p.tech.forEach((t) => allTech.add(t)));
  const techTags = Array.from(allTech);

  // Feature grid items built from category items + related service descriptions
  const featureItems = category.items.map((item) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Business websites": <LayersIcon className="w-5 h-5" />,
      "Corporate websites": <LayersIcon className="w-5 h-5" />,
      "Landing pages": <LayersIcon className="w-5 h-5" />,
      "Custom web applications": <CodeIcon className="w-5 h-5" />,
      "Online stores": <ShoppingCartIcon className="w-5 h-5" />,
      "Product catalogues": <ShoppingCartIcon className="w-5 h-5" />,
      "Checkout and payment integrations": <ShoppingCartIcon className="w-5 h-5" />,
      "E-commerce management systems": <ShoppingCartIcon className="w-5 h-5" />,
      "CRM systems": <CodeIcon className="w-5 h-5" />,
      "ERP systems": <CodeIcon className="w-5 h-5" />,
      "Inventory management": <LayersIcon className="w-5 h-5" />,
      "Billing and invoicing": <LayersIcon className="w-5 h-5" />,
      "Booking and rental systems": <LayersIcon className="w-5 h-5" />,
      "Admin panels and dashboards": <CodeIcon className="w-5 h-5" />,
      "Reports and analytics": <LayersIcon className="w-5 h-5" />,
      "Business workflow automation": <ZapIcon className="w-5 h-5" />,
      "Keyword and competitor research": <ZapIcon className="w-5 h-5" />,
      "Technical SEO": <CodeIcon className="w-5 h-5" />,
      "On-page SEO": <LayersIcon className="w-5 h-5" />,
      "Local SEO and Google Business Profile": <ZapIcon className="w-5 h-5" />,
      "Google Analytics 4 and Search Console": <LayersIcon className="w-5 h-5" />,
      "Monthly SEO reports": <LayersIcon className="w-5 h-5" />,
    };
    return {
      icon: iconMap[item] || <LayersIcon className="w-5 h-5" />,
      title: item,
      text: serviceItemText[item] ?? category.description,
    };
  });

  const flow = serviceFlows[category.slug];

  // Structured data: the service itself and the breadcrumb trail.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: category.title,
        serviceType: category.title,
        description: category.seoDescription,
        url: `${site.url}/services/${category.slug}`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: site.areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: category.title,
          itemListElement: category.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item, description: serviceItemText[item] },
          })),
        },
      },
      ...(flow
        ? [
            {
              "@type": "ItemList",
              name: flow.heading,
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              itemListElement: flow.steps.map((step, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: step.title,
                description: step.system,
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          { "@type": "ListItem", position: 3, name: category.title, item: `${site.url}/services/${category.slug}` },
        ],
      },
    ],
  };

  return (
    <section className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Container>
        {/* Hero */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:col-span-1">
            <SectionHeading
              eyebrow="Services"
              size="md"
              tone="light"
              as="h1"
            >
              {category.title}
            </SectionHeading>
            <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
              {category.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" enquiry size="lg" variant="primary">
                Start a project
              </Button>
            </div>
          </div>
          <div className="lg:col-span-1">
            {relatedProjects.length > 0 && (
              // Assembles once on load (see .assemble in globals.css).
              <div className="assemble relative">
                {heroSticker[slug] && (
                  <span
                    aria-hidden="true"
                    className="assemble-sticker absolute -right-2 -top-4 z-10 rounded-full border-2 border-ink bg-accent px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-tight shadow-[3px_3px_0_var(--color-ink)] sm:-right-4"
                  >
                    {heroSticker[slug]}
                  </span>
                )}
                <BrowserFrame
                  src={relatedProjects[0].image.src}
                  alt={`Screenshot of ${relatedProjects[0].title}`}
                  width={relatedProjects[0].image.width}
                  height={relatedProjects[0].image.height}
                  domain={relatedProjects[0].url.replace("https://", "").replace("http://", "")}
                />
              </div>
            )}
          </div>
        </div>

        {/* How it works + Before / After (content in lib/content/service-flows.ts) */}
        {flow && (
          <>
            <FlowDiagram flow={flow} id={`${category.slug}-flow`} />
            <BeforeAfter data={flow.beforeAfter} id={`${category.slug}-ba`} />
          </>
        )}

        {/* What we build - FeatureGrid */}
        <div className="mt-20">
          <SectionHeading eyebrow="What we build" size="md">
            {category.title} capabilities
          </SectionHeading>
          <FeatureGrid items={featureItems} className="mt-10" />
        </div>

        {/* Software we have built - RelatedProjects */}
        {relatedProjects.length > 0 && (
          <RelatedProjects
            projects={relatedProjects}
            heading="Work that shows it"
          />
        )}

        {/* Tools we use */}
        {techTags.length > 0 && (
          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted mb-6">
              Tools we use
            </p>
            <div className="flex flex-wrap gap-3">
              {techTags.map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
            </div>
          </div>
        )}

        {/* Process */}
        <ProcessRow className="mt-20 border-t border-line pt-12" />

        {/* Closing CTA */}
        <CtaBanner
          className="mt-20"
          title={<>Let&rsquo;s build your {category.title.toLowerCase()} project.</>}
          secondary={{ href: "/work", label: "See our work" }}
        />
      </Container>
    </section>
  );
}
