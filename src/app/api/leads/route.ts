import { after, NextResponse } from "next/server";
import { logLeadEvent, notifyLead, saveLead } from "@/lib/leads/deliver";
import { validateLead } from "@/lib/leads/schema";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, reference: null });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  // The lead is only acknowledged once it has been stored.
  let record;
  try {
    record = await saveLead(result.data);
  } catch (error) {
    logLeadEvent("lead.store_failed", {
      type: result.data.type,
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { ok: false, message: "We couldn't submit your request right now. Please try again shortly." },
      { status: 502 },
    );
  }

  // Notification runs after the response; its failure never loses the stored lead.
  after(() => notifyLead(record));

  return NextResponse.json({ ok: true, reference: record.reference });
}
