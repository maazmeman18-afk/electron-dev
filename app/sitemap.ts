import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { serviceCategories } from "@/lib/services";
import { projects } from "@/lib/projects";

const staticRoutes = ["", "/work", "/services", "/why-us", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = serviceCategories.map((category) => ({
    url: `${site.url}/services/${category.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workRoutes = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const baseRoutes = staticRoutes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  return [...baseRoutes, ...serviceRoutes, ...workRoutes];
}
