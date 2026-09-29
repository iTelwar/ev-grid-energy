import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="services-title"
              eyebrow="Services & support"
              title="Full Lifecycle Support."
              copy="We provide end-to-end services to help ensure reliable, high-performing charging infrastructure."
            />
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <ButtonLink href="/services" variant="outline" arrow>
              Explore Services
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <ServiceCard service={s} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 48vw, 100vw" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
