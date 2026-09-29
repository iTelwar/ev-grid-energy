import Link from "next/link";
import { primaryCta } from "@/data/site";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="grid-pattern bg-deep py-28 text-white sm:py-36">
      <Container className="max-w-2xl text-center">
        <p className="eyebrow text-grid-green">404</p>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">We couldn&rsquo;t find that page.</h1>
        <p className="mt-5 text-lg text-slate-300">The page may have moved. Try one of these instead.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonClasses("primary", "lg")}>
            Back to Home
          </Link>
          <Link href={primaryCta.href} className={buttonClasses("outline-light", "lg")}>
            {primaryCta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
