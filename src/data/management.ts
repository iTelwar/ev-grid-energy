import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ChartColumn,
  CircleDollarSign,
  FileChartColumn,
  Gauge,
  LayoutDashboard,
  Layers,
  MapPin,
  Settings,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

/**
 * Availability of an EV Grid Management capability.
 *
 * Statuses are intentionally left unset until confirmed by the business.
 * When `status` is undefined no badge is shown; set it per capability to
 * surface "Available", "Coming Soon" or "Planned" badges automatically.
 */
export type CapabilityStatus = "available" | "coming-soon" | "planned";

export const capabilityStatusLabel: Record<CapabilityStatus, string> = {
  available: "Available",
  "coming-soon": "Coming Soon",
  planned: "Planned",
};

export type Capability = {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status?: CapabilityStatus;
};

export const capabilities: Capability[] = [
  { key: "remote-monitoring", title: "Remote Monitoring", description: "Station status, availability and alerts across your network.", icon: Activity },
  { key: "station-management", title: "Station Management", description: "Configuration, access and settings by station or location.", icon: Gauge },
  { key: "energy-analytics", title: "Energy Analytics", description: "Energy delivered, utilization and demand trends.", icon: Zap },
  { key: "revenue-payments", title: "Revenue & Payments", description: "Pricing, session revenue and payment visibility.", icon: CircleDollarSign },
  { key: "maintenance", title: "Maintenance", description: "Service requests, issue tracking and maintenance history.", icon: Wrench },
  { key: "reporting", title: "Reporting", description: "Operational and usage reports for stakeholders.", icon: FileChartColumn },
  { key: "users-access", title: "Users & Access", description: "Driver groups, permissions and team access.", icon: Users },
  { key: "multi-site", title: "Multi-Site Management", description: "One view across locations, equipment and networks.", icon: Layers },
];

/** Planned application areas of the customer platform. */
export const platformModules: { key: string; title: string; icon: LucideIcon }[] = [
  { key: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { key: "stations", title: "Stations", icon: Gauge },
  { key: "locations", title: "Locations", icon: MapPin },
  { key: "sessions", title: "Sessions", icon: Activity },
  { key: "energy", title: "Energy", icon: Zap },
  { key: "revenue", title: "Revenue", icon: CircleDollarSign },
  { key: "maintenance", title: "Maintenance", icon: Wrench },
  { key: "users", title: "Users", icon: Users },
  { key: "reports", title: "Reports", icon: ChartColumn },
  { key: "settings", title: "Settings", icon: Settings },
];

export const managementDisclaimer =
  "Interfaces shown are illustrative of the EV Grid Management platform direction. Capabilities and availability vary by equipment, network and deployment.";
