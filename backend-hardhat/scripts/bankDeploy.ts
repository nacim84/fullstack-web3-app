import hardhat from "hardhat";

const main = async () => {
 const Bank = await hardhat.ethers.getContractFactory("Bank");
 const bank = await Bank.deploy();

 console.log(`Contract deployed with success, address : ${await bank.getAddress()}`);
}

const runMain = async () => {
 try {
  await main();
  process.exit(0);
 } catch (error) {
  console.error(error);
  process.exit(1);
 }
};

runMain();