import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Customer Login",
  description: "Customer access to EV Grid Management.",
  robots: { index: false },
};

/**
 * Placeholder for the future authenticated EV Grid Management application.
 * No credential form is shown until real authentication exists.
 */
export default function LoginPage() {
  return (
    <section className="grid-pattern relative bg-deep py-24 text-white sm:py-32">
      <Container className="max-w-xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-xl border border-white/15 bg-white/5">
          <LayoutDashboard aria-hidden className="size-7 text-grid-green" strokeWidth={1.5} />
        </span>
        <h1 className="mt-8 text-4xl font-extrabold">EV Grid Management customer access</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Online customer sign-in is not yet available on this site. Platform access is arranged with your EV Grid
          Energy team during project onboarding.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact?topic=EV%20Grid%20Management" className={buttonClasses("primary", "lg")}>
            Contact Our Team
          </Link>
          <Link href="/management" className={buttonClasses("outline-light", "lg")}>
            About EV Grid Management
          </Link>
        </div>
      </Container>
    </section>
  );
}
