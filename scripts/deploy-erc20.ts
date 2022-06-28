import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("PrimeApePlanet");

  const contract = await factory.deploy(
    "0xebb832a3334295d530AE13E598AeEE22083cAa3F"
  );

  return contract.address;
}

main().then(console.log);
