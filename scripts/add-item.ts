import { utils } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Shop");

  const contract = factory.attach("0xB81900959646d2a9FeEFCA91B62D42e65eab9771");

  return contract.addItem(1, utils.parseEther("1.2"), 10, 2, true);
}

main().then(console.log);
