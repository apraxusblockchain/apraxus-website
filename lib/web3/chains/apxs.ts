import { arbitrumSepolia, bscTestnet } from "viem/chains";

export const APXS_CHAINS = {
  arbitrumSepolia: {
    chain: arbitrumSepolia,
    address:
      "0xFE16213961cb4f9B15301f730a5977b9A145add5" as `0x${string}`,
  },
  bnbTestnet: {
    chain: bscTestnet,
    address:
      "0xEf55E41d5F5473BECAC8f7116654eB3CD571447e" as `0x${string}`,
  },
} as const;

export type ApxsChainKey = keyof typeof APXS_CHAINS;

export const APXS_CHAIN_META = {
  arbitrumSepolia: {
    name: "Arbitrum Sepolia",
    shortName: "Arbitrum",
    chainId: 421614,
    explorer: "https://sepolia.arbiscan.io",
  },
  bnbTestnet: {
    name: "BNB Testnet",
    shortName: "BNB",
    chainId: 97,
    explorer: "https://testnet.bscscan.com",
  },
} as const;
