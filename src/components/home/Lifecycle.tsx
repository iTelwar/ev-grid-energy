import { ChevronRight } from "lucide-react";
import { lifecycle } from "@/data/lifecycle";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Lifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="lifecycle-title"
            eyebrow="The EV Grid Energy difference"
            title="From Site Planning to Long-Term Support."
            copy="A complete EV charging infrastructure solution, designed around your business, your site and your future."
            align="center"
          />
        </Reveal>

        <ol className="mt-14 grid gap-0 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {lifecycle.map((stage, i) => {
            const last = i === lifecycle.length - 1;
            return (
              <Reveal
                as="li"
                key={stage.key}
                delay={i * 90}
                className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
              >
                {/* Mobile / tablet: vertical connector */}
                {!last && (
                  <span aria-hidden className="absolute top-16 bottom-0 left-8 w-px bg-gradient-to-b from-grid-green/50 to-line lg:hidden" />
                )}
                {/* Desktop: horizontal connector with arrow */}
                {!last && (
                  <span aria-hidden className="absolute top-8 right-[calc(-50%+1.25rem)] left-[calc(50%+2.75rem)] hidden -translate-y-1/2 items-center lg:flex">
                    <span className="h-px flex-1 bg-gradient-to-r from-grid-green/60 to-slate-200" />
                    <ChevronRight className="-ml-1.5 size-4 text-slate-300" />
                  </span>
                )}

                <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border border-line bg-white text-grid-green-700 shadow-[0_6px_20px_-10px_rgb(16_23_25/0.35)]">
                  <stage.icon aria-hidden className="size-7" strokeWidth={1.5} />
                </span>

                <div className="pt-2 lg:pt-7">
                  <p className="font-display text-xs font-bold tracking-[0.16em] text-slate-300">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-extrabold tracking-[0.08em] text-deep uppercase">{stage.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-snug text-slate lg:mx-auto lg:max-w-[12rem]">{stage.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
