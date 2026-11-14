// The four service categories: websites, e-commerce, software development
// and SEO & analytics. Titles and descriptions here feed the service pages,
// their search metadata and their structured data.
export type ServiceCategory = {
  slug: string;
  title: string;
  /** Search result title (the site name is added by the layout template). */
  seoTitle: string;
  /** Meta description, about 150 characters, written for search results. */
  seoDescription: string;
  description: string;
  items: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "website-development",
    seoTitle: "Website Development in Ahmedabad & Pune",
    seoDescription:
      "Website development in Ahmedabad and Pune: custom-coded and WordPress websites, fast, mobile-friendly and built for SEO to turn visitors into enquiries.",
    title: "Website Development",
    description:
      "Fast, clear websites that explain what you do and turn visitors into enquiries.",
    items: [
      "Business websites",
      "WordPress websites",
      "Corporate websites",
      "Landing pages",
      "Custom web applications",
    ],
  },
  {
    slug: "e-commerce-development",
    seoTitle: "E-commerce Development in Ahmedabad & Pune",
    seoDescription:
      "E-commerce development in Ahmedabad and Pune: Shopify and custom online stores with catalogues, secure checkout, payments and order management.",
    title: "E-commerce Development",
    description:
      "Stores that make it easy to browse, buy and come back, with the tools to manage orders behind the scenes.",
    items: [
      "Shopify stores",
      "Online stores",
      "Product catalogues",
      "Checkout and payment integrations",
      "E-commerce management systems",
    ],
  },
  {
    slug: "custom-business-software",
    seoTitle: "Custom CRM, ERP & Billing Software",
    seoDescription:
      "Custom software development in Ahmedabad and Pune: CRM, ERP, inventory and billing systems and dashboards shaped around how your business runs.",
    title: "Software Development",
    description:
      "Custom software shaped around how your business runs: CRM, ERP, inventory and billing, with the dashboards that tie them together.",
    items: [
      "CRM systems",
      "ERP systems",
      "Inventory management",
      "Billing and invoicing",
      "Booking and rental systems",
      "Admin panels and dashboards",
      "Reports and analytics",
      "Business workflow automation",
    ],
  },
  {
    slug: "seo-and-analytics",
    seoTitle: "SEO Services in Ahmedabad & Pune",
    seoDescription:
      "SEO services in Ahmedabad and Pune: keyword research, technical and on-page SEO, local SEO with Google Business Profile, and GA4 enquiry tracking.",
    title: "SEO & Analytics",
    description:
      "Websites that get found, not just built: keyword research, technical and local SEO, and analytics that show the enquiries search brings in.",
    items: [
      "Keyword and competitor research",
      "Technical SEO",
      "On-page SEO",
      "Local SEO and Google Business Profile",
      "Google Analytics 4 and Search Console",
      "Monthly SEO reports",
    ],
  },
];

export const serviceSlugs = serviceCategories.map((c) => c.slug);

/**
 * One line for each capability on the service pages. Plain descriptions of
 * the work, no promised results.
 */
export const serviceItemText: Record<string, string> = {
  "WordPress websites":
    "WordPress sites with a dashboard your team already knows, custom themes and only the plugins you need.",
  "Shopify stores":
    "Shopify stores with a custom theme, product setup, payment gateways and apps chosen for your catalogue.",
  "Business websites":
    "A clear website for your business: what you do, where you are and how to reach you, with an enquiry form that lands in your inbox or WhatsApp.",
  "Corporate websites":
    "Multi-page company websites for teams, divisions and investors, with a content system your staff can update.",
  "Landing pages":
    "Single pages for one campaign or product, built to load fast and turn ad traffic into enquiries.",
  "Custom web applications":
    "Portals, booking tools and customer dashboards that run in the browser, built around your process.",
  "Online stores":
    "Stores with categories, search, filters, cart and checkout that work smoothly on phones.",
  "Product catalogues":
    "Catalogues with variants, prices, photos and videos, organised the way your customers shop.",
  "Checkout and payment integrations":
    "UPI, cards, net banking and cash on delivery through Razorpay or other payment gateways.",
  "E-commerce management systems":
    "An admin panel for orders, stock, customers, coupons and delivery status.",
  "CRM systems":
    "Customers, enquiries, follow-ups and sales in one place, shared across your team and branches.",
  "ERP systems":
    "Purchasing, stock, production and accounts connected, so every department works from the same data.",
  "Inventory management":
    "Stock levels across warehouses and showrooms, with low-stock alerts and movement history.",
  "Billing and invoicing":
    "GST-ready bills and invoices, advance payments, due dates and printable or shareable PDFs.",
  "Booking and rental systems":
    "Availability calendars, bookings, deposits and returns for rentals, appointments and venues.",
  "Admin panels and dashboards":
    "Dashboards that show sales, enquiries and performance by branch, person or source.",
  "Reports and analytics":
    "Reports you can filter and export, so decisions come from numbers rather than guesswork.",
  "Business workflow automation":
    "Reminders, approvals, WhatsApp and email notifications that run without manual follow-up.",
  "Keyword and competitor research":
    "The searches your customers make in each city, and which competitors rank for them today.",
  "Technical SEO":
    "Page speed, mobile usability, sitemaps, structured data and crawl fixes so Google can read every page.",
  "On-page SEO":
    "Titles, descriptions, headings, internal links and content written for people and for search.",
  "Local SEO and Google Business Profile":
    "Google Business Profile setup, location pages and consistent business details so nearby customers find you.",
  "Google Analytics 4 and Search Console":
    "GA4 and Search Console set up to track enquiries, calls and WhatsApp clicks, not just visits.",
  "Monthly SEO reports":
    "A monthly report on rankings, traffic and enquiries, with the work planned for next month.",
};
