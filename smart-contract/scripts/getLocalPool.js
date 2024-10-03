const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = 'http://127.0.0.1:8545';
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

// Define the contract address and ABI
const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; // Replace with your deployed contract address
const contractABI = [
  "function getPool(uint256 poolId) view returns (uint256 ticketPrice, uint256 maxPoolSize, bool exists)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function getLocalPool(poolID) {
  try {
    const pool = await prizePoolManager.getPool(poolID);
    if (!pool.exists) {
      console.error(`Pool ID ${poolID} does not exist.`);
      return;
    }

    console.log(`Pool Details for Pool ID ${poolID}:`);
    console.log(`Ticket Price: ${ethers.formatEther(pool.ticketPrice)} ETH`);
    console.log(`Max Pool Size: ${ethers.formatEther(pool.maxPoolSize)} ETH`);
    console.log(`Exists: ${pool.exists}`);
  } catch (error) {
    console.error('Error retrieving pool details:', error);
  }
}

// Replace with the pool ID you want to check
const poolID = 41;
getLocalPool(poolID);
