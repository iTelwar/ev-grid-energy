import { capabilities, capabilityStatusLabel } from "@/data/management";
import { cn } from "@/components/ui/cn";

/** Platform capability grid. A status badge renders only when a capability's status is set. */
export function CapabilityList({ tone = "dark", detailed = false }: { tone?: "light" | "dark"; detailed?: boolean }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-px overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-4", dark ? "bg-white/10" : "bg-line")}>
      {capabilities.map((c) => (
        <li key={c.key} className={cn("flex gap-4 p-5 sm:p-6", dark ? "bg-deep" : "bg-white")}>
          <c.icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", dark ? "text-grid-green" : "text-grid-green-700")} strokeWidth={1.7} />
          <div>
            <h3 className={cn("flex flex-wrap items-center gap-2 font-display text-[0.95rem] font-bold", dark ? "text-white" : "text-deep")}>
              {c.title}
              {c.status && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.68rem] font-bold tracking-wide uppercase",
                    c.status === "available" ? "bg-grid-green/15 text-grid-green-700" : "bg-slate/15 text-slate",
                    dark && c.status === "available" && "text-grid-green",
                    dark && c.status !== "available" && "text-slate-300",
                  )}
                >
                  {capabilityStatusLabel[c.status]}
                </span>
              )}
            </h3>
            {detailed && (
              <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-slate-300" : "text-slate")}>{c.description}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
