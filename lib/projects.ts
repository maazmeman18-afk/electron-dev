// Case studies shown on the site. Only real, owner-confirmed work goes here.
//
// Sources for the facts below:
// - GUJJUBAZAR: the live site gujjubazar.com (categories, showrooms, app
//   benefits), website and app screenshots supplied by the owner, and the CRM
//   screenshots from the old site (company/src/assets/project_SS/Gujju_CRM).
// - Lakshraj Enterprise: the previous site's project data; the owner confirmed
//   Electron Developers built both the front end and the back end.
//
// Rules: no invented results, numbers or quotes. Leave `tech` empty to hide
// technology pills. Testimonials live in lib/testimonials.ts.

export type ImageAsset = { src: string; width: number; height: number };

/** Which animated mock-up the home and work showcases draw for a part. */
export type PartVisual = "store" | "app" | "crm" | "site" | "admin";

export type ProjectPart = {
  title: string;
  /** Short line for the showcase heading stack. */
  headline: string;
  text: string;
  points: string[];
  visual: PartVisual;
  /** Short labels shown inside the mock-up. Illustrative UI, not data. */
  highlights: string[];
};

export type GalleryImage = ImageAsset & {
  alt: string;
  caption: string;
  /** Which product the screen belongs to; the case study groups by this. */
  group: "Website" | "Android app" | "CRM" | "Admin panel";
};

export type Project = {
  slug: string;
  title: string;
  /** Short label, e.g. "Business website with admin panel". */
  type: string;
  /** One or two sentences; also used as the page's meta description. */
  description: string;
  /** Technology pills. Leave empty to hide them. */
  tech: string[];
  url: string;
  /** Cover image for cards and related-project lists. */
  image: ImageAsset;
  featured?: boolean;
  client: string;
  industry: string;
  locations?: string;
  /** Opening paragraph of the case study. */
  summary: string;
  deliverables: string[];
  links: { label: string; href: string }[];
  parts: ProjectPart[];
  /** SEO and analytics work done for this client. Confirm before launch. */
  seo: string[];
  gallery?: GalleryImage[];
};

export const projects: Project[] = [
  {
    slug: "gujjubazar",
    title: "GUJJUBAZAR",
    type: "Furniture e-commerce: website, app and CRM",
    description:
      "Website, Android app and CRM for Gujju Bazar Furniture, a factory-direct furniture brand with showrooms across Gujarat and in Bangalore.",
    tech: [],
    url: "https://gujjubazar.com/",
    image: { src: "/work/gujjubazar-website-home.webp", width: 1788, height: 989 },
    featured: true,
    client: "Gujju Bazar Furniture",
    industry: "Furniture retail",
    locations: "Showrooms in Ahmedabad, Surat, Vadodara and Bangalore",
    summary:
      "Gujju Bazar Furniture sells factory-direct furniture through showrooms in Ahmedabad, Surat, Vadodara and Bangalore. We built the digital side of the business: the gujjubazar.com website, the Gujju Bazar Android app, and the CRM the team uses to run billing, customers and referrals across branches.",
    deliverables: ["Website", "Android app", "CRM", "SEO & analytics"],
    links: [
      { label: "Visit gujjubazar.com", href: "https://gujjubazar.com/" },
      // Add the Play Store link here when ready, e.g.
      // { label: "Get the Android app", href: "https://play.google.com/store/apps/details?id=..." },
    ],
    parts: [
      {
        title: "Website",
        headline: "A storefront built for browsing",
        visual: "store",
        highlights: ["Beds", "Wardrobes", "Sofas", "Dining", "Office", "Pooja mandirs"],
        text: "A catalogue built around how people shop for furniture, with every showroom one tap away.",
        points: [
          "Products organised by category, room, budget and collection",
          "Best sellers and new launches up front",
          "Video filter to browse products in motion",
          "A WhatsApp contact for every showroom",
          "EMI, delivery and warranty details where buyers look for them",
        ],
      },
      {
        title: "Android app",
        headline: "An app that brings customers back",
        visual: "app",
        highlights: ["App-only price", "Your order is on its way", "Showroom rates updated"],
        text: "The Gujju Bazar app gives regular customers a reason to come back.",
        points: [
          "App-only prices",
          "Live order tracking",
          "Showroom rates in the app",
        ],
      },
      {
        title: "CRM",
        headline: "A CRM every branch runs on",
        visual: "crm",
        highlights: ["Bill added", "Referral payout sent", "Feedback received"],
        text: "One system for billing, customers and referrals across every branch.",
        points: [
          "Billing with branch, salesman, advance payment and delivery date",
          "Dashboard: sales by branch and where customers come from",
          "Manage customers, salesmen, admins and references",
          "Command Center: revenue, costs and profit by branch with a live P&L",
          "Store analytics for website and app traffic and the checkout funnel",
          "Customer feedback insights",
          "Referral partner portal with rewards, payouts and shareable promotions",
        ],
      },
    ],
    // Confirm with the owner before launch.
    seo: [
      "Keyword research for furniture searches in each showroom city",
      "Technical SEO: speed, mobile, sitemap and structured data",
      "On-page SEO for category and product pages",
      "Local SEO so every showroom can be found on Google",
      "Google Analytics 4 and Search Console, with enquiry tracking",
    ],
    gallery: [
      {
        src: "/work/gujjubazar-website-home.webp",
        width: 1788,
        height: 989,
        group: "Website",
        alt: "gujjubazar.com home page with the book-for-1000-rupees offer, returns, EMI and WhatsApp video consultation highlights",
        caption: "Home page: book furniture for ₹1,000 and pay the rest on delivery",
      },
      {
        src: "/work/gujjubazar-website-categories.webp",
        width: 1569,
        height: 988,
        group: "Website",
        alt: "Shop by category and shop by room sections on gujjubazar.com with starting prices",
        caption: "Shop by category or by room, with starting prices up front",
      },
      {
        src: "/work/gujjubazar-website-collection.webp",
        width: 1740,
        height: 993,
        group: "Website",
        alt: "Living room furniture collection page with a showroom city filter and product cards showing GST pricing",
        caption: "Collections filtered by showroom city, with market price and GST shown",
      },
      {
        src: "/work/gujjubazar-website-showrooms.webp",
        width: 1750,
        height: 998,
        group: "Website",
        alt: "Showroom finder listing Gujju Bazar experience centres in Ahmedabad, Surat, Vadodara and Bangalore",
        caption: "Showroom finder: every experience centre with opening hours and directions",
      },
      {
        src: "/work/gujjubazar-app-home.webp",
        width: 718,
        height: 1599,
        group: "Android app",
        alt: "Gujju Bazar Android app home screen with location, showroom finder, search and categories",
        caption: "App home: location, showroom finder, search and categories",
      },
      {
        src: "/work/gujjubazar-app-category.webp",
        width: 718,
        height: 1599,
        group: "Android app",
        alt: "Gujju Bazar Android app bed category screen with budget stores, filters and prices",
        caption: "Category screens with budget stores, sort and filter",
      },
      {
        src: "/work/gujjubazar-crm-command-center.png",
        width: 1567,
        height: 982,
        group: "CRM",
        alt: "GUJJUBAZAR CRM Command Center with revenue, cost of goods, purchases, gross and net profit by branch and a profit and loss summary",
        caption: "Command Center: revenue, costs and profit by branch, with a live P&L",
      },
      {
        src: "/work/gujjubazar-crm-admin-dashboard.png",
        width: 1809,
        height: 1004,
        group: "CRM",
        alt: "GUJJUBAZAR CRM admin dashboard with customers, referrals, account balances, last activity by branch and salesman, and sales by branch",
        caption: "Admin dashboard: activity by branch and salesman, sales and customer sources",
      },
      {
        src: "/work/gujjubazar-crm-store-analytics.png",
        width: 1822,
        height: 1002,
        group: "CRM",
        alt: "GUJJUBAZAR store analytics dashboard with visitors, sessions, cart and checkout funnel for the website and app",
        caption: "Store analytics: website and app traffic, sessions and the checkout funnel",
      },
    ],
  },
  {
    slug: "lakshraj-enterprise",
    title: "Lakshraj Enterprise",
    type: "Business website with admin panel",
    description:
      "Website and admin panel for Lakshraj Enterprise, a construction company: services, portfolio, testimonials and enquiries managed in one place, built for search.",
    tech: [],
    url: "https://lakshrajenterprise.in/",
    image: { src: "/work/lakshraj-enterprise.webp", width: 1280, height: 995 },
    client: "Lakshraj Enterprise",
    industry: "Construction",
    summary:
      "Lakshraj Enterprise is a construction company. We designed and built their website, front end and back end, with an admin panel so the team can update services, portfolio and testimonials and handle enquiries without a developer.",
    deliverables: ["Website", "Admin panel", "SEO"],
    links: [{ label: "Visit lakshrajenterprise.in", href: "https://lakshrajenterprise.in/" }],
    parts: [
      {
        title: "Website",
        headline: "A site that shows the work",
        visual: "site",
        highlights: ["New enquiry received"],
        text: "A clear site that shows what the company builds and makes it easy to get in touch.",
        points: [
          "Pages for services, portfolio and testimonials",
          "Enquiry form connected to the admin panel",
          "Works on phones, tablets and desktops",
        ],
      },
      {
        title: "Admin panel",
        headline: "An admin panel the team runs",
        visual: "admin",
        highlights: ["Enquiry answered", "Service added", "Portfolio updated", "Testimonial published"],
        text: "The team updates the site themselves.",
        points: [
          "Manage enquiries",
          "Add and edit services",
          "Update the portfolio",
          "Publish testimonials",
          "Manage client logos and admin users",
        ],
      },
    ],
    // Confirm with the owner before launch.
    seo: [
      "On-page SEO: titles, descriptions and headings for every page",
      "Technical SEO basics: sitemap, mobile and speed",
    ],
    gallery: [
      {
        src: "/work/lakshraj-website-about.webp",
        width: 1585,
        height: 1005,
        group: "Website",
        alt: "Lakshraj Enterprise About page: Building Ahmedabad with trust since 2010",
        caption: "About page: the company story, team and promise",
      },
      {
        src: "/work/lakshraj-website-services.webp",
        width: 1241,
        height: 991,
        group: "Website",
        alt: "Lakshraj Enterprise services page listing construction materials such as high-grade sand with a quote button",
        caption: "Services: each material with details and a Get a Quote button",
      },
      {
        src: "/work/lakshraj-admin-dashboard.png",
        width: 1797,
        height: 995,
        group: "Admin panel",
        alt: "Lakshraj Enterprise admin panel dashboard with enquiries, services, portfolio, reviews, admins and clients",
        caption: "Admin panel: enquiries, services, portfolio, reviews, client logos and admins",
      },
    ],
  },
];

/** Old case-study URLs that now redirect to /work. */
export const retiredProjectSlugs = [
  "crm-manager",
  "ecommerce-anon",
  "build-state",
  "electron-real-estate",
  "cake-bakery",
  "earth-movers",
  "graphic-designer-portfolio",
  "car-rental",
  "beat-buzz",
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);
