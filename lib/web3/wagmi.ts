"use client";

import { createConfig, http } from "wagmi";
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
} from "wagmi/connectors";
import { arbitrumSepolia } from "wagmi/chains";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [arbitrumSepolia],

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
  },

  ssr: true,
});
