import { primaryCta } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title?: React.ReactNode;
  copy?: string;
};

export function FinalCta({
  title = (
    <>
      Let&rsquo;s Build Your
      <br /> Charging Infrastructure.
    </>
  ),
  copy = "Get started with a customized site assessment and solution recommendation.",
}: Props) {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-deep py-20 text-white sm:py-28 lg:py-32">
      <div aria-hidden className="grid-pattern absolute inset-0 -z-10 [mask-image:radial-gradient(70%_80%_at_50%_50%,black,transparent)]" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 h-[26rem] w-[48rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-grid-green/12 blur-[110px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-grid-green/50 to-transparent" />

      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-grid-green">
            <span aria-hidden className="h-px w-8 bg-current" />
            Get started
            <span aria-hidden className="h-px w-8 bg-current" />
          </p>
          <h2 id="final-cta-title" className="mt-6 text-[2.2rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300">{copy}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-light">
              Contact Us
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
