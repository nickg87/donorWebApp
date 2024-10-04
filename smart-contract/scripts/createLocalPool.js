//smart-contract/scripts/createLocalPool.js
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = 'http://127.0.0.1:8545';
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

// Define the contract address and ABI
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Replace with your deployed contract address
const contractABI = [
  "function createPool(uint256 poolId, uint256 ticketPrice, uint256 maxPoolSize)",
  "function getPool(uint256 poolId) view returns (uint256 ticketPrice, uint256 maxPoolSize, bool exists)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function createLocalPool(poolID) {
  const ticketPrice = ethers.parseEther('0.001');
  const maxPoolSize = ethers.parseEther('0.04');
  console.log(ticketPrice);
  console.log(maxPoolSize);

  try {
    const tx = await prizePoolManager.createPool(poolID, ticketPrice, maxPoolSize);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log('Transaction receipt:', receipt);

    if (receipt.status !== 1) {
      console.error('Transaction failed.');
      return;
    }

    console.log('Pool created successfully!');
    // Wait for a few seconds before retrieving pool details
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await getPoolDetails(poolID);
  } catch (error) {
    console.error('Error creating pool:', error);
  }
}

async function getPoolDetails(poolID) {
  try {
    const pool = await prizePoolManager.getPool(poolID);
    console.log(`Pool Details for Pool ID ${poolID}:`);
    console.log(`Ticket Price: ${ethers.formatEther(pool.ticketPrice)} ETH`);
    console.log(`Max Pool Size: ${ethers.formatEther(pool.maxPoolSize)} ETH`);
    console.log(`Exists: ${pool.exists}`);
  } catch (error) {
    console.error('Error retrieving pool details:', error);
  }
}

const uniquePoolId = 41;
createLocalPool(uniquePoolId);
