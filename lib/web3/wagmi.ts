import { createConfig, http } from 'wagmi';
import {
  coinbaseWallet,
  metaMask,
  walletConnect,
} from 'wagmi/connectors';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [arbitrumSepolia],

  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Apraxus',
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
      showQrModal: true,
    }),
  ],

  transports: {
    [arbitrumSepolia.id]: http(
      'https://sepolia-rollup.arbitrum.io/rpc'
    ),
  },
});
