// Project content carried over from the previous site (src/sections/Projects.jsx).
// Titles, descriptions, tech stacks and URLs verified against the old file.
// `type` replaces the old category labels with a plain description of the build.

export type Project = {
  slug: string;
  title: string;
  type: string;
  description: string;
  tech: string[];
  url: string;
  image: { src: string; width: number; height: number };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "lakshraj-enterprise",
    title: "Lakshraj Enterprise",
    type: "Business website",
    description:
      "A modern Dynamic website developed for construction Company with features like manage enquiries, services , portfolio , testimonial through admin panel, and SEO optimization for better reach.",
    tech: ["PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://lakshrajenterprise.in/",
    image: { src: "/work/lakshraj-enterprise.webp", width: 1280, height: 995 },
    featured: true,
  },
  {
    slug: "crm-manager",
    title: "CRM Manager",
    type: "CRM system",
    description:
      "A comprehensive CRM system to streamline customer management, inventory, and sales tracking — tailored specifically for CRM-based businesses.",
    tech: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    url: "https://crmmanager.great-site.net",
    image: { src: "/work/crm-manager.webp", width: 1600, height: 738 },
    featured: true,
  },
  {
    slug: "ecommerce-anon",
    title: "E-commerce Anon",
    type: "E-commerce website",
    description:
      "A modern e-commerce website developed for furniture sales with features like cart, order management, and SEO optimization for better reach.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://tinyurl.com/anon-ecommerce",
    image: { src: "/work/ecommerce-anon.webp", width: 1280, height: 952 },
    featured: true,
  },
  {
    slug: "build-state",
    title: "Build State App",
    type: "Real estate app",
    description:
      "A sleek real estate application providing property listings with language support and dynamic navigation for users looking to invest in properties.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://buildestate.vercel.app/",
    image: { src: "/work/build-state.webp", width: 1600, height: 740 },
  },
  {
    slug: "electron-real-estate",
    title: "Electron Real Estate",
    type: "Real estate platform",
    description:
      "A professional real estate platform designed for Electron Group, enabling property showcasing, client inquiries, and efficient content updates.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://electronrealestate.vercel.app",
    image: { src: "/work/electron-real-estate.webp", width: 1600, height: 744 },
  },
  {
    slug: "cake-bakery",
    title: "Cake Bakery Website",
    type: "E-commerce website",
    description:
      "An elegant e-commerce platform for a local cake bakery, enabling online ordering, multilingual support and an intuitive interface for managing cake products and customer orders.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://mistyrose-pigeon-735397.hostingersite.com/index.php",
    image: { src: "/work/cake-bakery.webp", width: 1600, height: 774 },
  },
  {
    slug: "earth-movers",
    title: "Earth Movers site",
    type: "Business website",
    description:
      "A construction and logistics website tailored for Earth Movers, showcasing raw material services like sand and kapchi along with contact and service management.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://gray-walrus-389110.hostingersite.com/",
    image: { src: "/work/earth-movers.webp", width: 1600, height: 755 },
  },
  {
    slug: "graphic-designer-portfolio",
    title: "Graphic Designer Portfolio",
    type: "Portfolio website",
    description:
      "A modern and responsive portfolio website for a graphic designer, featuring project galleries, a contact backend, and client feedback integration.",
    tech: ["HTML", "CSS", "Javascript", "PHP", "MySQL", "React"],
    url: "https://electron-graphics.great-site.net",
    image: {
      src: "/work/graphic-designer-portfolio.webp",
      width: 1600,
      height: 785,
    },
  },
  {
    slug: "car-rental",
    title: "Car Rental Site",
    type: "Booking system",
    description:
      "A full-fledged car rental booking system with an intuitive admin panel to manage vehicle listings, customer bookings and contact queries efficiently.",
    tech: ["PHP", "MySQL", "HTML", "jQuery", "Tailwind CSS", "Bootstrap", "React"],
    url: "https://carrentalsystem.free.nf",
    image: { src: "/work/car-rental.webp", width: 1600, height: 810 },
  },
  {
    slug: "beat-buzz",
    title: "Beat Buzz Music App",
    type: "Web app",
    description:
      "A music streaming web app where users can explore playlists, trending songs and artist albums with a seamless and interactive UI experience.",
    tech: ["React", "PHP", "MySQL", "Tailwind CSS", "SEO Optimisation"],
    url: "https://beatbuzz-frontend.onrender.com/",
    image: { src: "/work/beat-buzz.webp", width: 1600, height: 668 },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
