import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { agentPolicyAccounting } from "@/lib/db/schema";
import { getAgent } from "@/lib/agents/registry";

export type PolicyAccountingState = {
  spent: number;
  windowStartedAt: string;
};

const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

function getState(agentId: string): PolicyAccountingState {
  const agent = getAgent(agentId);

  if (!agent) {
    return {
      spent: 0,
      windowStartedAt: new Date().toISOString(),
    };
  }

  const existing = db
    .select()
    .from(agentPolicyAccounting)
    .where(eq(agentPolicyAccounting.agentId, agentId))
    .get();

  const now = Date.now();

  if (
    !existing ||
    now - new Date(existing.windowStartedAt).getTime() >= DAILY_WINDOW_MS
  ) {
    const fresh = {
      agentId,
      spent: 0,
      windowStartedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.insert(agentPolicyAccounting)
      .values(fresh)
      .onConflictDoUpdate({
        target: agentPolicyAccounting.agentId,
        set: {
          spent: fresh.spent,
          windowStartedAt: fresh.windowStartedAt,
          updatedAt: fresh.updatedAt,
        },
      })
      .run();

    return {
      spent: fresh.spent,
      windowStartedAt: fresh.windowStartedAt,
    };
  }

  return {
    spent: existing.spent,
    windowStartedAt: existing.windowStartedAt,
  };
}

export function getPolicyAccounting(
  agentId: string,
): PolicyAccountingState {
  return getState(agentId);
}

export function recordPolicySpend(
  agentId: string,
  amount: number,
): PolicyAccountingState {
  if (!Number.isFinite(amount) || amount <= 0) {
    return getState(agentId);
  }

  const current = getState(agentId);
  const updatedAt = new Date().toISOString();

  db.update(agentPolicyAccounting)
    .set({
      spent: current.spent + amount,
      updatedAt,
    })
    .where(eq(agentPolicyAccounting.agentId, agentId))
    .run();

  return getState(agentId);
}
