// Real client testimonials only, each with the client's permission.
//
// An entry shows on the site only once its `quote` is filled in with the
// client's own words. Empty quotes are skipped, and the whole section stays
// hidden while no entry has a quote, so the site never shows placeholders.
//
// Fields:
//   quote        Two to four sentences in the client's own words.
//   name         As the client wants it shown.
//   role         Optional, e.g. "Owner" or "Director".
//   company      The client's business.
//   projectSlug  Optional: links to that case study and also shows there.
//   service      Optional short label for what we built, e.g. "Website + CRM".
//   draft        Suggested wording to send the client for approval. NEVER shown
//                on the site. Once the client approves (or rewrites) it, copy
//                their final words into `quote`.

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company: string;
  projectSlug?: string;
  service?: string;
  /** Wording for the client to approve. Not displayed anywhere. */
  draft?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "", // TODO: Imran's words, approved by him.
    draft:
      "We needed one system for our showrooms, our website and our app, and Electron Developers built all three. Billing, customers and referrals now run from one CRM across every branch, and customers can browse the full catalogue online before they visit. They took the time to understand how a furniture business actually works.",
    name: "Imran Meman",
    company: "GUJJUBAZAR",
    projectSlug: "gujjubazar",
    service: "Website, app & CRM",
  },
  {
    quote: "", // TODO: Vishvajitsinh's words, approved by him.
    draft:
      "We wanted a website that shows our work properly and makes it easy for customers to ask for a quote. Electron Developers built the site and an admin panel, so our team updates services, projects and reviews ourselves without calling a developer. Simple to work with, and quick to respond whenever we needed a change.",
    name: "Vishvajitsinh Vaghela",
    company: "Lakshraj Enterprise",
    projectSlug: "lakshraj-enterprise",
    service: "Website & admin panel",
  },
  {
    quote: "", // TODO: Parth's words, approved by him.
    draft:
      "We wanted our diamond jewellery to look as good online as it does in person. Electron Developers built our Shopify store and set it up so our team could add products and manage orders ourselves. They explained every step clearly and were quick to help whenever we needed them.",
    // No case study: the Hellem Diam store is no longer online.
    name: "Parth",
    company: "Hellem Diam",
    service: "Shopify store",
  },
];

/** Entries that are ready to show (have a real quote). */
export const publishedTestimonials = testimonials.filter((t) => t.quote.trim().length > 0);
