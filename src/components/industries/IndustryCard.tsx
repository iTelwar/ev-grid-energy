import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Solution } from "@/data/solutions";

export function IndustryCard({ solution, sizes }: { solution: Solution; sizes: string }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-deep shadow-[var(--shadow-card)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/11]">
        <Image
          src={solution.image.src}
          alt={solution.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div>
          <solution.icon aria-hidden className="mb-3 size-6 text-grid-green" strokeWidth={1.6} />
          <h3 className="font-display text-xl font-extrabold text-white sm:text-[1.35rem]">{solution.title}</h3>
        </div>
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-grid-green group-hover:bg-grid-green group-hover:text-deep"
        >
          <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
