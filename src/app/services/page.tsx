import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { Lifecycle } from "@/components/home/Lifecycle";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DashboardVisual } from "@/components/management/DashboardVisual";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/cn";

export const metadata = pageMetadata({
  title: "EV Charging Services",
  description:
    "Site assessment and design, installation and commissioning, monitoring and operations, and maintenance for commercial EV charging infrastructure.",
  path: "/services",
  image: images.services.installation,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services" }]}
        eyebrow="Services & support"
        title="Full lifecycle support for charging infrastructure."
        copy="One partner from the first site walk through long-term operation, so your charging program is planned, built and maintained with accountability."
        image={images.services.installation}
        imagePosition="70% center"
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      />
      <Lifecycle />
      <Section tone="mist" labelledBy="services-list-title">
        <Container>
          <h2 id="services-list-title" className="sr-only">
            Our services
          </h2>
          <div className="space-y-8">
            {services.map((s, i) => (
              <Reveal key={s.slug}>
                <article className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] lg:grid-cols-2">
                  <div className={cn("relative aspect-[16/10] bg-deep lg:aspect-auto lg:min-h-[26rem]", i % 2 === 1 && "lg:order-last")}>
                    {s.crop ? (
                      <div className="grid-pattern absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                        <DashboardVisual className="w-full" sizes="(min-width: 1024px) 45vw, 90vw" />
                      </div>
                    ) : (
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                    <s.icon aria-hidden className="size-7 text-grid-green-700" strokeWidth={1.6} />
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-deep sm:text-3xl">{s.title}</h3>
                    <p className="mt-4 leading-relaxed text-slate">{s.intro}</p>
                    <div className="mt-6">
                      <CheckList items={s.includes.slice(0, 4)} columns={2} />
                    </div>
                    <Link href={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-1.5 font-display text-sm font-bold text-charcoal hover:text-grid-green-700">
                      Learn more about {s.title.toLowerCase()} <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
