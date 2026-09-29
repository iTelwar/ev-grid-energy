import { equipmentCategories } from "./equipment";
import { services } from "./services";
import { solutions } from "./solutions";

export type NavLink = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  /** When present, the item renders as a dropdown on desktop and an accordion on mobile. */
  children?: NavLink[];
  /** Overview link shown at the foot of a dropdown. */
  overview?: NavLink;
};

export const mainNav: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    children: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}`, description: s.summary })),
    overview: { label: "All solutions", href: "/solutions" },
  },
  { label: "Industries", href: "/industries" },
  {
    label: "Equipment",
    href: "/equipment",
    children: equipmentCategories.map((e) => ({ label: e.title, href: `/equipment/${e.slug}`, description: e.summary })),
    overview: { label: "All charging equipment", href: "/equipment" },
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.description })),
    overview: { label: "All services", href: "/services" },
  },
  {
    label: "EV Grid Management",
    href: "/management",
    children: [
      { label: "Platform Overview", href: "/management", description: "One platform for your charging network." },
      { label: "Capabilities", href: "/management#capabilities", description: "Monitoring, energy, revenue, maintenance and more." },
      { label: "Customer Login", href: "/login", description: "Access for EV Grid Management customers." },
    ],
  },
  { label: "Resources", href: "/resources" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About EV Grid Energy", href: "/company", description: "Who we are and how we work." },
      { label: "Contact", href: "/contact", description: "Get in touch with our team." },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Commercial EV Charging", href: "/solutions/commercial" },
      { label: "Fleet Charging", href: "/solutions/fleet" },
      { label: "Multifamily Charging", href: "/solutions/multifamily" },
      { label: "Workplace Charging", href: "/solutions/commercial" },
      { label: "Public Charging", href: "/solutions/public-charging" },
      { label: "DC Fast Charging", href: "/equipment/dc-fast" },
    ],
  },
  {
    title: "Equipment",
    links: equipmentCategories.map((e) => ({ label: e.title, href: `/equipment/${e.slug}` })),
  },
  {
    title: "Services",
    links: [
      { label: "Site Assessment", href: "/site-assessment" },
      { label: "Design & Engineering", href: "/services/site-assessment-design" },
      { label: "Installation", href: "/services/installation" },
      { label: "Commissioning", href: "/services/installation#includes" },
      { label: "Monitoring", href: "/services/monitoring" },
      { label: "Maintenance", href: "/services/maintenance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Contact", href: "/contact" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "EV Grid Management", href: "/management" },
      { label: "Customer Login", href: "/login" },
    ],
  },
];
