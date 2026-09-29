import Link from "next/link";
import { getEquipment } from "@/data/equipment";
import { images } from "@/data/images";
import { solutions, type SolutionSlug } from "@/data/solutions";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { IndustryGrid } from "@/components/industries/IndustryGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "EV charging infrastructure for commercial properties, fleet and logistics, multifamily, retail and hospitality, dealerships and public charging.",
  path: "/industries",
  image: images.industries.multifamily,
});

/** General planning guidance by application (not performance claims). */
const typicalDwell: Record<SolutionSlug, string> = {
  commercial: "Several hours (workday)",
  fleet: "Depends on duty cycle and depot schedule",
  multifamily: "Overnight",
  "retail-hospitality": "Under an hour to overnight",
  dealerships: "Varies by lot, service and delivery needs",
  "public-charging": "Minutes to about an hour",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Industries" }]}
        eyebrow="Industries"
        title="Charging infrastructure for every application."
        copy="From single-site deployments to multi-location networks, we design charging solutions for a wide range of industries and use cases."
        image={images.industries.multifamily}
        imagePosition="60% center"
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />

      <Section labelledBy="industries-grid-title">
        <Container>
          <h2 id="industries-grid-title" className="sr-only">
            Industries
          </h2>
          <IndustryGrid />
        </Container>
      </Section>

      <Section tone="mist" labelledBy="matrix-title">
        <Container>
          <SectionHeading
            id="matrix-title"
            eyebrow="Planning guide"
            title="Typical approach by application."
            copy="A starting point only. Your site assessment determines the right mix of equipment and power levels."
          />
          <div className="mt-12 overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Typical dwell time and charging types by application</caption>
              <thead className="bg-deep text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-display font-bold">
                    Application
                  </th>
                  <th scope="col" className="px-6 py-4 font-display font-bold">
                    Typical dwell time
                  </th>
                  <th scope="col" className="px-6 py-4 font-display font-bold">
                    Commonly considered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {solutions.map((s) => (
                  <tr key={s.slug} className="align-top">
                    <th scope="row" className="px-6 py-5 font-semibold text-deep">
                      <Link href={`/solutions/${s.slug}`} className="hover:text-grid-green-700">
                        {s.title}
                      </Link>
                    </th>
                    <td className="px-6 py-5 text-slate">{typicalDwell[s.slug]}</td>
                    <td className="px-6 py-5">
                      <ul className="flex flex-wrap gap-2">
                        {s.equipment.map((slug) => {
                          const e = getEquipment(slug);
                          return e ? (
                            <li key={slug}>
                              <Link
                                href={`/equipment/${slug}`}
                                className="inline-flex rounded-full border border-line bg-mist px-3 py-1 text-xs font-semibold text-charcoal hover:border-charcoal"
                              >
                                {e.title}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
