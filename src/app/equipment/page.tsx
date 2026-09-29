import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "@/data/equipment";
import { images } from "@/data/images";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { EquipmentUnit } from "@/components/equipment/EquipmentUnit";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, InfoCards, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/components/ui/cn";

export const metadata = pageMetadata({
  title: "Charging Equipment",
  description:
    "Level 2, DC fast, high-power, distributed and battery-integrated EV charging equipment, selected for your site, electrical infrastructure and utilization.",
  path: "/equipment",
  image: images.equipmentLineup,
});

const selectionCriteria = [
  { title: "Site & electrical capacity", body: "Available service, distance to parking and the cost of upgrades." },
  { title: "Utilization & dwell time", body: "How long vehicles park and how many sessions each port must support." },
  { title: "Software & networks", body: "Compatibility with the management, payment and access requirements of your program." },
  { title: "Service & lifecycle", body: "Reliability, parts availability and long-term support for the equipment selected." },
];

export default function EquipmentPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Equipment" }]}
        eyebrow="Charging equipment"
        title="The right charging technology for every site."
        copy="We select equipment from our manufacturer and technology partners based on your site, electrical infrastructure, utilization and expansion plans - not a single product catalog."
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />

      <div className="bg-deep pb-16 sm:pb-20">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={images.equipmentLineup.src}
              alt={images.equipmentLineup.alt}
              width={images.equipmentLineup.width}
              height={images.equipmentLineup.height}
              priority
              sizes="(min-width: 1344px) 1264px, 94vw"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </div>

      <Section labelledBy="categories-title">
        <Container>
          <SectionHeading id="categories-title" eyebrow="Categories" title="Level 2 to high-power DC charging." />
          <div className="mt-14 space-y-6">
            {equipmentCategories.map((c, i) => (
              <Reveal key={c.slug}>
                <article
                  id={c.slug}
                  className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] md:grid-cols-12"
                >
                  <EquipmentUnit category={c} className={cn("h-64 pt-6 md:col-span-4 md:h-auto md:min-h-80", i % 2 === 1 && "md:order-last")} sizes="(min-width: 768px) 30vw, 60vw" />
                  <div className="p-7 sm:p-10 md:col-span-8">
                    <p className="font-display text-xs font-bold tracking-[0.16em] text-grid-green-700">0{i + 1}</p>
                    <h3 className="mt-2 flex items-center gap-3 font-display text-2xl font-extrabold text-deep">
                      <c.icon aria-hidden className="size-6 text-grid-green-700" strokeWidth={1.8} />
                      {c.title}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-slate">{c.intro}</p>
                    <div className="mt-6">
                      <CheckList items={c.idealFor} columns={2} />
                    </div>
                    <Link
                      href={`/equipment/${c.slug}`}
                      className="mt-7 inline-flex items-center gap-1.5 font-display text-sm font-bold text-charcoal hover:text-grid-green-700"
                    >
                      {c.title} details <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="selection-title">
        <Container>
          <SectionHeading
            id="selection-title"
            eyebrow="How we select equipment"
            title="Technology chosen for your site, not ours."
            copy="EV Grid Energy takes a manufacturer-flexible approach. Equipment is recommended after we understand your site and goals."
          />
          <div className="mt-12">
            <InfoCards items={selectionCriteria} columns={4} />
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
