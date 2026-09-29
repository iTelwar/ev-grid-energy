import type { LucideIcon } from "lucide-react";
import { Activity, ClipboardList, HardHat, PencilRuler, Wrench } from "lucide-react";

export type LifecycleStage = { key: string; title: string; detail: string; icon: LucideIcon };

export const lifecycle: LifecycleStage[] = [
  { key: "plan", title: "Plan", detail: "Site assessment & requirements", icon: ClipboardList },
  { key: "design", title: "Design", detail: "Engineering & infrastructure", icon: PencilRuler },
  { key: "deploy", title: "Deploy", detail: "Installation & commissioning", icon: HardHat },
  { key: "manage", title: "Manage", detail: "Monitoring & operations", icon: Activity },
  { key: "support", title: "Support", detail: "Maintenance & lifecycle service", icon: Wrench },
];

/**
 * The customer journey, from first enquiry to an active managed site.
 * Mirrors the intended internal workflow so a future CRM / operations
 * system can adopt the same stage keys.
 */
export const customerJourney = [
  { key: "lead", title: "Request", detail: "You share your site and goals." },
  { key: "assessment", title: "Site Assessment", detail: "We review capacity, layout and requirements." },
  { key: "design", title: "Design", detail: "We develop a charging and infrastructure design." },
  { key: "proposal", title: "Proposal", detail: "You receive a scoped solution recommendation." },
  { key: "installation", title: "Installation", detail: "We build, install and coordinate inspections." },
  { key: "commissioning", title: "Commissioning", detail: "Chargers are tested, configured and handed over." },
  { key: "active", title: "Ongoing Management", detail: "Monitoring, service and lifecycle support." },
] as const;
