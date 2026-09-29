import type { Metadata } from "next";
import { images, type SiteImage } from "@/data/images";
import { siteConfig } from "@/data/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: SiteImage;
};

/** Consistent metadata (canonical, Open Graph, Twitter) for secondary pages. */
export function pageMetadata({ title, description, path, image = images.hero }: PageMeta): Metadata {
  const og = { url: image.src, width: image.width, height: image.height, alt: image.alt };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      images: [og],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: [image.src] },
  };
}
