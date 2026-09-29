import type { LucideIcon } from "lucide-react";
import { BatteryCharging, Network, Plug, PlugZap, Zap } from "lucide-react";
import type { CropRegion } from "./images";
import type { SolutionSlug } from "./solutions";

export type EquipmentSlug = "level-2" | "dc-fast" | "high-power" | "distributed" | "battery-charging";

/**
 * Equipment is presented by CATEGORY, not by manufacturer or model.
 * Specific products are sourced from EV Grid Energy's manufacturer and
 * technology partners per project; `partnerIds` lets offerings be linked
 * to partners later without changing the public architecture.
 */
export type EquipmentCategory = {
  slug: EquipmentSlug;
  title: string;
  icon: LucideIcon;
  /** Short positioning line shown on the homepage. */
  useCases: string;
  summary: string;
  intro: string;
  idealFor: string[];
  considerations: { title: string; body: string }[];
  solutions: SolutionSlug[];
  /** Region of the equipment lineup image that shows this category's unit. */
  crop: CropRegion;
  /** Horizontal centre of this unit within the lineup image, as a percentage. */
  lineupCenter: number;
  partnerIds?: string[];
};

export const equipmentCategories: EquipmentCategory[] = [
  {
    slug: "level-2",
    title: "Level 2 Charging",
    icon: Plug,
    useCases: "Workplaces, apartments, hotels and long-dwell locations.",
    summary: "AC charging for locations where vehicles stay parked for several hours.",
    intro:
      "Level 2 charging is the foundation of most workplace, multifamily and hospitality deployments. It is well suited to locations where vehicles remain parked for extended periods and allows more parking spaces to be served within a given electrical capacity.",
    idealFor: ["Workplaces and office campuses", "Apartments and condominiums", "Hotels and overnight stays", "Fleet vehicles parked overnight"],
    considerations: [
      { title: "Port count vs. power", body: "Serving more spaces at moderate power is often more effective than fewer high-power ports at long-dwell sites." },
      { title: "Load management", body: "Power sharing across chargers can increase the number of ports supported by existing electrical service." },
      { title: "Mounting options", body: "Pedestal and wall-mounted configurations suit different parking layouts and structures." },
    ],
    solutions: ["commercial", "multifamily", "retail-hospitality", "dealerships"],
    crop: { x: 40, y: 150, w: 320, h: 520 },
    lineupCenter: 9.6,
  },
  {
    slug: "dc-fast",
    title: "DC Fast Charging",
    icon: Zap,
    useCases: "Commercial sites, dealerships, fleets and public charging.",
    summary: "DC charging for shorter visits, higher turnover and fleet operations.",
    intro:
      "DC fast charging delivers significantly more power than Level 2 and is used where vehicles need meaningful range in a shorter stop. It typically requires greater electrical capacity and careful site planning.",
    idealFor: ["Retail and convenience locations", "Dealership service and delivery", "Fleet depots with short dwell windows", "Public charging sites"],
    considerations: [
      { title: "Electrical service", body: "DC fast chargers often require three-phase service and may trigger a utility service upgrade." },
      { title: "Demand charges", body: "Utility tariff structure affects operating costs; energy management can help manage peak demand." },
      { title: "Uptime expectations", body: "Higher-utilization sites benefit from proactive monitoring and a clear maintenance plan." },
    ],
    solutions: ["commercial", "fleet", "retail-hospitality", "dealerships", "public-charging"],
    crop: { x: 370, y: 110, w: 370, h: 560 },
    lineupCenter: 28.2,
  },
  {
    slug: "high-power",
    title: "High-Power Charging",
    icon: PlugZap,
    useCases: "Large fleets, heavy-duty applications and high-utilization sites.",
    summary: "The highest power levels for heavy-duty vehicles and high-throughput sites.",
    intro:
      "High-power charging serves applications where vehicles have large batteries or very limited time to charge, such as heavy-duty fleets and high-traffic public sites. These projects typically involve significant utility coordination and engineering.",
    idealFor: ["Heavy-duty and medium-duty fleets", "High-traffic public charging", "Logistics hubs and distribution centers", "Transit and shuttle operations"],
    considerations: [
      { title: "Utility coordination", body: "High-power sites frequently require new service, transformers or utility-side upgrades with longer lead times." },
      { title: "Site layout", body: "Pull-through access, cable reach and vehicle size all shape the site design." },
      { title: "Thermal and power architecture", body: "Equipment selection considers cooling, power distribution and future expansion." },
    ],
    solutions: ["fleet", "public-charging"],
    crop: { x: 730, y: 70, w: 450, h: 600 },
    lineupCenter: 48.1,
  },
  {
    slug: "distributed",
    title: "Distributed Charging",
    icon: Network,
    useCases: "Centralized power architecture supporting multiple dispensers.",
    summary: "Centralized power cabinets feeding multiple dispensers across a site.",
    intro:
      "Distributed architectures separate power conversion from the dispensers drivers use. A central power cabinet feeds multiple dispensers and can allocate power dynamically, which can simplify installation at the parking space and support flexible expansion.",
    idealFor: ["Fleet depots with many parking positions", "Sites planning phased expansion", "Locations with limited space at the parking stall", "Mixed-power deployments"],
    considerations: [
      { title: "Dynamic power allocation", body: "Power can be shared across dispensers according to vehicle demand." },
      { title: "Footprint", body: "Compact dispensers at the stall, with larger equipment located centrally." },
      { title: "Scalability", body: "Additional dispensers or power modules can be planned into the initial design." },
    ],
    solutions: ["commercial", "fleet", "multifamily", "public-charging"],
    crop: { x: 1160, y: 140, w: 390, h: 520 },
    lineupCenter: 68.1,
  },
  {
    slug: "battery-charging",
    title: "Battery + Charging",
    icon: BatteryCharging,
    useCases: "Storage-integrated charging and sites with electrical constraints.",
    summary: "Energy storage paired with charging for constrained or demand-sensitive sites.",
    intro:
      "Battery-integrated charging pairs energy storage with chargers. Storage can help deliver higher charging power where grid capacity is limited, reduce peak demand, or support resilience goals, depending on site conditions.",
    idealFor: ["Sites with limited grid capacity", "Locations with high demand charges", "Projects waiting on utility upgrades", "Resilience-focused deployments"],
    considerations: [
      { title: "Grid constraints", body: "Storage can supplement available grid power during charging sessions." },
      { title: "Operating costs", body: "Charging storage off-peak and discharging during peaks can reduce demand-related costs, depending on tariff." },
      { title: "Site suitability", body: "Space, permitting and fire code requirements are evaluated during design." },
    ],
    solutions: ["fleet", "dealerships", "public-charging"],
    crop: { x: 1540, y: 120, w: 420, h: 520 },
    lineupCenter: 87.4,
  },
];

export function getEquipment(slug: string) {
  return equipmentCategories.find((e) => e.slug === slug);
}
