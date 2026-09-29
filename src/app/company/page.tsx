import { images } from "@/data/images";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { Lifecycle } from "@/components/home/Lifecycle";
import { PageHero } from "@/components/templates/PageHero";
import { InfoCards, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "About EV Grid Energy",
  description:
    "EV Grid Energy is a commercial EV infrastructure solutions company: one accountable partner for planning, deployment, management and lifecycle support.",
  path: "/company",
  image: images.services.siteAssessment,
});

const principles = [
  { title: "One accountable partner", body: "A single relationship from site assessment through long-term support." },
  { title: "Right-sized solutions", body: "Recommendations based on your site, utilization and budget - not a fixed catalog." },
  { title: "Technology flexibility", body: "A manufacturer-flexible approach, so equipment choices can evolve with your program." },
  { title: "Built for the long term", body: "Planning for monitoring, maintenance and expansion from day one." },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Company" }]}
        eyebrow="About EV Grid Energy"
        title="Your partner for commercial EV charging infrastructure."
        copy="EV Grid Energy helps businesses plan, deploy, manage and support EV charging infrastructure, bringing engineering, equipment, software and service together under one relationship."
        image={images.services.siteAssessment}
        imagePosition="30% center"
        actions={
          <>
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-light">
              Contact Us
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="who-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="who-title" eyebrow="Who we are" title="Infrastructure solutions, not just hardware." />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate lg:col-span-7">
            <p>
              Charging infrastructure involves far more than choosing a charger. Electrical capacity, engineering,
              permitting, construction, software, payments and maintenance all shape whether a charging program
              succeeds.
            </p>
            <p>
              EV Grid Energy is the customer-facing partner that coordinates those pieces. We work with equipment
              manufacturers, technology partners and service providers behind the scenes, and give you one team
              responsible for the outcome.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="principles-title">
        <Container>
          <SectionHeading id="principles-title" eyebrow="How we work" title="Principles that guide every project." />
          <div className="mt-12">
            <InfoCards items={principles} columns={4} />
          </div>
        </Container>
      </Section>

      <Lifecycle />
      <FinalCta />
    </>
  );
}
