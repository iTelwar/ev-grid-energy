import type { LucideIcon } from "lucide-react";
import { cn } from "./cn";

export function IconBadge({
  icon: Icon,
  tone = "light",
  className,
}: {
  icon: LucideIcon;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-lg border",
        tone === "dark" ? "border-white/12 bg-white/5 text-grid-green" : "border-line bg-mist text-grid-green-700",
        className,
      )}
    >
      <Icon className="size-[1.35rem]" strokeWidth={1.6} />
    </span>
  );
}
