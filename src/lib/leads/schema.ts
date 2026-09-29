/**
 * Lead schemas shared by the browser forms and the /api/leads route so
 * validation rules live in one place.
 *
 * The shapes are intentionally CRM-ready: every lead carries a pipeline
 * stage, and site assessments carry an `attachments` array that future
 * document uploads (utility bill, site plan, site photos) will populate.
 */

export const propertyTypes = [
  "Commercial / Office",
  "Fleet / Logistics Depot",
  "Multifamily",
  "Retail",
  "Hospitality",
  "Dealership",
  "Public Charging Site",
  "Municipal / Institutional",
  "Other",
] as const;

export const chargingTypes = ["Level 2", "DC Fast", "Both", "Not Sure"] as const;

export const timelines = [
  "Within 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "More than 12 months",
  "Exploring options",
] as const;

export const contactTopics = [
  "General inquiry",
  "New charging project",
  "EV Grid Management",
  "Service & maintenance",
  "Partnerships",
  "Other",
] as const;

/** Future business workflow; new leads always enter at "lead". */
export const pipelineStages = [
  "lead",
  "site-assessment",
  "design",
  "proposal",
  "contract",
  "installation",
  "commissioning",
  "active-customer",
] as const;
export type PipelineStage = (typeof pipelineStages)[number];

export type AttachmentKind = "utility-bill" | "site-plan" | "site-photos";
export type LeadAttachment = { kind: AttachmentKind; fileName: string; url: string };

export type SiteAssessmentLead = {
  type: "site-assessment";
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectAddress: string;
  propertyType: (typeof propertyTypes)[number];
  parkingSpaces?: number;
  estimatedChargers?: number;
  chargingType: (typeof chargingTypes)[number];
  fleetSize?: number;
  electricalService?: string;
  timeline?: (typeof timelines)[number];
  notes?: string;
  attachments: LeadAttachment[];
};

export type ContactLead = {
  type: "contact";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  topic: (typeof contactTopics)[number];
  message: string;
};

export type Lead = SiteAssessmentLead | ContactLead;
export type FieldErrors = Record<string, string>;
export type ValidationResult<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{7,25}$/;

type Raw = Record<string, unknown>;

function str(raw: Raw, key: string, max = 200) {
  const v = raw[key];
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function optionalInt(raw: Raw, key: string, errors: FieldErrors, label: string, max = 100000) {
  const v = str(raw, key, 12);
  if (!v) return undefined;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > max) {
    errors[key] = `${label} must be a whole number.`;
    return undefined;
  }
  return n;
}

function oneOf<T extends readonly string[]>(options: T, value: string): value is T[number] {
  return (options as readonly string[]).includes(value);
}

function commonContact(raw: Raw, errors: FieldErrors) {
  const name = str(raw, "name", 120);
  const email = str(raw, "email", 200);
  const phone = str(raw, "phone", 25);
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && !PHONE.test(phone)) errors.phone = "Please enter a valid phone number.";
  return { name, email, phone: phone || undefined };
}

export function validateSiteAssessment(raw: Raw): ValidationResult<SiteAssessmentLead> {
  const errors: FieldErrors = {};
  const contact = commonContact(raw, errors);
  const company = str(raw, "company", 160);
  const projectAddress = str(raw, "projectAddress", 300);
  const propertyType = str(raw, "propertyType");
  const chargingType = str(raw, "chargingType");
  const timeline = str(raw, "timeline");

  if (!company) errors.company = "Please enter your company or organization.";
  if (!projectAddress) errors.projectAddress = "Please enter the project address or location.";
  if (!oneOf(propertyTypes, propertyType)) errors.propertyType = "Please select a property type.";
  if (!oneOf(chargingTypes, chargingType)) errors.chargingType = "Please select a charging type.";
  if (timeline && !oneOf(timelines, timeline)) errors.timeline = "Please select a valid timeline.";

  const parkingSpaces = optionalInt(raw, "parkingSpaces", errors, "Parking spaces");
  const estimatedChargers = optionalInt(raw, "estimatedChargers", errors, "Estimated chargers");
  const fleetSize = optionalInt(raw, "fleetSize", errors, "Fleet size");

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      type: "site-assessment",
      ...contact,
      company,
      projectAddress,
      propertyType: propertyType as SiteAssessmentLead["propertyType"],
      parkingSpaces,
      estimatedChargers,
      chargingType: chargingType as SiteAssessmentLead["chargingType"],
      fleetSize,
      electricalService: str(raw, "electricalService", 200) || undefined,
      timeline: (timeline || undefined) as SiteAssessmentLead["timeline"],
      notes: str(raw, "notes", 4000) || undefined,
      attachments: [],
    },
  };
}

export function validateContact(raw: Raw): ValidationResult<ContactLead> {
  const errors: FieldErrors = {};
  const contact = commonContact(raw, errors);
  const topic = str(raw, "topic");
  const message = str(raw, "message", 4000);
  if (!oneOf(contactTopics, topic)) errors.topic = "Please choose a topic.";
  if (!message) errors.message = "Please include a short message.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      type: "contact",
      ...contact,
      company: str(raw, "company", 160) || undefined,
      topic: topic as ContactLead["topic"],
      message,
    },
  };
}

export function validateLead(raw: Raw): ValidationResult<Lead> {
  if (raw.type === "site-assessment") return validateSiteAssessment(raw);
  if (raw.type === "contact") return validateContact(raw);
  return { ok: false, errors: { form: "Unknown form type." } };
}
