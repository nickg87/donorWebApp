require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Define the contract address and ABI
const contractAddress = '0xDe58A23495124294d856142a108975c54b17BC82'; // Replace with your deployed contract address
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
    console.log('Pool created successfully!');

  } catch (error) {
    console.error('Error creating pool:', error);
  }
}

const uniquePoolId = 41;
createPool(uniquePoolId);
