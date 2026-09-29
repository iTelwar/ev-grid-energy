import "server-only";
import { randomUUID } from "node:crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import type { Lead, PipelineStage } from "./schema";

/**
 * - pending:        stored, notification not attempted yet
 * - published:      handed to SNS (delivery to subscribers is SNS's job)
 * - failed:         SNS publish failed; the lead is still stored
 * - not-configured: no topic configured (local development only)
 */
export type NotificationStatus = "pending" | "published" | "failed" | "not-configured";

export type LeadRecord = {
  leadId: string;
  reference: string;
  type: Lead["type"];
  status: "new";
  stage: PipelineStage;
  source: "website";
  createdAt: string;
  updatedAt: string;
  notificationStatus: NotificationStatus;
  notificationAttempts: number;
  lead: Lead;
};

const tableName = process.env.LEADS_TABLE_NAME;
const topicArn = process.env.LEAD_NOTIFICATIONS_TOPIC_ARN;

let documentClient: DynamoDBDocumentClient | undefined;
let snsClient: SNSClient | undefined;

const db = () =>
  (documentClient ??= DynamoDBDocumentClient.from(new DynamoDBClient({}), {
    marshallOptions: { removeUndefinedValues: true },
  }));
const sns = () => (snsClient ??= new SNSClient({}));

/**
 * Operational log line. Only identifiers and status - never the customer's
 * details, which live in DynamoDB. One JSON object per line so CloudWatch
 * metric filters can match on `event`.
 */
export function logLeadEvent(event: string, fields: Record<string, string | number | undefined>) {
  console.log(JSON.stringify({ source: "leads", event, ...fields }));
}

/**
 * Persists a validated lead. DynamoDB is the system of record: this must
 * succeed before the visitor is told their request was received.
 *
 * Without LEADS_TABLE_NAME the lead is not stored anywhere. That is only
 * allowed in development; in production it throws so the API returns an
 * error instead of silently dropping the lead.
 */
export async function saveLead(lead: Lead): Promise<LeadRecord> {
  const now = new Date().toISOString();
  const record: LeadRecord = {
    leadId: randomUUID(),
    reference: createReference(lead.type),
    type: lead.type,
    status: "new",
    stage: "lead",
    source: "website",
    createdAt: now,
    updatedAt: now,
    notificationStatus: topicArn ? "pending" : "not-configured",
    notificationAttempts: 0,
    lead,
  };

  if (tableName) {
    await db().send(
      new PutCommand({
        TableName: tableName,
        Item: record,
        ConditionExpression: "attribute_not_exists(leadId)",
      }),
    );
  } else if (process.env.NODE_ENV === "production") {
    throw new Error("LEADS_TABLE_NAME is not configured");
  }

  logLeadEvent("lead.stored", { reference: record.reference, type: record.type, persisted: tableName ? 1 : 0 });
  return record;
}

/**
 * Sends the sales notification for a stored lead and records the outcome.
 * Never throws: a notification failure must not affect the stored lead.
 */
export async function notifyLead(record: LeadRecord) {
  if (!topicArn) return;

  let status: NotificationStatus;
  let messageId: string | undefined;
  try {
    const result = await sns().send(
      new PublishCommand({
        TopicArn: topicArn,
        Subject: notificationSubject(record),
        Message: notificationBody(record),
      }),
    );
    status = "published";
    messageId = result.MessageId;
  } catch (error) {
    status = "failed";
    logLeadEvent("lead.notification_failed", {
      reference: record.reference,
      type: record.type,
      notificationStatus: status,
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }

  try {
    if (tableName) {
      const now = new Date().toISOString();
      await db().send(
        new UpdateCommand({
          TableName: tableName,
          Key: { leadId: record.leadId },
          ConditionExpression: "attribute_exists(leadId)",
          UpdateExpression:
            "SET notificationStatus = :status, updatedAt = :now, notificationAttempts = notificationAttempts + :one" +
            (messageId ? ", notifiedAt = :now, notificationMessageId = :messageId" : ""),
          ExpressionAttributeValues: {
            ":status": status,
            ":now": now,
            ":one": 1,
            ...(messageId ? { ":messageId": messageId } : {}),
          },
        }),
      );
    }
  } catch (error) {
    logLeadEvent("lead.notification_status_update_failed", {
      reference: record.reference,
      notificationStatus: status,
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }

  if (status === "published") {
    logLeadEvent("lead.notification_published", { reference: record.reference, type: record.type, notificationStatus: status });
  }
}

function createReference(type: Lead["type"]) {
  const prefix = type === "site-assessment" ? "SA" : "CT";
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = randomUUID().slice(0, 6).toUpperCase();
  return `${prefix}-${date}-${rand}`;
}

/** SNS subjects must be ASCII, single-line and under 100 characters. */
function notificationSubject(record: LeadRecord) {
  const kind = record.type === "site-assessment" ? "site assessment request" : "contact inquiry";
  return `New ${kind} ${record.reference}`;
}

function notificationBody({ lead, reference, createdAt, leadId }: LeadRecord) {
  const rows: [string, string | number | undefined][] =
    lead.type === "site-assessment"
      ? [
          ["Name", lead.name],
          ["Company", lead.company],
          ["Email", lead.email],
          ["Phone", lead.phone],
          ["Project address", lead.projectAddress],
          ["Property type", lead.propertyType],
          ["Charging type", lead.chargingType],
          ["Parking spaces", lead.parkingSpaces],
          ["Estimated chargers", lead.estimatedChargers],
          ["Fleet size", lead.fleetSize],
          ["Electrical service", lead.electricalService],
          ["Timeline", lead.timeline],
          ["Notes", lead.notes],
        ]
      : [
          ["Name", lead.name],
          ["Company", lead.company],
          ["Email", lead.email],
          ["Phone", lead.phone],
          ["Topic", lead.topic],
          ["Message", lead.message],
        ];

  const heading = lead.type === "site-assessment" ? "New site assessment request" : "New contact inquiry";
  return [
    `${heading} from evgridenergy.com`,
    "",
    `Reference: ${reference}`,
    `Received: ${createdAt}`,
    "",
    ...rows.filter(([, v]) => v !== undefined && v !== "").map(([k, v]) => `${k}: ${v}`),
    "",
    `Lead ID (DynamoDB ev-grid-energy-leads): ${leadId}`,
  ].join("\n");
}
