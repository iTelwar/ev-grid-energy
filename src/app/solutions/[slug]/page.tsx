import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getEquipment } from "@/data/equipment";
import { getService } from "@/data/services";
import { getSolution, solutions } from "@/data/solutions";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { EquipmentUnit } from "@/components/equipment/EquipmentUnit";
import { FinalCta } from "@/components/home/FinalCta";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { PageHero } from "@/components/templates/PageHero";
import { InfoCards, LinkList, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  return pageMetadata({
    title: `${solution.title} EV Charging`,
    description: `${solution.summary} Planning, installation, management and support from EV Grid Energy.`,
    path: `/solutions/${solution.slug}`,
    image: solution.image,
  });
}

export default async function SolutionPage({ params }: Props) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();

  const equipment = solution.equipment.map(getEquipment).filter((e) => e !== undefined);
  const services = solution.services.map(getService).filter((s) => s !== undefined);
  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Solutions", href: "/solutions" }, { label: solution.title }]}
        eyebrow={solution.title}
        title={solution.headline}
        copy={solution.intro}
        image={solution.image}
        imagePosition="65% center"
        actions={
          <>
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-light">
              Talk to Our Team
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="considerations-title">
        <Container>
          <SectionHeading id="considerations-title" eyebrow="Key considerations" title={`What matters for ${solution.shortTitle.toLowerCase()} charging.`} />
          <div className="mt-12">
            <InfoCards items={solution.considerations} />
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="approach-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="approach-title" eyebrow="Our approach" title="How we plan your project." />
            <ol className="mt-10 space-y-4">
              {solution.approach.map((step, i) => (
                <li key={step} className="flex items-center gap-5 rounded-xl border border-line bg-white p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-deep font-display text-sm font-bold text-grid-green">
                    {i + 1}
                  </span>
                  <span className="font-medium text-charcoal">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <h2 className="font-display text-xl font-extrabold text-deep">Services included</h2>
            <div className="mt-5">
              <LinkList links={services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.description }))} />
            </div>
          </div>
        </Container>
      </Section>

      <Section labelledBy="equipment-fit-title">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="equipment-fit-title"
              eyebrow="Typical equipment"
              title="Charging technology commonly used."
              copy="Final equipment selection depends on your site assessment, electrical capacity and utilization."
            />
            <ButtonLink href="/equipment" variant="outline" arrow className="shrink-0">
              All Equipment
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/equipment/${e.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <EquipmentUnit category={e} className="h-48 pt-4" sizes="180px" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display font-extrabold text-deep">{e.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{e.useCases}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-charcoal group-hover:text-grid-green-700">
                      Learn more <ArrowRight aria-hidden className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="other-title">
        <Container>
          <h2 id="other-title" className="font-display text-2xl font-extrabold text-deep">
            Other applications
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <IndustryCard solution={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
