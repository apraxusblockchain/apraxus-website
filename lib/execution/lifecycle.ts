import type { PaymentReceipt } from "@/lib/payment/receipt";
import { updateExecutionRecord } from "@/lib/execution/repository";

export function markExecutionSubmitted(
  requestId: string,
  transactionHash: string
) {
  return updateExecutionRecord(requestId, {
    status: "submitted",
    transactionHash,
  });
}

export function markExecutionSettled(
  requestId: string,
  receipt: PaymentReceipt
) {
  return updateExecutionRecord(requestId, {
    status: receipt.status === "success" ? "confirmed" : "reverted",
    transactionHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber.toString(),
    ...(receipt.status === "success"
      ? { confirmedAt: new Date().toISOString() }
      : {}),
  });
}

export function markExecutionFailed(
  requestId: string,
  transactionHash?: string
) {
  return updateExecutionRecord(requestId, {
    status: "failed",
    ...(transactionHash ? { transactionHash } : {}),
  });
}
