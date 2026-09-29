import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "./cn";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "text" | "text-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-grid-green text-deep hover:bg-[#3fd90a] shadow-[0_8px_24px_-12px_rgb(53_201_0/0.8)] hover:shadow-[0_12px_28px_-10px_rgb(53_201_0/0.7)]",
  dark: "bg-charcoal text-white hover:bg-deep",
  outline: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-deep",
  text: "min-h-0! px-0! text-charcoal hover:text-grid-green-700",
  "text-light": "min-h-0! px-0! text-white hover:text-grid-green",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-md font-display font-bold tracking-[-0.005em] transition-all duration-200 ease-out",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, variant = "primary", size = "md", arrow, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      )}
    </Link>
  );
}
