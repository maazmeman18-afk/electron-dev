// Service category data grouped from the old site's Services.jsx.
// The old services are grouped under the three focus categories:
// websites, e-commerce and software development.
// Services that do not cleanly map to a category are listed under
// `ungroupedServices` for the owner to review.
export type RelatedService = {
  title: string;
  description: string;
  detailedDescription: string;
  benefits?: string[];
};

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  items: string[];
  relatedServices: RelatedService[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Fast, clear websites that explain what you do and turn visitors into enquiries.",
    items: [
      "Business websites",
      "Corporate websites",
      "Landing pages",
      "Custom web applications",
    ],
    relatedServices: [
      {
        title: "Web Development",
        description:
          "Custom, responsive websites built with modern technologies that engage your audience and drive conversions.",
        detailedDescription:
          "Our web development team combines cutting-edge technologies with elegant design principles to create websites that not only look stunning but perform exceptionally well. We specialize in responsive design, ensuring your site works flawlessly across all devices.",
        benefits: [
          "Custom-built solutions tailored to your specific business needs",
          "Responsive design optimized for all devices and screen sizes",
          "Fast loading times and performance optimization",
          "SEO-friendly architecture and clean code",
          "Content Management Systems integration for easy updates",
        ],
      },
      {
        title: "UX/UI Design",
        description:
          "Create intuitive user experiences that delight customers and keep them coming back for more.",
        detailedDescription:
          "Our UX/UI design services focus on creating intuitive, enjoyable digital experiences that meet user needs while achieving business goals. We combine research-based insights with creative design to develop interfaces that users love to interact with.",
        benefits: [
          "User-centered design approach based on research",
          "Improved user satisfaction and engagement",
          "Increased conversion rates and user retention",
          "Reduced development costs by solving problems early",
          "Accessible designs that work for all users",
        ],
      },
    ],
  },
  {
    slug: "e-commerce-development",
    title: "E-commerce Development",
    description:
      "Stores that make it easy to browse, buy and come back, with the tools to manage orders behind the scenes.",
    items: [
      "Online stores",
      "Product catalogues",
      "Checkout and payment integrations",
      "E-commerce management systems",
    ],
    relatedServices: [],
  },
  {
    slug: "custom-business-software",
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
    relatedServices: [
      {
        title: "Automation Tools",
        description:
          "Streamline operations with custom automation solutions that save time and reduce costs.",
        detailedDescription:
          "Our automation solutions help businesses streamline repetitive tasks, improve efficiency, and reduce operational costs. We identify automation opportunities and implement tools that integrate seamlessly with your existing workflows.",
        benefits: [
          "Reduced operational costs and improved efficiency",
          "Elimination of human error in repetitive tasks",
          "Improved employee satisfaction by reducing mundane work",
          "Scalable solutions that grow with your business",
          "Detailed analytics to measure performance improvements",
        ],
      },
    ],
  },
];

// Old-site services that do not map cleanly to the three categories.
// Flagged for the owner to decide whether to add, rename, or drop them.
export const ungroupedServices: RelatedService[] = [
  {
    title: "Logo Design",
    description:
      "Professional, unique logos that capture your brand essence and make a lasting impression on your audience.",
    detailedDescription:
      "Your logo is the face of your brand. Our expert designers craft memorable logos that communicate your brand's values and character at a glance. We follow a comprehensive process to ensure your logo stands the test of time.",
    benefits: [
      "Unique, custom designs that reflect your brand identity",
      "Multiple concept options to choose from",
      "Scalable vector formats for use across all mediums",
      "Complete brand guidelines for consistent application",
      "All source files and formats provided",
    ],
  },
  {
    title: "SEO Optimization",
    description:
      "Boost your site's ranking with advanced SEO strategies that increase visibility and organic traffic.",
    detailedDescription:
      "Our data-driven SEO strategies are designed to improve your search engine rankings and drive qualified organic traffic to your website. We take a holistic approach that combines technical optimization, content strategy, and off-page techniques.",
    benefits: [
      "Comprehensive site audit and competitive analysis",
      "Keyword research and strategic implementation",
      "Technical SEO implementation and cleanup",
      "Content optimization and creation strategy",
      "Regular reporting and ongoing optimization",
    ],
  },
  {
    title: "Digital Marketing",
    description:
      "Engage your audience with targeted marketing campaigns across multiple channels for maximum impact.",
    detailedDescription:
      "Our digital marketing services help you connect with your target audience through strategic campaigns across multiple channels. We focus on data-driven decisions to maximize ROI and create meaningful engagement with your brand.",
    benefits: [
      "Strategic campaign planning based on market research",
      "Multi-channel approach for maximum reach",
      "Audience targeting and segmentation",
      "Regular performance analysis and optimization",
      "Comprehensive reporting and insights",
    ],
  },
  {
    title: "Graphic Design",
    description:
      "Stunning visuals to elevate your brand identity and create memorable impressions with your audience.",
    detailedDescription:
      "Our graphic design services create visual assets that communicate your brand message effectively and leave a lasting impression. From print materials to digital assets, we ensure consistency and quality across all your visual touchpoints.",
    benefits: [
      "Consistent brand representation across all materials",
      "Professional designs that elevate your brand perception",
      "Strategic use of visual elements to communicate your message",
      "Versatile designs for both print and digital applications",
      "Quick turnaround for time-sensitive projects",
    ],
  },
  {
    title: "Personal Branding",
    description:
      "Craft a unique identity to stand out in the market and position yourself as an industry leader.",
    detailedDescription:
      "Our personal branding services help professionals and entrepreneurs establish a distinctive presence in their industry. We work with you to develop a cohesive brand identity that authentically represents your unique value proposition.",
    benefits: [
      "Strategic positioning to stand out in your industry",
      "Consistent brand messaging across all platforms",
      "Professional online presence optimization",
      "Content strategy aligned with personal brand values",
      "Reputation management and growth plan",
    ],
  },
  {
    title: "Social Media Ads",
    description:
      "Maximize reach with optimized ad campaigns that target your ideal customers and drive results.",
    detailedDescription:
      "Our social media advertising services help you reach your target audience with precision and impact. We create and manage campaigns that drive engagement, leads, and conversions while optimizing your ad spend for maximum ROI.",
    benefits: [
      "Strategic campaign planning based on business goals",
      "Advanced audience targeting and segmentation",
      "Creative ad development optimized for each platform",
      "A/B testing to maximize performance",
      "Comprehensive analytics and reporting",
    ],
  },
];

export const serviceSlugs = serviceCategories.map((c) => c.slug);
