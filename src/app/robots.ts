import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/login"] },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
