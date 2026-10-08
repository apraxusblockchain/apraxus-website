import { getExecutionRecord } from "@/lib/execution/repository";
import { markExecutionFailed } from "@/lib/execution/lifecycle";
import { submitExecution } from "@/lib/execution/submit";
import { settleExecution } from "@/lib/execution/settle";
import { getApraxusAsset } from "@/lib/web3/assets/registry";
import { getApraxusPublicClient } from "@/lib/web3/public-clients";
import { parseUnits } from "viem";
import { verifyExecutionTransaction } from "@/lib/execution/verify";

export async function orchestrateExecution(requestId: string) {
  const record = getExecutionRecord(requestId);

  if (!record) {
    throw new Error("Execution record not found");
  }

  if (record.status !== "pending") {
    throw new Error("Execution is not pending");
  }

  const submitted = await submitExecution(requestId);

  if (!submitted.transactionHash) {
    throw new Error("Execution submission did not return a transaction hash");
  }

  const latest = getExecutionRecord(requestId);

  if (!latest) {
    throw new Error("Execution record not found after submission");
  }

  const asset = getApraxusAsset(latest.assetId);

  if (!asset || !asset.enabled || asset.chainId !== latest.chainId) {
    throw new Error("Unsupported execution asset");
  }

  const publicClient = getApraxusPublicClient(latest.chainId);

  if (!publicClient) {
    throw new Error("Unsupported execution chain");
  }

  const executionDecimals =
    asset.kind === "native"
      ? asset.decimals
      : await publicClient.readContract({
          address: asset.address!,
          abi: [{
            type: "function",
            name: "decimals",
            stateMutability: "view",
            inputs: [],
            outputs: [{ type: "uint8" }],
          }],
          functionName: "decimals",
        });

  const expectedAmount = parseUnits(
    latest.amount,
    executionDecimals,
  );

  const verified = await verifyExecutionTransaction({
    publicClient,
    chainId: latest.chainId,
    transactionHash: submitted.transactionHash,
    expectedWallet: latest.walletAddress,
    expectedAssetKind: latest.assetKind,
    expectedTokenAddress: latest.tokenAddress,
    expectedRecipient: latest.recipient,
    expectedAmount,
  });

  if (!verified) {
    markExecutionFailed(
      latest.requestId,
      submitted.transactionHash,
    );
    throw new Error("Transaction does not match the execution record");
  }

  return settleExecution(latest, {
    transactionHash: verified.transactionHash as `0x${string}`,
    status: verified.status,
    blockNumber: verified.blockNumber,
    executionDecimals,
  });
}
