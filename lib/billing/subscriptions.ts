import { randomUUID } from "crypto";
import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { billingCustomers, billingSubscriptions } from "@/lib/db/schema";

import { BILLING_PLANS } from "./plans";
import type { BillingPlanId, BillingSubscription } from "./types";

function toBillingSubscription(
  row: typeof billingSubscriptions.$inferSelect,
): BillingSubscription {
  return {
    subscriptionId: row.subscriptionId,
    customerId: row.customerId,
    planId: row.planId as BillingPlanId,
    status: row.status as BillingSubscription["status"],
    startedAt: row.startedAt,
    currentPeriodEndsAt: row.currentPeriodEndsAt ?? undefined,
  };
}

function customerBelongsToDeveloper(
  customerId: string,
  developerId: string,
): boolean {
  const customer = db
    .select()
    .from(billingCustomers)
    .where(eq(billingCustomers.customerId, customerId))
    .get();

  return customer?.developerId === developerId;
}

export type CreateSubscriptionResult =
  | { subscription: BillingSubscription }
  | {
      error:
        | "INVALID_CUSTOMER"
        | "ACTIVE_SUBSCRIPTION_EXISTS"
        | "PENDING_SUBSCRIPTION_EXISTS";
    };

export function createSubscription(
  developerId: string,
  input: {
    customerId: string;
    planId: BillingPlanId;
  },
): CreateSubscriptionResult {
  const plan = BILLING_PLANS[input.planId];

  if (!plan || !customerBelongsToDeveloper(input.customerId, developerId)) {
    return { error: "INVALID_CUSTOMER" };
  }

  const existing = db
    .select()
    .from(billingSubscriptions)
    .where(
      and(
        eq(billingSubscriptions.customerId, input.customerId),
        inArray(billingSubscriptions.status, ["active", "trialing"]),
      ),
    )
    .get();

  const pending = db
    .select()
    .from(billingSubscriptions)
    .where(
      and(
        eq(billingSubscriptions.customerId, input.customerId),
        eq(billingSubscriptions.status, "pending"),
      ),
    )
    .get();

  if (existing) {
    return { error: "ACTIVE_SUBSCRIPTION_EXISTS" };
  }

  if (pending) {
    return { error: "PENDING_SUBSCRIPTION_EXISTS" };
  }

  const subscription: BillingSubscription = {
    subscriptionId: `sub_${randomUUID()}`,
    customerId: input.customerId,
    planId: input.planId,
    status: input.planId === "free" ? "active" : "pending",
    startedAt: new Date().toISOString(),
  };

  db.insert(billingSubscriptions)
    .values({
      subscriptionId: subscription.subscriptionId,
      customerId: subscription.customerId,
      planId: subscription.planId,
      status: subscription.status,
      startedAt: subscription.startedAt,
      currentPeriodEndsAt: null,
    })
    .run();

  return { subscription };
}

export function getSubscription(
  subscriptionId: string,
  developerId?: string,
): BillingSubscription | null {
  const row = db
    .select()
    .from(billingSubscriptions)
    .where(eq(billingSubscriptions.subscriptionId, subscriptionId))
    .get();

  if (!row) {
    return null;
  }

  if (developerId && !customerBelongsToDeveloper(row.customerId, developerId)) {
    return null;
  }

  return toBillingSubscription(row);
}

export function listSubscriptions(
  developerId?: string,
): BillingSubscription[] {
  const rows = db.select().from(billingSubscriptions).all();

  return rows
    .filter(
      (row) =>
        !developerId || customerBelongsToDeveloper(row.customerId, developerId),
    )
    .map(toBillingSubscription);
}

export function activateSubscription(
  subscriptionId: string,
): BillingSubscription | null {
  const existing = getSubscription(subscriptionId);

  if (!existing || existing.status !== "pending") {
    return null;
  }

  const activate = db.transaction((tx) => {
    tx.update(billingSubscriptions)
      .set({
        status: "canceled",
      })
      .where(
        and(
          eq(billingSubscriptions.customerId, existing.customerId),
          inArray(billingSubscriptions.status, ["active", "trialing"]),
        ),
      )
      .run();

    tx.update(billingSubscriptions)
      .set({
        status: "active",
      })
      .where(eq(billingSubscriptions.subscriptionId, subscriptionId))
      .run();
  });

  return {
    ...existing,
    status: "active",
  };
}

export function cancelSubscription(
  subscriptionId: string,
  developerId?: string,
): BillingSubscription | null {
  const existing = getSubscription(subscriptionId, developerId);

  if (!existing) {
    return null;
  }

  const canceled: BillingSubscription = {
    ...existing,
    status: "canceled",
  };

  db.update(billingSubscriptions)
    .set({
      status: "canceled",
    })
    .where(eq(billingSubscriptions.subscriptionId, subscriptionId))
    .run();

  return canceled;
}
