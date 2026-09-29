import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { equipmentCategories } from "@/data/equipment";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EquipmentUnit } from "@/components/equipment/EquipmentUnit";

export function EquipmentShowcase() {
  return (
    <section aria-labelledby="equipment-title" className="relative isolate overflow-hidden bg-deep py-20 text-white sm:py-24 lg:py-32">
      <div aria-hidden className="grid-pattern absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent_70%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-grid-green/[0.07] blur-3xl" />

      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal>
            <SectionHeading
              id="equipment-title"
              tone="dark"
              eyebrow="Charging equipment"
              title={
                <>
                  Level 2 to High-Power
                  <br /> DC Charging.
                </>
              }
            />
          </Reveal>
          <Reveal delay={100} className="lg:pb-2">
            <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              A full range of charging solutions for every application. We select the right technology based on your
              site, electrical infrastructure, utilization and expansion plans.
            </p>
            <ButtonLink href="/equipment" variant="outline-light" arrow className="mt-7">
              Explore Charging Equipment
            </ButtonLink>
          </Reveal>
        </div>

        {/* Desktop: the full lineup with category columns aligned beneath each unit. */}
        <Reveal className="mt-16 hidden lg:block">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={images.equipmentLineup.src}
              alt={images.equipmentLineup.alt}
              width={images.equipmentLineup.width}
              height={images.equipmentLineup.height}
              sizes="(min-width: 1344px) 1264px, 94vw"
              className="h-auto w-full"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-deep/80 to-transparent" />
            {equipmentCategories.map((c, i) => (
              <span
                key={c.slug}
                aria-hidden
                className="absolute bottom-5 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-grid-green/60 bg-deep/80 font-display text-xs font-bold text-grid-green backdrop-blur"
                style={{ left: `${c.lineupCenter}%` }}
              >
                0{i + 1}
              </span>
            ))}
          </div>
          <ul className="grid grid-cols-5 gap-4">
            {equipmentCategories.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/equipment/${c.slug}`}
                  className="group block h-full border-t-2 border-white/12 px-1 pt-6 pb-2 transition-colors hover:border-grid-green"
                >
                  <span className="font-display text-xs font-bold tracking-[0.16em] text-slate-300">0{i + 1}</span>
                  <h3 className="mt-2 flex items-center gap-2 font-display text-[0.95rem] font-extrabold tracking-[0.06em] uppercase">
                    <c.icon aria-hidden className="size-4 text-grid-green" strokeWidth={2} />
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.useCases}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors group-hover:text-grid-green">
                    Learn more
                    <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Mobile & tablet: swipeable cards, each showing its own unit cropped from the lineup. */}
        <div className="-mx-5 mt-12 sm:-mx-8 lg:hidden">
          <ul className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8">
            {equipmentCategories.map((c, i) => (
              <li key={c.slug} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[31%]">
                <Link
                  href={`/equipment/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-charcoal/60"
                >
                  <EquipmentUnit category={c} className="h-52 pt-4" sizes="200px" />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-display text-xs font-bold tracking-[0.16em] text-slate-300">0{i + 1}</span>
                    <h3 className="mt-1.5 font-display text-base font-extrabold tracking-[0.05em] uppercase">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{c.useCases}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-grid-green">
                      Learn more <ArrowRight aria-hidden className="size-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-5 text-xs text-slate sm:px-8" aria-hidden>
            Swipe to see all categories →
          </p>
        </div>
      </Container>
    </section>
  );
}
