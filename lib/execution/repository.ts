// Development-only in-memory repository. Replace with durable storage before production execution history.

import type { ExecutionRecord, ExecutionStatus } from "@/lib/execution/types";

const records = new Map<string, ExecutionRecord>();

export function createExecutionRecord(
  record: ExecutionRecord
): ExecutionRecord {
  records.set(record.requestId, record);
  return record;
}

function canTransition(
  current: ExecutionStatus,
  next: ExecutionStatus
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
  updates: Partial<ExecutionRecord> & { status?: ExecutionStatus }
): ExecutionRecord | null {
  const existing = records.get(requestId);

  if (!existing) {
    return null;
  }

  if (
    updates.status &&
    !canTransition(existing.status, updates.status)
  ) {
    return null;
  }

  const updated = {
    ...existing,
    ...updates,
  };

  records.set(requestId, updated);
  return updated;
}

export function getExecutionRecord(
  requestId: string
): ExecutionRecord | null {
  return records.get(requestId) ?? null;
}

export function listExecutionRecords(): ExecutionRecord[] {
  return Array.from(records.values());
}
