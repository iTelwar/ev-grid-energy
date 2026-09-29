import { images } from "@/data/images";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { Lifecycle } from "@/components/home/Lifecycle";
import { IndustryGrid } from "@/components/industries/IndustryGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "EV Charging Solutions",
  description:
    "Commercial EV charging solutions for offices, fleets, multifamily, retail and hospitality, dealerships and public charging, planned around your site and goals.",
  path: "/solutions",
  image: images.industries.publicCharging,
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Solutions" }]}
        eyebrow="Solutions"
        title="Charging solutions designed around your application."
        copy="Every site is different. We plan charging infrastructure around how vehicles use your property, the electrical capacity available and where your program is heading."
        image={images.industries.publicCharging}
        imagePosition="60% center"
        actions={
          <>
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/equipment" size="lg" variant="outline-light">
              Explore Equipment
            </ButtonLink>
          </>
        }
      />
      <Section labelledBy="applications-title">
        <Container>
          <SectionHeading
            id="applications-title"
            eyebrow="Applications"
            title="Choose your application."
            copy="From single-site deployments to multi-location networks."
          />
          <div className="mt-12">
            <IndustryGrid />
          </div>
        </Container>
      </Section>
      <div className="border-t border-line">
        <Lifecycle />
      </div>
      <FinalCta />
    </>
  );
}
