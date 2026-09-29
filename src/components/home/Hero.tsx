import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";
import { primaryCta } from "@/data/site";
import { solutions } from "@/data/solutions";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex flex-col overflow-hidden bg-deep text-white">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className="-z-20 object-cover object-[64%_center] lg:object-[center_40%]"
      />
      {/* Readability overlays: vertical on small screens, directional on large screens. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(16_23_25/0.88)_0%,rgb(16_23_25/0.62)_45%,rgb(16_23_25/0.92)_100%)] lg:bg-[linear-gradient(90deg,rgb(11_17_19/0.96)_0%,rgb(11_17_19/0.82)_30%,rgb(11_17_19/0.35)_58%,rgb(11_17_19/0.05)_80%),linear-gradient(0deg,rgb(11_17_19/0.9)_0%,rgb(11_17_19/0)_32%)]"
      />

      <Container className="flex flex-1 items-center pt-16 pb-14 sm:pt-24 sm:pb-20 lg:min-h-[min(calc(100svh-4.5rem-7.5rem),640px)] lg:pt-24 lg:pb-24">
        <div className="max-w-[50rem]">
          <p className="eyebrow flex items-center gap-3 text-grid-green">
            <span aria-hidden className="h-px w-8 bg-current" />
            Powering a cleaner, stronger tomorrow
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.55rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[4.35rem]"
          >
            EV Charging Infrastructure
            <br className="hidden sm:block" /> Built for Business<span className="text-grid-green">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Design, deployment, management and support for commercial EV charging infrastructure.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/solutions" size="lg" variant="outline-light">
              Explore Solutions
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Application indicator */}
      <div className="border-t border-white/10 bg-deep-900/70 backdrop-blur-md">
        <Container>
          <h2 className="sr-only">Applications we serve</h2>
          {/* Negative margins hide the outer edge of each cell's top/left border,
              leaving clean internal dividers at 2, 3 and 6 columns. */}
          <div className="overflow-hidden">
          <ul className="-mt-px -ml-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {solutions.map((s) => (
              <li key={s.slug} className="border-t border-l border-white/10">
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group flex h-full min-h-[4.75rem] items-center gap-3 px-3 py-4 transition-colors hover:bg-white/5 sm:px-5 lg:justify-center lg:px-3"
                >
                  <s.icon aria-hidden strokeWidth={1.5} className="size-6 shrink-0 text-grid-green transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="font-display text-[0.82rem] leading-tight font-semibold text-white/85 group-hover:text-white sm:text-sm">
                    {s.shortTitle}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
