import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { primaryCta } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/templates/PageHero";
import { Section } from "@/components/templates/blocks";
import { Container } from "@/components/ui/Container";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact EV Grid Energy about commercial EV charging infrastructure, EV Grid Management, service or partnerships.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ topic?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { topic } = await searchParams;

  return (
    <>
      <PageHero
        compact
        breadcrumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Get in touch."
        copy="Questions about charging infrastructure, EV Grid Management or service? Send us a message and our team will respond."
      />
      <Section tone="mist">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">Contact form</h2>
            <ContactForm defaultTopic={typeof topic === "string" ? topic : undefined} />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-deep p-8 text-white lg:sticky lg:top-28">
              <ClipboardList aria-hidden className="size-8 text-grid-green" strokeWidth={1.5} />
              <h2 className="mt-5 font-display text-xl font-extrabold">Planning a charging project?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                A site assessment request captures the details we need to recommend the right solution for your site.
              </p>
              <Link
                href={primaryCta.href}
                className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-grid-green hover:text-white"
              >
                {primaryCta.label} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
