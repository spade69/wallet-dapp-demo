// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [depolyer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account.",
    depolyer.address
  );
  depolyGreeter()
  // depolyLock()
  deployElon()
}

async function depolyLock() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

async function depolyGreeter() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello World");
  // const Token , get contract instance 
  const Token = await hre.ethers.getContractFactory("Token");
  // deploy instance
  const token = await Token.deploy();
  await greeter.deployed();
  await token.deployed();

  console.log(
    `Greeter contract successfully deployed to ${greeter.address}`
  );
  console.log(
    `Token contract successfully deployed to ${token.address}`
  );
  // 0x5fbdb2315678afecb367f032d93f642f64180aa3
}

async function deployElon() {
  const Elon = await hre.ethers.getContractFactory("Elon");
  const elon = await Elon.deploy("Elon Mask Token", "Elon");
  await elon.deployed();
  console.log(
    `Elon contract successfully deployed to ${elon.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
