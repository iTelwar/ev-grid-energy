import { solutions } from "@/data/solutions";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "./IndustryCard";

export function IndustryGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {solutions.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 3) * 90}>
          <IndustryCard solution={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw" />
        </Reveal>
      ))}
    </ul>
  );
}
