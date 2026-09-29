import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryGrid } from "@/components/industries/IndustryGrid";

export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="bg-mist py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="industries-title"
              eyebrow="Industry solutions"
              title={
                <>
                  Charging Infrastructure
                  <br className="hidden sm:block" /> for Every Application.
                </>
              }
              copy="From single-site deployments to multi-location networks, we design charging solutions for a wide range of industries and use cases."
            />
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <ButtonLink href="/industries" variant="outline" arrow>
              View All Industries
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 lg:mt-16">
          <IndustryGrid />
        </div>
      </Container>
    </section>
  );
}
