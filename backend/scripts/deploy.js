const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.deployContract("Voting");

  await Voting.waitForDeployment();

  console.log(`Voting deployed to ${Voting.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
