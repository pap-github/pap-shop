import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { utils } from "ethers";
import { ethers, upgrades } from "hardhat";
import { Shop, TestToken } from "../typechain";

describe("Shop", () => {
  let [admin, user1, user2]: SignerWithAddress[] = [];
  let token: TestToken;
  let shop: Shop;

  before(async () => {
    [admin, user1, user2] = await ethers.getSigners();

    token = await (
      await ethers.getContractFactory("PapToken")
    ).deploy("PapToken", "PAP", utils.parseEther("1000000"));

    shop = (await upgrades.deployProxy(
      await ethers.getContractFactory("Shop"),
      [admin.address, token.address, admin.address],
      {
        initializer: "initialize",
      }
    )) as Shop;

    token.transfer(user1.address, utils.parseEther("100"));
    token.connect(user1).approve(shop.address, utils.parseEther("100"));

    token.transfer(user2.address, utils.parseEther("100"));
    token.connect(user2).approve(shop.address, utils.parseEther("100"));
  });

  it("Admin should be able to add item", async () => {
    expect(await shop.addItem(1, utils.parseEther("10"), 3, 2, false)).ok;
  });

  it("Admin should not be able to duplicate item", async () => {
    await expect(
      shop.addItem(1, utils.parseEther("10"), 3, 2, false)
    ).to.be.revertedWith("Item for this scSaleId already exists");
  });

  it("Admin should be able to edit item", async () => {
    expect(await shop.editItem(1, utils.parseEther("1"), 5, 3, true)).ok;
  });

  it("User should be able to buy item", async () => {
    expect(await shop.connect(user1).buy(1)).ok;
    expect(await shop.connect(user1).buy(1)).ok;
    expect(await shop.connect(user1).buy(1)).ok;
  });

  it("User should not be able to buy more than max per user", async () => {
    await expect(shop.connect(user1).buy(1)).to.be.revertedWith(
      "Max per user reached"
    );
  });

  it("Another user should be able to buy item", async () => {
    expect(await shop.connect(user2).buy(1)).ok;
    expect(await shop.connect(user2).buy(1)).ok;
  });

  it("Should not be able to buy when sold out", async () => {
    await expect(shop.connect(user1).buy(1)).to.be.revertedWith(
      "No more item in stock"
    );
  });

  it("Should be able to get a list of active items", async () => {
    expect(await shop.addItem(2, utils.parseEther("10"), 3, 2, false)).ok;
    expect(await shop.addItem(3, utils.parseEther("10"), 3, 2, true)).ok;
    expect(await shop.addItem(4, utils.parseEther("10"), 3, 2, false)).ok;

    console.log(await shop.getActiveItems());
  });

  it("Should be able to list order events", async () => {
    const events = await shop.queryFilter(shop.filters.Order(user1.address));

    console.log(events.map((e) => e.args));
  });
});
