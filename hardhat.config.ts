import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

const bnbRpcUrl = process.env.BNB_TESTNET_RPC_URL;

export default defineConfig({
  plugins: [hardhatEthers],

  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
    },
  },

  networks: {
    bnbTestnet: {
      type: "http",
      url: bnbRpcUrl ?? "",
      chainId: 97,
    },
  },
});
