import Image from "next/image";
import { dashboardClips, images } from "@/data/images";
import { cn } from "@/components/ui/cn";

/**
 * Presents the supplied monitor + phone dashboard image.
 *
 * The source file has a checkerboard baked into its background, so the image
 * is rendered twice and clipped to the monitor and phone shapes. The file on
 * disk is not modified; the browser downloads it once.
 */
export function DashboardVisual({ className, sizes, priority }: { className?: string; sizes: string; priority?: boolean }) {
  const { src, width, height, alt } = images.dashboard;
  return (
    <figure className={cn("relative", className)}>
      <div aria-hidden className="absolute inset-[8%_10%] rounded-full bg-grid-green/15 blur-3xl" />
      <div
        className="relative [filter:drop-shadow(0_30px_40px_rgb(0_0_0/0.45))]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain"
          style={{ clipPath: dashboardClips.monitor }}
        />
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain"
          style={{ clipPath: dashboardClips.phone }}
        />
      </div>
      <figcaption className="sr-only">Illustrative interface</figcaption>
    </figure>
  );
}
