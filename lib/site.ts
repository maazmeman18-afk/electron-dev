// Central site content. Contact details and social links are carried over
// from the previous site; service categories follow the redesign brief.

export const site = {
  name: "Electron Developers",
  url: "https://electrondevelopers.com",
  description:
    "We design and build digital experiences, e-commerce platforms and custom business systems that help companies operate and grow.",
  tagline: "We turn ideas into digital products.",
  location: "Ahmedabad, Gujarat, India",
  email: "electondevelopers6@gmail.com",
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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    title: "Website Development",
    items: [
      "Business websites",
      "Corporate websites",
      "Landing pages",
      "Custom web applications",
    ],
  },
  {
    title: "E-commerce Development",
    items: [
      "Online stores",
      "Product catalogues",
      "Checkout and payment integrations",
      "E-commerce management systems",
    ],
  },
  {
    title: "Custom Business Software",
    items: [
      "CRM systems",
      "Inventory management",
      "Operational dashboards",
      "Business workflow automation",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "AI integrations",
      "Intelligent workflows",
      "Chatbots and assistants",
      "Process automation",
    ],
  },
] as const;
