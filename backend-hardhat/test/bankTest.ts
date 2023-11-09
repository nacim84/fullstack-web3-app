import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("Bank tests", () => {

  async function runEveryTime() {
    const [owner, otherAccount1] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    return { bank, owner, otherAccount1 };
  }

  // Test Deployment
  describe("Deployment", () => {
    // Checking unlocked time
    it("Should check deployment.", async () => {
      const { bank, owner } = await loadFixture(runEveryTime);
      assert.equal(owner.address, await bank.owner());
    });
  });
  // Tests functions
  //// 1 - deposit
  describe("Deposit", () => {
    it("Sender not deposit if not owner.", async () => {
      const { bank, otherAccount1 } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("1");
      await expect(bank.connect(otherAccount1).deposit({ value: amount })).to.be.revertedWithCustomError(bank, "OwnableUnauthorizedAccount");
    });

    it("Should revert if amount less than 0.1 ether.", async () => {
      const { bank } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("0.09");
      await expect(bank.deposit({ value: amount })).to.be.revertedWith("not enough funds provided");
    });

    it("Should emit Deposit event if deposit is done", async () => {
      const { bank, owner } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("0.1");
      await expect(bank.deposit({ value: amount })).to.be.emit(bank, "Deposit").withArgs(owner.address, amount);
    });
  });

  describe("Withdraw", () => {
    it("Sender not withdraw if not owner.", async () => {
      const { bank, otherAccount1 } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("1");
      const withdrawAmount = ethers.parseEther("0.5");
      await bank.deposit({ value: amount });

      await expect(bank.connect(otherAccount1).withdraw(withdrawAmount)).to.be.revertedWithCustomError(bank, "OwnableUnauthorizedAccount");
    });

    it("Should revert if the withdraw amount more than the contract balance.", async () => {
      const { bank } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("0.5");
      const withdrawAmount = ethers.parseEther("1");
      await bank.deposit({ value: amount });

      await expect(bank.withdraw(withdrawAmount)).to.be.revertedWith("you cannot withdraw this much");
    });


    it("Should the transfer done.", async () => {
      const { bank, owner } = await loadFixture(runEveryTime);
      const amount = ethers.parseEther("1");
      const withdrawAmount = ethers.parseEther("0.5");
      await bank.deposit({ value: amount });

      await expect(bank.withdraw(withdrawAmount)).emit(bank, "Withdraw").withArgs(owner.address, withdrawAmount);
    });
  })
});