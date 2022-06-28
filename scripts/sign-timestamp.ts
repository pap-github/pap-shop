import { ethers } from "hardhat";

async function main() {
  const [admin] = await ethers.getSigners();

  const timestamp = Date.now();

  return {
    timestamp,
    signature: await admin.signMessage(
      `Prime Ape Planet login - timestamp:${timestamp}`
    ),
  };
}

main().then(console.log);
