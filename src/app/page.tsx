import type { Metadata } from "next";
import { logo } from "@/data/images";
import { siteConfig } from "@/data/site";
import { EquipmentShowcase } from "@/components/home/EquipmentShowcase";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Industries } from "@/components/home/Industries";
import { Lifecycle } from "@/components/home/Lifecycle";
import { ManagementShowcase } from "@/components/home/ManagementShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL(logo.src, siteConfig.url).toString(),
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Lifecycle />
      <EquipmentShowcase />
      <Industries />
      <ManagementShowcase />
      <ServicesSection />
      <FinalCta />
    </>
  );
}
