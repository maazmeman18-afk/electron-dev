import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnquiryModal } from "@/components/enquiry/EnquiryModal";
import { CursorLabel } from "@/components/ui/CursorLabel";
import { ClickBurst } from "@/components/ui/ClickBurst";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Web, E-commerce & Software Development`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console "HTML tag" verification. Set GOOGLE_SITE_VERIFICATION
  // in Vercel (just the content="..." value). Not needed if you verify by DNS.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Structured data for the business, referenced by @id from the service pages.
// Organization for now: there is no street address yet. When the Google
// Business Profile is set up, switch @type to "ProfessionalService" (a
// LocalBusiness type) and add the same address the profile uses.
// Only facts that are on the site are included.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      image: `${site.url}/opengraph-image`,
      description: site.description,
      email: site.email,
      telephone: site.phones.map((phone) => phone.href.replace("tel:", "")),
      areaServed: site.areaServed,
      knowsAbout: [
        "Website development",
        "E-commerce development",
        "Shopify development",
        "WordPress development",
        "CRM development",
        "ERP development",
        "Billing software",
        "Search engine optimisation",
        "Google Analytics 4",
      ],
      sameAs: site.social.map((item) => item.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <EnquiryModal />
        <CursorLabel />
        <ClickBurst />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
