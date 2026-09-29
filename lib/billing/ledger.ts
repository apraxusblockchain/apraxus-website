import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { billingCustomers, billingRecords } from "@/lib/db/schema";

import type {
  BillingFeeSource,
  BillingRecord,
  BillingRecordStatus,
} from "./types";

function toBillingRecord(
  row: typeof billingRecords.$inferSelect
): BillingRecord {
  return {
    billingId: row.billingId,
    customerId: row.customerId,
    source: row.source as BillingFeeSource,
    status: row.status as BillingRecordStatus,
    amount: row.amount,
    currency: row.currency,
    referenceId: row.referenceId ?? undefined,
    createdAt: row.createdAt,
  };
}

export function createBillingRecord(input: {
  customerId: string;
  source: BillingFeeSource;
  amount: number;
  currency: string;
  referenceId?: string;
  status?: BillingRecordStatus;
}): BillingRecord {
  if (input.referenceId) {
    const existing = db
      .select()
      .from(billingRecords)
      .where(eq(billingRecords.referenceId, input.referenceId))
      .get();

    if (existing) {
      return toBillingRecord(existing);
    }
  }

  const record: BillingRecord = {
    billingId: `bill_${randomUUID()}`,
    customerId: input.customerId,
    source: input.source,
    status: input.status ?? "pending",
    amount: input.amount,
    currency: input.currency,
    referenceId: input.referenceId,
    createdAt: new Date().toISOString(),
  };

  db.insert(billingRecords)
    .values({
      billingId: record.billingId,
      customerId: record.customerId,
      source: record.source,
      status: record.status,
      amount: record.amount,
      currency: record.currency,
      referenceId: record.referenceId ?? null,
      createdAt: record.createdAt,
    })
    .run();

  return record;
}

export function getBillingRecord(
  billingId: string,
  developerId?: string
): BillingRecord | null {
  const row = db
    .select()
    .from(billingRecords)
    .where(eq(billingRecords.billingId, billingId))
    .get();

  if (!row) {
    return null;
  }

  if (developerId) {
    const customer = db
      .select()
      .from(billingCustomers)
      .where(eq(billingCustomers.customerId, row.customerId))
      .get();

    if (customer?.developerId !== developerId) {
      return null;
    }
  }

  return toBillingRecord(row);
}

export function listBillingRecords(developerId?: string): BillingRecord[] {
  const rows = db
    .select()
    .from(billingRecords)
    .all();

  if (!developerId) {
    return rows.map(toBillingRecord);
  }

  const ownedCustomerIds = new Set(
    db
      .select({ customerId: billingCustomers.customerId })
      .from(billingCustomers)
      .where(eq(billingCustomers.developerId, developerId))
      .all()
      .map((row) => row.customerId)
  );

  return rows
    .filter((row) => ownedCustomerIds.has(row.customerId))
    .map(toBillingRecord);
}

export function updateBillingRecordStatus(
  billingId: string,
  status: BillingRecordStatus
): BillingRecord | null {
  const existing = getBillingRecord(billingId);

  if (!existing) {
    return null;
  }

  db.update(billingRecords)
    .set({ status })
    .where(eq(billingRecords.billingId, billingId))
    .run();

  return {
    ...existing,
    status,
  };
}
