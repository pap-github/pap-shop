import { ethers, upgrades } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Shop");

  const contract = await upgrades.deployProxy(
    factory,
    [
      "0xebb832a3334295d530AE13E598AeEE22083cAa3F",
      "0xfCbcEBaada7f2563b40b7ad9695e18B354B2b1Ae",
      "0x0E9B5c9e91878bFbd6E0602b35cbAEb583559450",
    ],
    {
      initializer: "initialize",
    }
  );

  return contract.address;
}

main().then(console.log);
