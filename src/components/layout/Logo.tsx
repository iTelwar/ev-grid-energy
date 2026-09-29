import Link from "next/link";
import { logo } from "@/data/images";
import { CroppedImage } from "@/components/ui/CroppedImage";
import { cn } from "@/components/ui/cn";

/** Trims the transparent padding around the supplied logo file; the mark itself is untouched. */
const logoMark = { x: 48, y: 150, w: 2073, h: 460 };

/**
 * The supplied logo is a single dark-on-transparent version, so it is only
 * placed on light surfaces (header, footer, light panels).
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("block shrink-0", className)} aria-label="EV Grid Energy, home">
      <CroppedImage image={logo} crop={logoMark} alt="EV Grid Energy" sizes="200px" priority={priority} />
    </Link>
  );
}
