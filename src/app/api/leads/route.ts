import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/leads/deliver";
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

  try {
    const record = await deliverLead(result.data);
    return NextResponse.json({ ok: true, reference: record.reference });
  } catch (error) {
    console.error("[leads] Delivery failed", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't submit your request right now. Please try again shortly." },
      { status: 502 },
    );
  }
}
