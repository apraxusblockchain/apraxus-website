import { network } from "hardhat";

const { ethers } = await network.connect();

const INITIAL_HOLDER = "0x90f771DD3FCF441cE33Ad481Ade618Ed33C601b3";

const apxs = await ethers.deployContract("APXS", [INITIAL_HOLDER]);

console.log("APXS deployment submitted...");
console.log("Contract:", await apxs.getAddress());

await apxs.waitForDeployment();

console.log("APXS deployed:", await apxs.getAddress());
console.log("Initial holder:", INITIAL_HOLDER);
