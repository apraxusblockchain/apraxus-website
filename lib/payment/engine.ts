import type {
  Address,
  PublicClient,
  WalletClient,
} from "viem";

import type { PaymentReceipt } from "@/lib/payment/receipt";

export type ExecuteApxsPaymentInput = {
  walletClient: WalletClient;
  publicClient: PublicClient;
  account: Address;
  tokenAddress: Address;
  destination: Address;
  amount: bigint;
  chainId: number;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
};

export type ExecuteApxsPaymentResult = PaymentReceipt;

export async function executeApxsPayment(
  input: ExecuteApxsPaymentInput
): Promise<ExecuteApxsPaymentResult> {
  if (input.walletClient.chain?.id !== input.chainId) {
    throw new Error("Wallet network does not match the requested payment network.");
  }

  const transactionHash = await input.walletClient.writeContract({
    account: input.account,
    address: input.tokenAddress,
    abi: [
      {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bool" }],
      },
    ],
    functionName: "transfer",
    args: [input.destination, input.amount],
    chain: input.walletClient.chain ?? undefined,
    maxFeePerGas: input.maxFeePerGas,
    maxPriorityFeePerGas: input.maxPriorityFeePerGas,
  });

  const receipt = await input.publicClient.waitForTransactionReceipt({
    hash: transactionHash,
  });

  return {
    transactionHash,
    status: receipt.status === "success" ? "success" : "reverted",
    blockNumber: receipt.blockNumber,
  };
}
