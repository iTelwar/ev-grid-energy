import type { EquipmentCategory } from "@/data/equipment";
import { images } from "@/data/images";
import { CroppedImage } from "@/components/ui/CroppedImage";
import { cn } from "@/components/ui/cn";

/**
 * A single unit cut from the supplied equipment lineup image, framed on a
 * backdrop that matches the photograph so each category has its own visual.
 */
export function EquipmentUnit({
  category,
  className,
  sizes = "240px",
  priority,
}: {
  category: EquipmentCategory;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-center overflow-hidden bg-[radial-gradient(120%_80%_at_50%_100%,#26313a_0%,#0b151c_55%,#06111a_100%)]",
        className,
      )}
    >
      <CroppedImage
        image={images.equipmentLineup}
        crop={category.crop}
        sizes={sizes}
        priority={priority}
        alt={`${category.title} equipment example`}
        className="h-full max-w-full"
      />
    </div>
  );
}
