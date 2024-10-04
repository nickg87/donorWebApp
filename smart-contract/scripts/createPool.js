require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Define the contract address and ABI
const contractAddress = '0xd184FB81Fa09BdfDBFf88262977fd77E1b07f07F'; // Replace with your deployed contract address
const contractABI = [
  "function createPool(uint256 poolId, uint256 ticketPrice, uint256 maxPoolSize)",
  "function getPool(uint256 poolId) view returns (uint256 ticketPrice, uint256 maxPoolSize, bool exists)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function createPool(poolID) {
  const ticketPrice = ethers.parseEther('0.001');
  const maxPoolSize = ethers.parseEther('0.02');

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
createPool(uniquePoolId);
