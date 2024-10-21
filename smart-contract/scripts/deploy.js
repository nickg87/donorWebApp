//scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory for PrizePoolManager
  const PrizePoolManager = await ethers.getContractFactory("PrizePoolManager");

  // Deploy the contract
  const prizePoolManager = await PrizePoolManager.deploy();

  // Wait for the deployment transaction to be mined
  await prizePoolManager.waitForDeployment();

  // Log the deployed contract address
  console.log(prizePoolManager);
  console.log("PrizePoolManager deployed to:", prizePoolManager.target);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });