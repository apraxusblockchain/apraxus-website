import {
  decodeFunctionData,
  getAddress,
  type Address,
  type PublicClient,
} from "viem";

import { APXS_ABI, APXS_CHAINS } from "@/lib/web3/apxs";

export type VerifiedExecution = {
  transactionHash: string;
  status: "success" | "reverted";
  blockNumber: bigint;
};

const TRANSFER_ABI = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export async function verifyExecutionTransaction(input: {
  publicClient: PublicClient;
  chainId: number;
  transactionHash: `0x${string}`;
  expectedWallet: string;
  expectedTokenAddress: string;
  expectedRecipient: string;
  expectedAmount: bigint;
}): Promise<VerifiedExecution | null> {
  const chainTokenAddress =
    input.chainId === 421614
      ? APXS_CHAINS.arbitrumSepolia.address
      : input.chainId === 97
        ? APXS_CHAINS.bnbTestnet.address
        : null;

  if (!chainTokenAddress) {
    return null;
  }

  if (
    getAddress(input.expectedTokenAddress) !==
    getAddress(chainTokenAddress)
  ) {
    return null;
  }

  const transaction = await input.publicClient.getTransaction({
    hash: input.transactionHash,
  });

  if (
    getAddress(transaction.from) !==
    getAddress(input.expectedWallet)
  ) {
    return null;
  }

  if (
    getAddress(transaction.to ?? "0x0000000000000000000000000000000000000000") !==
    getAddress(chainTokenAddress)
  ) {
    return null;
  }

  const decoded = decodeFunctionData({
    abi: TRANSFER_ABI,
    data: transaction.input,
  });

  if (decoded.functionName !== "transfer") {
    return null;
  }

  const [recipient, amount] = decoded.args;

  if (
    getAddress(recipient) !==
    getAddress(input.expectedRecipient)
  ) {
    return null;
  }

  if (amount !== input.expectedAmount) {
    return null;
  }

  const receipt = await input.publicClient.getTransactionReceipt({
    hash: input.transactionHash,
  });

  return {
    transactionHash: input.transactionHash,
    status: receipt.status === "success" ? "success" : "reverted",
    blockNumber: receipt.blockNumber,
  };
}
