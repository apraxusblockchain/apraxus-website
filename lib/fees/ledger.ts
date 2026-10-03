import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { platformFeeRecords } from "@/lib/db/schema";
import { calculatePlatformFee } from "./index";

export type PlatformFeeRecord = {
  feeId: string;
  executionId: string;
  agentId: string;
  chainId: number;
  assetId: string;
  assetKind: "native" | "token";
  tokenAddress?: string;
  feeAmount: string;
  basisPoints: number;
  status: "pending" | "settled";
  createdAt: string;
};

export function createPlatformFeeRecord(input: {
  executionId: string;
  agentId: string;
  chainId: number;
  assetId: string;
  assetKind: "native" | "token";
  tokenAddress?: string;
  amount: bigint;
  basisPoints: number;
}): PlatformFeeRecord {
  const existing = db
    .select()
    .from(platformFeeRecords)
    .where(eq(platformFeeRecords.executionId, input.executionId))
    .get();

  if (existing) {
    return {
      feeId: existing.feeId,
      executionId: existing.executionId,
      agentId: existing.agentId,
      chainId: existing.chainId,
      assetId: existing.assetId,
      assetKind: existing.assetKind as "native" | "token",
      tokenAddress: existing.tokenAddress ?? undefined,
      feeAmount: existing.feeAmount,
      basisPoints: existing.basisPoints,
      status: existing.status as "pending" | "settled",
      createdAt: existing.createdAt,
    };
  }

  const fee = calculatePlatformFee({
    amount: input.amount,
    basisPoints: input.basisPoints,
  });

  const record: PlatformFeeRecord = {
    feeId: `pfee_${randomUUID()}`,
    executionId: input.executionId,
    agentId: input.agentId,
    chainId: input.chainId,
    assetId: input.assetId,
    assetKind: input.assetKind,
    tokenAddress: input.tokenAddress,
    feeAmount: fee.fee.toString(),
    basisPoints: input.basisPoints,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.insert(platformFeeRecords)
    .values({
      feeId: record.feeId,
      executionId: record.executionId,
      agentId: record.agentId,
      chainId: record.chainId,
      assetId: record.assetId,
      assetKind: record.assetKind,
      tokenAddress: record.tokenAddress ?? null,
      feeAmount: record.feeAmount,
      basisPoints: record.basisPoints,
      status: record.status,
      createdAt: record.createdAt,
    })
    .run();

  return record;
}
