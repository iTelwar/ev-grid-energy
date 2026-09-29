import Image from "next/image";
import { images } from "@/data/images";
import { managementDisclaimer } from "@/data/management";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CapabilityList } from "@/components/management/CapabilityList";
import { DashboardVisual } from "@/components/management/DashboardVisual";

export function ManagementShowcase() {
  const bg = images.management.background;
  return (
    <section aria-labelledby="management-title" className="relative isolate overflow-hidden bg-deep py-20 text-white sm:py-24 lg:py-32">
      <Image src={bg.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(16_23_25/0.97)_0%,rgb(16_23_25/0.88)_45%,rgb(16_23_25/0.7)_100%),linear-gradient(0deg,rgb(16_23_25)_0%,transparent_40%)]"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="management-title"
              tone="dark"
              eyebrow="EV Grid Management"
              title={
                <>
                  Your Charging Network.
                  <br /> One Platform.
                </>
              }
              copy="Monitor, manage and optimize your charging infrastructure across all locations, equipment and networks from one centralized platform."
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/management" arrow>
                Learn About EV Grid Management
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:-mr-10 xl:-mr-16">
            <DashboardVisual sizes="(min-width: 1024px) 62vw, 100vw" />
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <CapabilityList />
          <p className="mt-5 text-xs leading-relaxed text-slate-300/80">{managementDisclaimer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
