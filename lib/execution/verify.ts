import {
  decodeFunctionData,
  getAddress,
  type Address,
  type PublicClient,
} from "viem";

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
  expectedAssetKind: "token" | "native";
  expectedTokenAddress?: string;
  expectedRecipient: string;
  expectedAmount: bigint;
}): Promise<VerifiedExecution | null> {
  if (input.publicClient.chain?.id !== input.chainId) {
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

  if (input.expectedAssetKind === "native") {
    if (
      getAddress(transaction.to ?? "0x0000000000000000000000000000000000000000") !==
      getAddress(input.expectedRecipient)
    ) {
      return null;
    }

    if (transaction.value !== input.expectedAmount) {
      return null;
    }
  } else {
    if (!input.expectedTokenAddress) {
      return null;
    }

    if (
      getAddress(transaction.to ?? "0x0000000000000000000000000000000000000000") !==
      getAddress(input.expectedTokenAddress)
    ) {
      return null;
    }

    let decoded;
    try {
      decoded = decodeFunctionData({
        abi: TRANSFER_ABI,
        data: transaction.input,
      });
    } catch {
      return null;
    }

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
