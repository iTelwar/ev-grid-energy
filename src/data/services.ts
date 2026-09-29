import type { LucideIcon } from "lucide-react";
import { Activity, ClipboardList, HardHat, Wrench } from "lucide-react";
import { dashboardClips, images, type CropRegion, type SiteImage } from "./images";

export type ServiceSlug = "site-assessment-design" | "installation" | "monitoring" | "maintenance";

export type Service = {
  slug: ServiceSlug;
  title: string;
  icon: LucideIcon;
  description: string;
  image: SiteImage;
  /** Optional crop when the source image needs framing (e.g. the dashboard). */
  crop?: CropRegion;
  intro: string;
  includes: string[];
  outcomes: { title: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "site-assessment-design",
    title: "Site Assessment & Design",
    icon: ClipboardList,
    description: "Electrical capacity, engineering, permitting and infrastructure planning.",
    image: images.services.siteAssessment,
    intro:
      "Every successful charging project starts with a clear understanding of the site. We evaluate your electrical infrastructure, parking layout and goals, then develop a design that balances today's needs with future growth.",
    includes: [
      "Site walk and parking layout review",
      "Electrical capacity and load analysis",
      "Charger count, power level and placement planning",
      "Engineering drawings and specifications",
      "Permitting and utility coordination support",
      "Phasing and expansion planning",
    ],
    outcomes: [
      { title: "Right-sized design", body: "Charging sized to your utilization and electrical capacity." },
      { title: "Clear scope", body: "A defined scope and plan to support an accurate proposal." },
      { title: "Room to grow", body: "Make-ready infrastructure planned for future phases." },
    ],
  },
  {
    slug: "installation",
    title: "Installation & Construction",
    icon: HardHat,
    description: "Turnkey installation, construction management and commissioning.",
    image: images.services.installation,
    intro:
      "We manage the delivery of your charging project from mobilization through commissioning, coordinating trades, equipment and inspections so your site is ready to operate.",
    includes: [
      "Construction management and scheduling",
      "Trenching, conduit, pads and electrical work",
      "Equipment procurement and delivery coordination",
      "Charger installation and network configuration",
      "Inspections and commissioning",
      "Handover and site documentation",
    ],
    outcomes: [
      { title: "Single point of contact", body: "One team coordinating the project end to end." },
      { title: "Commissioned and tested", body: "Chargers verified and configured before handover." },
      { title: "Documented", body: "As-built information to support operations and service." },
    ],
  },
  {
    slug: "monitoring",
    title: "Monitoring & Operations",
    icon: Activity,
    description: "Charging network visibility, station management and operational reporting.",
    image: images.dashboard,
    crop: dashboardClips.monitorScreen,
    intro:
      "Once chargers are live, visibility matters. We help you understand station status, usage and energy so issues are identified early and decisions are based on data.",
    includes: [
      "Station status and availability visibility",
      "Session and energy reporting",
      "Access and pricing configuration",
      "Alerting for faults and offline stations",
      "Multi-site operational reporting",
      "Onboarding to EV Grid Management",
    ],
    outcomes: [
      { title: "Visibility", body: "Know how your chargers are performing across locations." },
      { title: "Faster response", body: "Identify issues before they become extended downtime." },
      { title: "Better decisions", body: "Utilization data to guide pricing and expansion." },
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Service",
    icon: Wrench,
    description: "Preventive maintenance, diagnostics, repair and lifecycle support.",
    image: images.services.maintenance,
    intro:
      "Charging infrastructure is a long-term asset. Our service programs combine preventive maintenance, remote diagnostics and on-site repair to help keep chargers available for drivers.",
    includes: [
      "Preventive maintenance programs",
      "Remote diagnostics and troubleshooting",
      "On-site repair coordination",
      "Parts and warranty claim coordination",
      "Firmware and configuration management",
      "Lifecycle and upgrade planning",
    ],
    outcomes: [
      { title: "Availability", body: "Proactive care to keep chargers in service." },
      { title: "Accountability", body: "A clear process for issues, from diagnosis to resolution." },
      { title: "Longevity", body: "Planning for upgrades and lifecycle replacement." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
