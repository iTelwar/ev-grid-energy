import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { equipmentCategories, getEquipment } from "@/data/equipment";
import { images } from "@/data/images";
import { getSolution } from "@/data/solutions";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { EquipmentUnit } from "@/components/equipment/EquipmentUnit";
import { FinalCta } from "@/components/home/FinalCta";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, InfoCards, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/components/ui/cn";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return equipmentCategories.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getEquipment((await params).slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: `${category.summary} Selected and deployed by EV Grid Energy for ${category.useCases.toLowerCase()}`,
    path: `/equipment/${category.slug}`,
    image: images.equipmentLineup,
  });
}

export default async function EquipmentCategoryPage({ params }: Props) {
  const category = getEquipment((await params).slug);
  if (!category) notFound();

  const related = category.solutions.map(getSolution).filter((s) => s !== undefined).slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Equipment", href: "/equipment" }, { label: category.title }]}
        eyebrow="Charging equipment"
        title={category.title}
        copy={category.summary}
        aside={<EquipmentUnit category={category} priority className="h-72 rounded-2xl border border-white/10 pt-6 sm:h-96" sizes="(min-width: 1024px) 40vw, 80vw" />}
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />

      <Section labelledBy="overview-title">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading id="overview-title" eyebrow="Overview" title={`Where ${category.title.toLowerCase()} fits.`} />
            <p className="mt-6 text-lg leading-relaxed text-slate">{category.intro}</p>
          </div>
          <div className="rounded-2xl bg-mist p-8 lg:col-span-5">
            <h2 className="font-display text-lg font-extrabold text-deep">Well suited to</h2>
            <div className="mt-5">
              <CheckList items={category.idealFor} />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="planning-title">
        <Container>
          <SectionHeading id="planning-title" eyebrow="Planning considerations" title="What we evaluate." />
          <div className="mt-12">
            <InfoCards items={category.considerations} />
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate">
            Specific products, power ratings and configurations are recommended per project from EV Grid Energy&rsquo;s
            manufacturer and technology partners.
          </p>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-title">
          <Container>
            <h2 id="related-title" className="font-display text-2xl font-extrabold text-deep">
              Common applications
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <IndustryCard solution={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <nav aria-label="Other equipment categories" className="border-t border-line bg-white">
        <Container className="flex flex-wrap gap-2 py-8">
          {equipmentCategories.map((e) => (
            <Link
              key={e.slug}
              href={`/equipment/${e.slug}`}
              aria-current={e.slug === category.slug ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                e.slug === category.slug
                  ? "border-deep bg-deep text-white"
                  : "border-line text-charcoal hover:border-charcoal",
              )}
            >
              <e.icon aria-hidden className={cn("size-4", e.slug === category.slug ? "text-grid-green" : "text-grid-green-700")} />
              {e.title}
            </Link>
          ))}
        </Container>
      </nav>

      <FinalCta />
    </>
  );
}
