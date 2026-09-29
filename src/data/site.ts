export const siteConfig = {
  name: "EV Grid Energy",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://evgridenergy.com",
  title: "EV Grid Energy | Commercial EV Charging Infrastructure",
  description:
    "EV charging infrastructure solutions for commercial properties, fleets, multifamily developments, dealerships and public charging applications.",
  tagline: "Powering a cleaner, stronger tomorrow",
  /**
   * Contact details are intentionally empty until confirmed.
   * Components only render these when a value is present.
   */
  contact: {
    email: undefined as string | undefined,
    phone: undefined as string | undefined,
    address: undefined as string | undefined,
  },
};

export const primaryCta = { label: "Request a Site Assessment", href: "/site-assessment" };
export const quoteCta = { label: "Get a Quote", href: "/site-assessment" };
