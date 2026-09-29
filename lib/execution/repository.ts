import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { executions } from "@/lib/db/schema";
import type { ExecutionRecord, ExecutionStatus } from "@/lib/execution/types";

function toExecutionRecord(
  row: typeof executions.$inferSelect,
): ExecutionRecord {
  return {
    requestId: row.requestId,
    agentId: row.agentId,
    walletAddress: row.walletAddress,
    chainId: row.chainId,
    tokenAddress: row.tokenAddress,
    amount: row.amount,
    recipient: row.recipient,
    transactionHash: row.transactionHash ?? undefined,
    blockNumber: row.blockNumber ?? undefined,
    status: row.status as ExecutionStatus,
    createdAt: row.createdAt,
    confirmedAt: row.confirmedAt ?? undefined,
  };
}

export function createExecutionRecord(
  record: ExecutionRecord,
): ExecutionRecord {
  db.insert(executions)
    .values({
      requestId: record.requestId,
      agentId: record.agentId,
      walletAddress: record.walletAddress,
      chainId: record.chainId,
      tokenAddress: record.tokenAddress,
      amount: record.amount,
      recipient: record.recipient,
      transactionHash: record.transactionHash,
      blockNumber: record.blockNumber,
      status: record.status,
      createdAt: record.createdAt,
      confirmedAt: record.confirmedAt,
    })
    .run();

  return record;
}

function canTransition(
  current: ExecutionStatus,
  next: ExecutionStatus,
): boolean {
  if (current === next) {
    return true;
  }

  const transitions: Record<ExecutionStatus, ExecutionStatus[]> = {
    pending: ["submitted", "failed"],
    submitted: ["confirmed", "reverted", "failed"],
    confirmed: [],
    reverted: [],
    failed: [],
  };

  return transitions[current].includes(next);
}

export function updateExecutionRecord(
  requestId: string,
  updates: Partial<ExecutionRecord> & { status?: ExecutionStatus },
): ExecutionRecord | null {
  const existingRow = db
    .select()
    .from(executions)
    .where(eq(executions.requestId, requestId))
    .get();

  if (!existingRow) {
    return null;
  }

  const existing = toExecutionRecord(existingRow);

  if (
    updates.status &&
    !canTransition(existing.status, updates.status)
  ) {
    return null;
  }

  const next = {
    walletAddress: updates.walletAddress,
    chainId: updates.chainId,
    tokenAddress: updates.tokenAddress,
    amount: updates.amount,
    recipient: updates.recipient,
    transactionHash: updates.transactionHash,
    blockNumber: updates.blockNumber,
    status: updates.status,
    createdAt: updates.createdAt,
    confirmedAt: updates.confirmedAt,
  };

  const values = Object.fromEntries(
    Object.entries(next).filter(([, value]) => value !== undefined),
  );

  db.update(executions)
    .set(values)
    .where(eq(executions.requestId, requestId))
    .run();

  const updatedRow = db
    .select()
    .from(executions)
    .where(eq(executions.requestId, requestId))
    .get();

  return updatedRow ? toExecutionRecord(updatedRow) : null;
}

export function getExecutionRecord(
  requestId: string,
): ExecutionRecord | null {
  const row = db
    .select()
    .from(executions)
    .where(eq(executions.requestId, requestId))
    .get();

  return row ? toExecutionRecord(row) : null;
}

export function listExecutionRecords(): ExecutionRecord[] {
  return db
    .select()
    .from(executions)
    .all()
    .map(toExecutionRecord);
}
