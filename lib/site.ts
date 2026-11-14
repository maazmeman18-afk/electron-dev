// Central site content. Contact details and social links are carried over
// from the previous site; service categories follow the redesign brief.

export const site = {
  name: "Electron Developers",
  url: "https://electrondevelopers.com",
  description:
    "Web development company in Ahmedabad and Pune building business websites, e-commerce stores and custom software (CRM, ERP, billing), all set up for SEO.",
  tagline: "We turn ideas into digital products.",
  location: "Ahmedabad & Pune, India",
  // Where we work. Used in the copy and in the structured data for Google.
  // No street address yet: add one (and switch the layout's structured data
  // to a LocalBusiness type) once the Google Business Profile exists.
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "City", name: "Pune" },
    { "@type": "State", name: "Gujarat" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "Country", name: "India" },
  ],
  email: "contact@electrondevelopers.com",
  // WhatsApp number for enquiries, digits only with country code.
  whatsapp: "919376385340",
  phones: [
    { label: "+91 93763 85340", href: "tel:+919376385340" },
    { label: "+91 73839 63236", href: "tel:+917383963236" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/electron-developers6" },
    { label: "LinkedIn", href: "https://linkedin.com/in/electron-developers" },
    { label: "Instagram", href: "https://www.instagram.com/electron_developers/" },
  ],
} as const;

export const navItems = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Why us", href: "/why-us" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
