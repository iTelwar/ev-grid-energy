import Image from "next/image";
import type { CropRegion, SiteImage } from "@/data/images";
import { cn } from "./cn";

type Props = {
  image: SiteImage;
  crop: CropRegion;
  /** `sizes` for the rendered crop box; scaled internally to the full image width. */
  sizes: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

/**
 * Shows a rectangular region of an approved image without editing the file.
 * The box takes the crop's aspect ratio; the full image is scaled and offset
 * inside it with percentage units so the crop stays exact at every width.
 */
export function CroppedImage({ image, crop, sizes, alt, className, imageClassName, priority }: Props) {
  const scale = image.width / crop.w;
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: `${crop.w} / ${crop.h}` }}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        sizes={scaleSizes(sizes, scale)}
        priority={priority}
        className={cn("absolute h-auto max-w-none", imageClassName)}
        style={{
          width: `${scale * 100}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
        }}
      />
    </div>
  );
}

/** Multiply every vw / px length in a `sizes` string so the browser picks a sharp enough source. */
function scaleSizes(sizes: string, scale: number) {
  return sizes.replace(/(\d+(?:\.\d+)?)(vw|px)/g, (_, n: string, unit: string) => `${Math.round(Number(n) * scale)}${unit}`);
}
