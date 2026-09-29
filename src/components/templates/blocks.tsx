import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/components/ui/cn";

/** Numbered consideration / outcome cards. */
export function InfoCards({ items, columns = 3 }: { items: { title: string; body: string }[]; columns?: 3 | 4 }) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2", columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 80} className="rounded-xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
          <span className="font-display text-xs font-bold tracking-[0.16em] text-grid-green-700">0{i + 1}</span>
          <h3 className="mt-3 font-display text-lg font-extrabold text-deep">{item.title}</h3>
          <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate">{item.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** Check-marked list used for inclusions, approaches and ideal applications. */
export function CheckList({ items, tone = "light", columns = 1 }: { items: string[]; tone?: "light" | "dark"; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2 sm:gap-x-8")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark" ? "bg-grid-green/15 text-grid-green" : "bg-grid-green-50 text-grid-green-700",
            )}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className={cn("text-[0.97rem] leading-relaxed", tone === "dark" ? "text-slate-200" : "text-charcoal")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact list of internal links with arrows. */
export function LinkList({ links }: { links: { label: string; href: string; description?: string }[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-mist">
            <span>
              <span className="block font-display font-bold text-deep">{l.label}</span>
              {l.description && <span className="mt-0.5 block text-sm text-slate">{l.description}</span>}
            </span>
            <ArrowRight aria-hidden className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-grid-green-700" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Section({ tone = "white", className, children, labelledBy }: { tone?: "white" | "mist"; className?: string; children: React.ReactNode; labelledBy?: string }) {
  return (
    <section aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-28", tone === "mist" ? "bg-mist" : "bg-white", className)}>
      {children}
    </section>
  );
}
