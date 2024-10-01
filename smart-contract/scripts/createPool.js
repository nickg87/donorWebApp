require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Define the contract address and ABI
const contractAddress = '0x70D7342E96519E0F7f693FEeA65357fA01e6b9E3'; // Replace with your deployed contract address
const contractABI = [
  "event PoolCreated(uint indexed poolId, uint ticketPrice, uint maxPoolSize, bool allowMultipleTickets)",
  "function createPool(uint256 ticketPrice, uint256 maxPoolSize, bool allowMultipleTickets)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function createPool() {
  const ticketPrice = ethers.utils.parseEther('0.001');
  const maxPoolSize = ethers.utils.parseEther('0.04');
  const allowMultipleTickets = true; // Allow multiple tickets

  try {
    const tx = await prizePoolManager.createPool(ticketPrice, maxPoolSize, allowMultipleTickets);
    await tx.wait(); // Wait for the transaction to be mined
    console.log('Pool created successfully!');
  } catch (error) {
    console.error('Error creating pool:', error);
  }
}

createPool();
