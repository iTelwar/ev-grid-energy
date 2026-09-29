import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { primaryCta, siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/**
 * Light footer: the supplied logo is dark-on-transparent, so the footer
 * uses the light gray surface rather than inventing a reversed logo.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, phone, address } = siteConfig.contact;

  return (
    <footer className="border-t border-line bg-mist text-charcoal">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] lg:gap-16">
          <div className="max-w-sm">
            <Logo className="w-[190px]" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-slate">
              Commercial EV charging infrastructure: planning, engineering, deployment, management and lifecycle
              support.
            </p>
            <ButtonLink href={primaryCta.href} arrow className="mt-7">
              {primaryCta.label}
            </ButtonLink>
            {(email || phone || address) && (
              <address className="mt-8 space-y-1 text-sm text-slate not-italic">
                {email && (
                  <a href={`mailto:${email}`} className="block hover:text-deep">
                    {email}
                  </a>
                )}
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="block hover:text-deep">
                    {phone}
                  </a>
                )}
                {address && <span className="block">{address}</span>}
              </address>
            )}
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="eyebrow text-deep">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[0.92rem] text-slate transition-colors hover:text-deep">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-slate/80">Charging infrastructure built for business.</p>
        </Container>
      </div>
    </footer>
  );
}
