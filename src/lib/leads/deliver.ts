import "server-only";
import type { Lead, PipelineStage } from "./schema";

export type LeadRecord = {
  reference: string;
  receivedAt: string;
  stage: PipelineStage;
  source: "website";
  lead: Lead;
};

/**
 * Hands a validated lead to the configured destination.
 *
 * - LEAD_WEBHOOK_URL set: the record is POSTed as JSON (e.g. to a CRM,
 *   automation tool or the future EV Grid Operations system).
 * - Not set: the record is logged on the server only. Nothing is emailed
 *   or stored, so production must configure a destination.
 */
export async function deliverLead(lead: Lead): Promise<LeadRecord> {
  const record: LeadRecord = {
    reference: createReference(lead.type),
    receivedAt: new Date().toISOString(),
    stage: "lead",
    source: "website",
    lead,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Lead webhook responded with ${res.status}`);
  } else {
    console.info("[leads] No LEAD_WEBHOOK_URL configured; lead logged only:", JSON.stringify(record));
  }

  return record;
}

function createReference(type: Lead["type"]) {
  const prefix = type === "site-assessment" ? "SA" : "CT";
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `${prefix}-${date}-${rand}`;
}
