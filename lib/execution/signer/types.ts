export type ExecutionSigner = {
  address: `0x${string}`;
  chainId: number;

  signAndSend(input: {
    assetKind: "token" | "native";
    tokenAddress?: `0x${string}`;
    recipient: `0x${string}`;
    amount: bigint;
  }): Promise<{
    transactionHash: `0x${string}`;
  }>;
};
