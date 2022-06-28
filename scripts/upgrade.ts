import { ethers, upgrades } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Shop");

  await upgrades.upgradeProxy(
    "0x27bB4e8eC7b9642e3964D0dA596EA83401239d34",
    factory
  );
}

main().then();
