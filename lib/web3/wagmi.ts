"use client";

import { createConfig, http } from "wagmi";
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
} from "wagmi/connectors";
import { arbitrumSepolia, bscTestnet } from "wagmi/chains";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [arbitrumSepolia, bscTestnet],

  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "Apraxus",
    }),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            showQrModal: true,
          }),
        ]
      : []),
  ],

  transports: {
    [arbitrumSepolia.id]: http(
      "https://sepolia-rollup.arbitrum.io/rpc"
    ),
    [bscTestnet.id]: http(
      "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
    ),
  },

  ssr: true,
});
