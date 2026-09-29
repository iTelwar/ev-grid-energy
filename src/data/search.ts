import { equipmentCategories } from "./equipment";
import { guides } from "./resources";
import { services } from "./services";
import { solutions } from "./solutions";

export type SearchEntry = { title: string; href: string; section: string; text: string };

/** Static index of public pages for the header search dialog. */
export const searchIndex: SearchEntry[] = [
  { title: "Request a Site Assessment", href: "/site-assessment", section: "Get Started", text: "quote site assessment request proposal get started" },
  { title: "Contact", href: "/contact", section: "Company", text: "contact get in touch question" },
  { title: "Solutions", href: "/solutions", section: "Solutions", text: "solutions applications overview" },
  ...solutions.map((s) => ({ title: s.title, href: `/solutions/${s.slug}`, section: "Solutions", text: `${s.summary} ${s.shortTitle}` })),
  { title: "Industries", href: "/industries", section: "Industries", text: "industries applications use cases" },
  { title: "Charging Equipment", href: "/equipment", section: "Equipment", text: "chargers equipment hardware" },
  ...equipmentCategories.map((e) => ({ title: e.title, href: `/equipment/${e.slug}`, section: "Equipment", text: `${e.summary} ${e.useCases}` })),
  { title: "Services", href: "/services", section: "Services", text: "services lifecycle support" },
  ...services.map((s) => ({ title: s.title, href: `/services/${s.slug}`, section: "Services", text: `${s.description} ${s.includes.join(" ")}` })),
  { title: "EV Grid Management", href: "/management", section: "Platform", text: "platform software dashboard monitoring management network" },
  { title: "Customer Login", href: "/login", section: "Platform", text: "login sign in customer portal" },
  { title: "Resources", href: "/resources", section: "Resources", text: "guides resources planning" },
  ...guides.map((g) => ({ title: g.title, href: `/resources#${g.slug}`, section: "Resources", text: g.summary })),
  { title: "About EV Grid Energy", href: "/company", section: "Company", text: "about company approach partners" },
];
