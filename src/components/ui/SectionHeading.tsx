import { cn } from "./cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/** Eyebrow + heading + supporting copy, used by every section for a consistent hierarchy. */
export function SectionHeading({ eyebrow, title, copy, tone = "light", align = "left", as: Tag = "h2", id, className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
            dark ? "text-grid-green" : "text-grid-green-700",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "text-[2rem] leading-[1.08] font-extrabold sm:text-[2.5rem] lg:text-[2.875rem]",
          dark ? "text-white" : "text-deep",
        )}
      >
        {title}
      </Tag>
      {copy && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-slate-300" : "text-slate")}>{copy}</p>
      )}
    </div>
  );
}
