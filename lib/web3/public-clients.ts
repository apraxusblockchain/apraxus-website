import { createPublicClient, http, type PublicClient } from "viem";
import { arbitrumSepolia, bscTestnet } from "viem/chains";

const PUBLIC_CLIENTS: Record<number, PublicClient> = {
  421614: createPublicClient({
    chain: arbitrumSepolia,
    transport: http(),
  }),
  97: createPublicClient({
    chain: bscTestnet,
    transport: http(),
  }),
};

export function getApraxusPublicClient(
  chainId: number,
): PublicClient | undefined {
  return PUBLIC_CLIENTS[chainId];
}
