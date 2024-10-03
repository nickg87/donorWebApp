//./scripts/createPoolMainnet.js
require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Define the contract address and ABI
const contractAddress = '0x6EE62E1a7Bf6765C9f3c660a653bc5B9235414c2'; // Replace with your deployed contract address
const contractABI = [
  "function createPool(uint256 poolId, uint256 ticketPrice, uint256 maxPoolSize)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function createPool(poolID) {
  const ticketPrice = ethers.parseEther('0.004');
  const maxPoolSize = ethers.parseEther('0.02');

  try {
    const tx = await prizePoolManager.createPool(poolID, ticketPrice, maxPoolSize);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log(`Creating pool with ID: ${poolID}, Ticket Price: ${ticketPrice.toString()}`);

    console.log('Pool created successfully!');

  } catch (error) {
    console.error('Error creating pool:', error);
  }
}

const uniquePoolId = 41;
createPool(uniquePoolId);
