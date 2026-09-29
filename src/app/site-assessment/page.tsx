import { images } from "@/data/images";
import { customerJourney } from "@/data/lifecycle";
import { guides } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { SiteAssessmentForm } from "@/components/forms/SiteAssessmentForm";
import { PageHero } from "@/components/templates/PageHero";
import { CheckList, Section } from "@/components/templates/blocks";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata({
  title: "Request a Site Assessment",
  description:
    "Request a site assessment for commercial EV charging. Share your site and goals and receive a customized solution recommendation.",
  path: "/site-assessment",
  image: images.services.siteAssessment,
});

const prepare = guides.find((g) => g.slug === "what-to-prepare");

export default function SiteAssessmentPage() {
  return (
    <>
      <PageHero
        compact
        breadcrumbs={[{ label: "Request a Site Assessment" }]}
        eyebrow="Get started"
        title="Request a Site Assessment."
        copy="Tell us about your site and goals. We'll review the details and follow up to plan your assessment and a customized solution recommendation."
        image={images.services.siteAssessment}
        imagePosition="30% center"
      />
      <Section tone="mist" className="lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">Site assessment request form</h2>
            <SiteAssessmentForm />
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl bg-deep p-8 text-white">
              <h2 className="font-display text-lg font-extrabold">What happens next</h2>
              <ol className="relative mt-6 space-y-5">
                {customerJourney.map((step, i) => (
                  <li key={step.key} className="relative flex gap-4">
                    {i < customerJourney.length - 1 && (
                      <span aria-hidden className="absolute top-8 bottom-[-1.25rem] left-[0.9rem] w-px bg-white/15" />
                    )}
                    <span
                      className={
                        i === 0
                          ? "relative flex size-7 shrink-0 items-center justify-center rounded-full bg-grid-green font-display text-xs font-bold text-deep"
                          : "relative flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-deep font-display text-xs font-bold text-slate-300"
                      }
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold">{step.title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-slate-300">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {prepare && (
              <div className="rounded-2xl border border-line bg-white p-8">
                <h2 className="font-display text-lg font-extrabold text-deep">Helpful to have ready</h2>
                <p className="mt-2 text-sm text-slate">Not required to submit, but useful for the assessment.</p>
                <div className="mt-5">
                  <CheckList items={prepare.points} />
                </div>
              </div>
            )}
          </aside>
        </Container>
      </Section>
    </>
  );
}
