import { utils } from "ethers";
import { ethers } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("Shop");

  const contract = factory.attach("0xB81900959646d2a9FeEFCA91B62D42e65eab9771");

  return contract.grantRole(
    utils.keccak256(utils.toUtf8Bytes("SHOP_ADMIN_ROLE")),
    "0xe9c371c39643c485581ec413bbb110baddf17121"
  );
}

main().then(console.log);
