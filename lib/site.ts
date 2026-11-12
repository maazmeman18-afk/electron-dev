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
