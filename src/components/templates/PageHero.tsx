import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { cn } from "@/components/ui/cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  breadcrumbs: Crumb[];
  image?: SiteImage;
  /** CSS object-position for the background image. */
  imagePosition?: string;
  actions?: React.ReactNode;
  /** Optional right-hand visual (e.g. the dashboard). */
  aside?: React.ReactNode;
  compact?: boolean;
};

/** Dark interior-page hero shared by every secondary page. */
export function PageHero({ eyebrow, title, copy, breadcrumbs, image, imagePosition = "center", actions, aside, compact }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(16_23_25/0.82),rgb(16_23_25/0.9))] md:bg-[linear-gradient(90deg,rgb(11_17_19/0.95)_0%,rgb(11_17_19/0.8)_40%,rgb(11_17_19/0.3)_100%)]"
          />
        </>
      ) : (
        <>
          <div aria-hidden className="grid-pattern absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black,transparent)]" />
          <div aria-hidden className="absolute -top-48 right-0 -z-10 h-[28rem] w-[40rem] rounded-full bg-grid-green/10 blur-3xl" />
        </>
      )}
      <Container className={cn(compact ? "py-14 sm:py-16" : "py-16 sm:py-20 lg:py-28")}>
        <Breadcrumbs items={breadcrumbs} />
        <div className={cn("mt-8 grid items-center gap-12", aside ? "lg:grid-cols-12" : undefined)}>
          <div className={cn("max-w-3xl", aside ? "lg:col-span-5" : undefined)}>
            {eyebrow && (
              <p className="eyebrow flex items-center gap-3 text-grid-green">
                <span aria-hidden className="h-px w-8 bg-current" />
                {eyebrow}
              </p>
            )}
            <h1 className={cn("mt-5 leading-[1.04] font-extrabold tracking-[-0.03em]", compact ? "text-4xl sm:text-5xl" : "text-[2.4rem] sm:text-5xl lg:text-[3.6rem]")}>
              {title}
            </h1>
            {copy && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{copy}</p>}
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-7">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
