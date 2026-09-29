import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { guides } from "@/data/resources";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Resources",
  description: "Planning guides for commercial EV charging: charging types, electrical capacity, fleet charging, expansion and reliability.",
  path: "/resources",
  image: images.services.siteAssessment,
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Resources" }]}
        eyebrow="Resources"
        title="Planning guides for commercial EV charging."
        copy="Practical, vendor-neutral guidance to help you prepare for a charging project."
        image={images.services.siteAssessment}
        imagePosition="30% center"
        compact
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />
      <Section tone="mist" labelledBy="guides-title">
        <Container>
          <h2 id="guides-title" className="sr-only">
            Guides
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal as="li" key={g.slug} delay={(i % 3) * 80}>
                <article id={g.slug} className="flex h-full scroll-mt-28 flex-col rounded-xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                  <p className="eyebrow text-grid-green-700">{g.category}</p>
                  <h3 className="mt-3 font-display text-xl font-extrabold text-deep">{g.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{g.summary}</p>
                  <div className="mt-5 flex-1 border-t border-line pt-5">
                    <CheckList items={g.points} />
                  </div>
                  {g.related && (
                    <Link href={g.related.href} className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-charcoal hover:text-grid-green-700">
                      {g.related.label} <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-slate">
            Have a question that isn&rsquo;t covered here?{" "}
            <Link href="/contact" className="font-semibold text-grid-green-700 underline-offset-2 hover:underline">
              Ask our team
            </Link>
            .
          </p>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
