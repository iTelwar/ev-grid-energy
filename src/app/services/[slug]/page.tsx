import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { DashboardVisual } from "@/components/management/DashboardVisual";
import { ServiceCard } from "@/components/services/ServiceCard";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, InfoCards, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: `${service.description} EV Grid Energy services for commercial EV charging infrastructure.`,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  // The monitoring image is the dashboard composite, which needs clipping rather than a background crop.
  const isMonitoring = service.slug === "monitoring";
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow="Services"
        title={service.title}
        copy={service.intro}
        image={isMonitoring ? undefined : service.image}
        imagePosition="65% center"
        aside={isMonitoring ? <DashboardVisual priority sizes="(min-width: 1024px) 58vw, 100vw" /> : undefined}
        actions={
          <>
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            {isMonitoring && (
              <ButtonLink href="/management" size="lg" variant="outline-light">
                EV Grid Management
              </ButtonLink>
            )}
          </>
        }
      />

      <Section labelledBy="includes-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="includes-title" eyebrow="What's included" title="Scope of work." copy="Scope is tailored to each project and confirmed in your proposal." />
          </div>
          <div id="includes" className="rounded-2xl border border-line bg-mist p-8 sm:p-10 lg:col-span-7">
            <CheckList items={service.includes} columns={2} />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="outcomes-title">
        <Container>
          <SectionHeading id="outcomes-title" eyebrow="Why it matters" title="What you can expect." />
          <div className="mt-12">
            <InfoCards items={service.outcomes} />
          </div>
        </Container>
      </Section>

      <Section labelledBy="other-services-title">
        <Container>
          <h2 id="other-services-title" className="font-display text-2xl font-extrabold text-deep">
            Other services
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
