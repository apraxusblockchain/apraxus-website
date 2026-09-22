import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { configVariable, defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const bnbRpcUrl = process.env.BNB_TESTNET_RPC_URL;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;

export default defineConfig({
  plugins: [hardhatEthers, hardhatVerify],

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

  verify: {
    etherscan: {
      apiKey: configVariable("ETHERSCAN_API_KEY"),
    },
  },

  networks: {
    bnbTestnet: {
      type: "http",
      url: bnbRpcUrl ?? "",
      chainId: 97,
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
  },
});
