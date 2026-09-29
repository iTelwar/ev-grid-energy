/**
 * Central registry of the approved EV Grid Energy imagery.
 *
 * Paths match the files exactly as supplied under /public (including the
 * double ".png.png" extensions on two files). Dimensions are the intrinsic
 * pixel sizes so next/image can reserve space and avoid layout shift.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** A rectangle in the source image's pixel space, used for CSS-only crops. */
export type CropRegion = { x: number; y: number; w: number; h: number };

export const logo: SiteImage = {
  src: "/brand/ev-grid-energy-logo.png",
  width: 2172,
  height: 724,
  alt: "EV Grid Energy",
};

export const images = {
  hero: {
    src: "/images/hero/homepage-hero.png.png",
    width: 1983,
    height: 793,
    alt: "Row of DC fast charging stations beneath a lit canopy at a commercial office campus at dusk",
  },
  /** Full five-unit lineup (L2 pedestal, DC, high-power, power cabinet, battery cabinet). */
  equipmentLineup: {
    src: "/images/equipment/level-2-charger.png",
    width: 1983,
    height: 793,
    alt: "Lineup of commercial EV charging equipment, from a Level 2 pedestal through DC fast and high-power dispensers to a power cabinet and a battery storage cabinet",
  },
  management: {
    background: {
      src: "/images/management/management-background.png",
      width: 1670,
      height: 942,
      alt: "Fleet depot with trucks and vans at charging stations at dusk",
    },
  },
  /** Monitor + mobile dashboard concept. The file has a baked-in checkerboard, so it is always clipped. */
  dashboard: {
    src: "/images/services/monitoring.png",
    width: 1774,
    height: 887,
    alt: "Illustrative EV Grid Management interface on a desktop monitor and a mobile phone, showing station status, energy delivered and recent sessions",
  },
  industries: {
    commercial: {
      src: "/images/industries/commercial.png.png",
      width: 1670,
      height: 942,
      alt: "Charging stations along a parking row outside a glass office building",
    },
    fleet: {
      src: "/images/industries/fleet-logistics.png",
      width: 1672,
      height: 941,
      alt: "Charging dispensers beside a row of electric semi trucks at a logistics yard",
    },
    multifamily: {
      src: "/images/industries/multifamily.png",
      width: 1670,
      height: 942,
      alt: "Charging stations in front of a modern apartment building at dusk",
    },
    retailHospitality: {
      src: "/images/industries/retail-hospitality.png",
      width: 1672,
      height: 941,
      alt: "Charging stations outside a hotel entrance lined with palm trees",
    },
    dealerships: {
      src: "/images/industries/dealerships.png",
      width: 1671,
      height: 941,
      alt: "Row of charging stations in front of an automotive dealership showroom",
    },
    publicCharging: {
      src: "/images/industries/public-charging.png",
      width: 1671,
      height: 941,
      alt: "Public charging plaza with canopy-covered charging stations at sunset",
    },
  },
  services: {
    siteAssessment: {
      src: "/images/services/site-assessment.png",
      width: 1670,
      height: 942,
      alt: "Two engineers reviewing an electrical site plan beside commercial charging stations",
    },
    installation: {
      src: "/images/services/installation.png",
      width: 1671,
      height: 941,
      alt: "Technicians anchoring and connecting a charging dispenser on a new concrete pad",
    },
    maintenance: {
      src: "/images/services/maintenance.png",
      width: 1670,
      height: 941,
      alt: "Service technician testing the internal components of a charging station",
    },
  },
} as const satisfies Record<string, unknown>;

/**
 * Clip shapes for the dashboard image, expressed as percentages of the full
 * image so they scale responsively. They trace the monitor bezel (which sits
 * in slight perspective) and the phone body, excluding the checkerboard.
 */
export const dashboardClips = {
  monitor: "polygon(7.38% 2.03%, 78.07% 7.1%, 78.07% 88.39%, 7.38% 88.39%)",
  phone: "inset(22.32% 6.71% 3.38% 76.72% round 2.82% / 5.64%)",
  /** Screen-only crop of the monitor at 16:10, for cards. */
  monitorScreen: { x: 170, y: 78, w: 1120, h: 700 } satisfies CropRegion,
};
