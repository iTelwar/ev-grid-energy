import type { MetadataRoute } from "next";
import { equipmentCategories } from "@/data/equipment";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { solutions } from "@/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/solutions",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    "/industries",
    "/equipment",
    ...equipmentCategories.map((e) => `/equipment/${e.slug}`),
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/management",
    "/resources",
    "/company",
    "/contact",
    "/site-assessment",
  ];
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/site-assessment" ? 0.9 : 0.7,
  }));
}
