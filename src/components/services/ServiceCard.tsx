import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { CroppedImage } from "@/components/ui/CroppedImage";

export function ServiceCard({ service, sizes }: { service: Service; sizes: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-deep">
        {service.crop ? (
          <CroppedImage
            image={service.image}
            crop={service.crop}
            sizes={sizes}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <service.icon aria-hidden className="size-6 text-grid-green-700" strokeWidth={1.6} />
        <h3 className="mt-4 font-display text-[1.05rem] font-extrabold tracking-[0.04em] text-deep uppercase lg:min-h-[2.6em]">{service.title}</h3>
        <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-slate">{service.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-charcoal transition-colors group-hover:text-grid-green-700">
          Learn more
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
