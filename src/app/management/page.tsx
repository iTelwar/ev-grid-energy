import Link from "next/link";
import { ArrowRight, Building2, Cpu, LayoutDashboard } from "lucide-react";
import { images } from "@/data/images";
import { managementDisclaimer, platformModules } from "@/data/management";
import { pageMetadata } from "@/lib/metadata";
import { FinalCta } from "@/components/home/FinalCta";
import { CapabilityList } from "@/components/management/CapabilityList";
import { DashboardVisual } from "@/components/management/DashboardVisual";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/blocks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "EV Grid Management",
  description:
    "EV Grid Management: one platform direction for monitoring, managing and optimizing charging infrastructure across locations, equipment and networks.",
  path: "/management",
  image: images.dashboard,
});

/** The layered platform model: customers see one platform regardless of the equipment underneath. */
const layers = [
  {
    icon: Building2,
    title: "Your sites",
    body: "Locations, parking areas, drivers and stakeholders across one or many properties.",
  },
  {
    icon: LayoutDashboard,
    title: "EV Grid Management",
    body: "A single customer view of stations, sessions, energy, revenue, maintenance and reporting.",
  },
  {
    icon: Cpu,
    title: "Equipment & networks",
    body: "Charging hardware and network services from the manufacturers and partners selected for each project.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "EV Grid Management" }]}
        eyebrow="EV Grid Management"
        title={
          <>
            Your Charging Network.
            <br /> One Platform.
          </>
        }
        copy="Monitor, manage and optimize your charging infrastructure across all locations, equipment and networks from one centralized platform."
        aside={<DashboardVisual priority sizes="(min-width: 1024px) 58vw, 100vw" />}
        actions={
          <ButtonLink href="/contact?topic=EV%20Grid%20Management" size="lg" arrow>
            Request a Platform Briefing
          </ButtonLink>
        }
      />

      <div className="border-b border-line bg-white">
        <Container className="py-8">
          <h2 className="eyebrow text-slate">Platform areas</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {platformModules.map((m) => (
              <li key={m.key} className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-sm font-semibold text-charcoal">
                <m.icon aria-hidden className="size-4 text-grid-green-700" strokeWidth={1.8} />
                {m.title}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Section labelledBy="capabilities-title" className="scroll-mt-20">
        <Container>
          <div id="capabilities" className="scroll-mt-24">
            <SectionHeading
              id="capabilities-title"
              eyebrow="Capabilities"
              title="Visibility and control across your charging network."
              copy="EV Grid Management brings the information you need to operate charging infrastructure into one place."
            />
          </div>
          <div className="mt-12">
            <CapabilityList tone="light" detailed />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-slate">{managementDisclaimer}</p>
        </Container>
      </Section>

      <Section tone="mist" labelledBy="architecture-title">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="architecture-title"
              eyebrow="Platform approach"
              title="One view, regardless of the hardware."
              copy="EV Grid Management is designed as the customer layer above the equipment and networks at your sites, so your experience stays consistent as your program grows and as technology choices evolve."
            />
          </div>
          <ol className="relative space-y-4 lg:col-span-7">
            {layers.map((layer, i) => (
              <Reveal as="li" key={layer.title} delay={i * 100}>
                <div
                  className={
                    i === 1
                      ? "flex gap-5 rounded-xl border border-deep bg-deep p-6 text-white shadow-[var(--shadow-card-hover)]"
                      : "flex gap-5 rounded-xl border border-line bg-white p-6"
                  }
                >
                  <layer.icon aria-hidden className={i === 1 ? "size-7 shrink-0 text-grid-green" : "size-7 shrink-0 text-grid-green-700"} strokeWidth={1.5} />
                  <div>
                    <h3 className={i === 1 ? "font-display text-lg font-extrabold" : "font-display text-lg font-extrabold text-deep"}>{layer.title}</h3>
                    <p className={i === 1 ? "mt-1.5 text-sm leading-relaxed text-slate-300" : "mt-1.5 text-sm leading-relaxed text-slate"}>{layer.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="access-title">
        <Container>
          <div className="flex flex-col gap-8 rounded-2xl border border-line bg-white p-8 shadow-[var(--shadow-card)] sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="access-title" className="font-display text-2xl font-extrabold text-deep sm:text-3xl">
                Already an EV Grid Energy customer?
              </h2>
              <p className="mt-3 leading-relaxed text-slate">
                Platform access is set up during project onboarding. Contact your EV Grid Energy team for access.
              </p>
            </div>
            <Link href="/login" className="inline-flex shrink-0 items-center gap-2 font-display font-bold text-charcoal hover:text-grid-green-700">
              Customer Login <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
