import { ethers } from "hardhat";

async function main() {
  const [admin, user1] = await ethers.getSigners();

  /*   const factoryErc20 = await ethers.getContractFactory("ERC20Upgradeable");

  const contractErc20 = factoryErc20.attach(
    "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735"
  );

  return contractErc20
    .connect(user1)
    .approve(
      "0xB81900959646d2a9FeEFCA91B62D42e65eab9771",
      utils.parseEther("1000")
    ); */

  const factory = await ethers.getContractFactory("Shop");

  const contract = factory.attach("0xB81900959646d2a9FeEFCA91B62D42e65eab9771");

  return contract.connect(user1).buy(1);
}

main().then(console.log);
