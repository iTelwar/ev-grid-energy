/**
 * Planning guides. General, vendor-neutral educational content only -
 * no statistics, incentives or regulatory claims that would need sourcing.
 */
export type ResourceGuide = {
  slug: string;
  category: "Planning" | "Equipment" | "Operations";
  title: string;
  summary: string;
  points: string[];
  related?: { label: string; href: string };
};

export const guides: ResourceGuide[] = [
  {
    slug: "level-2-vs-dc-fast",
    category: "Equipment",
    title: "Level 2 or DC fast charging?",
    summary: "The right charging speed depends mostly on how long vehicles stay parked at your site.",
    points: [
      "Long dwell times (workplaces, apartments, hotels) generally suit Level 2.",
      "Short visits and high turnover generally call for DC fast charging.",
      "Many sites combine both to serve different users.",
    ],
    related: { label: "Compare equipment categories", href: "/equipment" },
  },
  {
    slug: "electrical-capacity",
    category: "Planning",
    title: "Understanding your electrical capacity",
    summary: "Available electrical service is often the biggest factor in project scope, cost and schedule.",
    points: [
      "A recent utility bill and panel information help us evaluate existing capacity.",
      "Load management can increase the number of chargers a service can support.",
      "Larger projects may require utility coordination and service upgrades.",
    ],
    related: { label: "Site Assessment & Design", href: "/services/site-assessment-design" },
  },
  {
    slug: "planning-for-growth",
    category: "Planning",
    title: "Planning for future expansion",
    summary: "Designing for tomorrow's demand can reduce the cost of adding chargers later.",
    points: [
      "Install conduit and pads for future phases during initial construction.",
      "Size switchgear and panels with expansion in mind where practical.",
      "Choose equipment and software that can scale across multiple sites.",
    ],
    related: { label: "Request a Site Assessment", href: "/site-assessment" },
  },
  {
    slug: "keeping-chargers-available",
    category: "Operations",
    title: "Keeping chargers available",
    summary: "Reliability depends on visibility, preventive care and a clear response process.",
    points: [
      "Monitor station status so faults are identified quickly.",
      "Schedule preventive maintenance rather than waiting for failures.",
      "Define who responds to issues and how quickly.",
    ],
    related: { label: "Maintenance & Service", href: "/services/maintenance" },
  },
  {
    slug: "fleet-charging-basics",
    category: "Planning",
    title: "Fleet charging fundamentals",
    summary: "Fleet charging is designed around duty cycles, dwell windows and depot constraints.",
    points: [
      "Start from vehicle types, daily mileage and time parked at the depot.",
      "Match charger power and count to the available charging window.",
      "Use scheduling and energy management to control peak demand.",
    ],
    related: { label: "Fleet & Logistics solutions", href: "/solutions/fleet" },
  },
  {
    slug: "what-to-prepare",
    category: "Planning",
    title: "What to prepare for a site assessment",
    summary: "A few documents help us understand your site before the first conversation.",
    points: [
      "A recent utility bill for the site.",
      "A site plan or aerial view showing parking areas.",
      "Photos of electrical rooms, panels and the proposed charging area.",
    ],
    related: { label: "Start your request", href: "/site-assessment" },
  },
];
