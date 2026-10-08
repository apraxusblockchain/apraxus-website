import {
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { arbitrumSepolia, bscTestnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import { getExecutionSignerConfig } from "./config";
import type { ExecutionSigner } from "./types";

const ERC20_TRANSFER_ABI = [
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
] as const;

export function createEvmExecutionSigner(agentId: string): ExecutionSigner | null {
  const config = getExecutionSignerConfig();

  if (!config) {
    return null;
  }

  if (config.agentId !== agentId) {
    return null;
  }

  const chain =
    config.chainId === 421614
      ? arbitrumSepolia
      : config.chainId === 97
        ? bscTestnet
        : null;

  if (!chain) {
    throw new Error("Unsupported execution signer chain");
  }

  const account = privateKeyToAccount(config.privateKey);

  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(config.rpcUrl),
  });

  const publicClient = createPublicClient({
    chain,
    transport: http(config.rpcUrl),
  });

  return {
    address: account.address,
    chainId: config.chainId,

    async signAndSend(input) {
      if (input.assetKind === "token") {
        if (!input.tokenAddress) {
          throw new Error("Token address is required for token execution");
        }

        const transactionHash = await walletClient.writeContract({
          account,
          address: input.tokenAddress,
          abi: ERC20_TRANSFER_ABI,
          functionName: "transfer",
          args: [input.recipient, input.amount],
        });

        await publicClient.waitForTransactionReceipt({
          hash: transactionHash,
        });

        return { transactionHash };
      }

      const transactionHash = await walletClient.sendTransaction({
        account,
        to: input.recipient,
        value: input.amount,
      });

      await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      });

      return { transactionHash };
    },
  };
}
