import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { billingCustomers } from "@/lib/db/schema";

export type BillingCustomer = {
  customerId: string;
  developerId?: string;
  name?: string;
  createdAt: string;
};

function toBillingCustomer(
  row: typeof billingCustomers.$inferSelect,
): BillingCustomer {
  return {
    customerId: row.customerId,
    developerId: row.developerId ?? undefined,
    name: row.name ?? undefined,
    createdAt: row.createdAt,
  };
}

export function createBillingCustomer(
  developerId: string,
  input: Pick<BillingCustomer, "name">,
): BillingCustomer {
  const customer: BillingCustomer = {
    customerId: `cus_${randomUUID()}`,
    developerId,
    name: input.name,
    createdAt: new Date().toISOString(),
  };

  db.insert(billingCustomers)
    .values({
      customerId: customer.customerId,
      developerId: customer.developerId,
      name: customer.name ?? null,
      createdAt: customer.createdAt,
    })
    .run();

  return customer;
}

export function getOrCreateBillingCustomer(
  developerId: string,
  name?: string,
): BillingCustomer {
  const existing = db
    .select()
    .from(billingCustomers)
    .where(eq(billingCustomers.developerId, developerId))
    .get();

  if (existing) {
    return toBillingCustomer(existing);
  }

  return createBillingCustomer(developerId, {
    name: name?.trim() || "Apraxus Developer",
  });
}

export function getBillingCustomer(
  customerId: string,
  developerId?: string,
): BillingCustomer | null {
  const row = db
    .select()
    .from(billingCustomers)
    .where(eq(billingCustomers.customerId, customerId))
    .get();

  if (!row) {
    return null;
  }

  if (developerId && row.developerId !== developerId) {
    return null;
  }

  return toBillingCustomer(row);
}

export function listBillingCustomers(
  developerId?: string,
): BillingCustomer[] {
  return db
    .select()
    .from(billingCustomers)
    .all()
    .filter((row) => !developerId || row.developerId === developerId)
    .map(toBillingCustomer);
}
