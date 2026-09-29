import type { LucideIcon } from "lucide-react";
import { Building, Building2, Car, Hotel, MapPin, Truck } from "lucide-react";
import { images, type SiteImage } from "./images";
import type { EquipmentSlug } from "./equipment";
import type { ServiceSlug } from "./services";

export type SolutionSlug =
  | "commercial"
  | "fleet"
  | "multifamily"
  | "retail-hospitality"
  | "dealerships"
  | "public-charging";

export type Solution = {
  slug: SolutionSlug;
  /** Card / navigation title. */
  title: string;
  /** Compact label used in the hero application strip. */
  shortTitle: string;
  icon: LucideIcon;
  image: SiteImage;
  /** One-line summary for menus, metadata and search. */
  summary: string;
  headline: string;
  intro: string;
  considerations: { title: string; body: string }[];
  approach: string[];
  equipment: EquipmentSlug[];
  services: ServiceSlug[];
};

export const solutions: Solution[] = [
  {
    slug: "commercial",
    title: "Commercial Properties",
    shortTitle: "Commercial",
    icon: Building2,
    image: images.industries.commercial,
    summary: "Workplace and commercial property charging for tenants, employees and visitors.",
    headline: "Charging infrastructure that adds value to commercial properties.",
    intro:
      "Office campuses, business parks and mixed-use properties need charging that serves employees, tenants and visitors without disrupting operations. We plan around your electrical capacity, parking layout and long-term tenant needs.",
    considerations: [
      {
        title: "Long dwell times",
        body: "Employees and tenants typically park for several hours, which suits Level 2 charging across a larger number of spaces.",
      },
      {
        title: "Tenant and visitor access",
        body: "Access control, pricing and billing policies often differ between tenants, employees and the public.",
      },
      {
        title: "Phased growth",
        body: "Demand usually grows over time. Conduit, panel capacity and pad locations can be planned now to reduce the cost of future phases.",
      },
    ],
    approach: [
      "Assess existing electrical service and parking layout",
      "Size a first phase against current demand",
      "Design make-ready infrastructure for future expansion",
      "Configure access, pricing and reporting by user group",
    ],
    equipment: ["level-2", "dc-fast", "distributed"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
  {
    slug: "fleet",
    title: "Fleet & Logistics",
    shortTitle: "Fleet & Logistics",
    icon: Truck,
    image: images.industries.fleet,
    summary: "Depot and yard charging for light-, medium- and heavy-duty fleet operations.",
    headline: "Fleet charging planned around your routes, schedules and vehicles.",
    intro:
      "Fleet electrification succeeds when charging is sized to how vehicles actually operate. We work from duty cycles, dwell windows and depot constraints to design charging that keeps vehicles ready for service.",
    considerations: [
      {
        title: "Duty cycles and dwell windows",
        body: "Overnight depot charging, midday top-ups and opportunity charging each call for different power levels and dispenser counts.",
      },
      {
        title: "Utility capacity",
        body: "Larger fleets often require service upgrades or utility coordination. Early planning helps align construction timelines with vehicle delivery.",
      },
      {
        title: "Energy management",
        body: "Load management and scheduling can reduce peak demand and help control operating costs across a depot.",
      },
    ],
    approach: [
      "Model charging demand from vehicle and route data",
      "Evaluate electrical capacity and utility requirements",
      "Select power levels and architecture per depot",
      "Plan monitoring, scheduling and maintenance for uptime",
    ],
    equipment: ["dc-fast", "high-power", "distributed", "battery-charging"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
  {
    slug: "multifamily",
    title: "Multifamily",
    shortTitle: "Multifamily",
    icon: Building,
    image: images.industries.multifamily,
    summary: "Resident and guest charging for apartments, condominiums and communities.",
    headline: "Resident charging that scales with your community.",
    intro:
      "Apartment and condominium residents increasingly expect access to charging where they live. We help owners and developers plan shared and assigned charging that is fair to residents and manageable for property teams.",
    considerations: [
      {
        title: "Shared vs. assigned spaces",
        body: "Some properties dedicate chargers to residents, while others share them. The model affects equipment count, access control and billing.",
      },
      {
        title: "Cost recovery",
        body: "Session-based pricing, memberships or amenity fees can help recover energy and operating costs.",
      },
      {
        title: "New construction vs. retrofit",
        body: "New developments can build in capacity from the start; existing properties need careful evaluation of panels and parking structures.",
      },
    ],
    approach: [
      "Understand resident demand and parking arrangements",
      "Evaluate electrical rooms, panels and garage conditions",
      "Design shared or assigned charging with load management",
      "Set up resident access, pricing and property reporting",
    ],
    equipment: ["level-2", "distributed"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
  {
    slug: "retail-hospitality",
    title: "Retail & Hospitality",
    shortTitle: "Retail & Hospitality",
    icon: Hotel,
    image: images.industries.retailHospitality,
    summary: "Guest and customer charging for hotels, shopping centers and destinations.",
    headline: "Give guests and customers a reason to stay.",
    intro:
      "Hotels, restaurants and retail centers can use charging as an amenity for guests and customers. We match charging speed to typical visit length and design a guest experience that reflects your brand.",
    considerations: [
      {
        title: "Visit length",
        body: "Overnight hotel guests suit Level 2 charging; shorter retail visits may benefit from DC fast charging.",
      },
      {
        title: "Guest experience",
        body: "Location, lighting, signage and wayfinding all shape how guests experience charging on your property.",
      },
      {
        title: "Pricing and access",
        body: "Charging can be complimentary, paid or reserved for guests, depending on your goals.",
      },
    ],
    approach: [
      "Align charging speed with visit patterns",
      "Plan visible, accessible and well-lit charger locations",
      "Configure pricing and guest access policies",
      "Monitor usage to guide future expansion",
    ],
    equipment: ["level-2", "dc-fast"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
  {
    slug: "dealerships",
    title: "Dealerships",
    shortTitle: "Dealerships",
    icon: Car,
    image: images.industries.dealerships,
    summary: "Charging for inventory, service departments and customers at dealerships.",
    headline: "Charging infrastructure for the modern dealership.",
    intro:
      "Dealerships need charging for inventory preparation, service bays, demonstrations and customer convenience. We plan charging across lots and service areas to support day-to-day operations.",
    considerations: [
      {
        title: "Inventory and service readiness",
        body: "Vehicles need to be charged for delivery, test drives and service handover, often on tight schedules.",
      },
      {
        title: "Manufacturer programs",
        body: "Automotive manufacturers may have their own charging requirements for franchised dealers. We plan around the requirements you share with us.",
      },
      {
        title: "Customer-facing charging",
        body: "Visible charging near the showroom supports customer confidence and convenience.",
      },
    ],
    approach: [
      "Map charging needs across lot, service and showroom",
      "Review any manufacturer program requirements you provide",
      "Design a mix of Level 2 and DC fast charging",
      "Plan monitoring and service to keep chargers available",
    ],
    equipment: ["level-2", "dc-fast", "battery-charging"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
  {
    slug: "public-charging",
    title: "Public Charging",
    shortTitle: "Public Charging",
    icon: MapPin,
    image: images.industries.publicCharging,
    summary: "Publicly accessible charging for sites, corridors and community destinations.",
    headline: "Public charging built for reliability and utilization.",
    intro:
      "Public charging sites must be reliable, easy to use and positioned for demand. We help site hosts and operators evaluate locations, power requirements and operating models.",
    considerations: [
      {
        title: "Location and demand",
        body: "Traffic patterns, nearby amenities and visibility all influence utilization.",
      },
      {
        title: "Reliability",
        body: "Public drivers expect chargers to work. Monitoring and responsive maintenance are central to a good experience.",
      },
      {
        title: "Payments and accessibility",
        body: "Public sites need clear payment options and accessible layouts appropriate to local requirements.",
      },
    ],
    approach: [
      "Evaluate site location and utility capacity",
      "Select power levels for expected dwell times",
      "Design for accessibility, lighting and wayfinding",
      "Plan monitoring, payments and ongoing maintenance",
    ],
    equipment: ["dc-fast", "high-power", "distributed", "battery-charging"],
    services: ["site-assessment-design", "installation", "monitoring", "maintenance"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
