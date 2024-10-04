// smart-contract/scripts/enterPool.js
require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);
//simulate transfer from 0xC909B7Ab5156E4B8770881508894aCFa3A394527
const privateKey = '13f32db9fbcc4aa8934168f883bc41320d238d9aa1dadf0f5a1f728964cf1d49';
const wallet = new ethers.Wallet(privateKey, provider);

// Define the contract address and ABI
const contractAddress = '0xd184FB81Fa09BdfDBFf88262977fd77E1b07f07F'; // Replace with your deployed contract address
const contractABI = [
  "function enterPool(uint256 poolId, uint256 ticketPrice) payable" // Define the enterPool function ABI
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function enterPool(poolID, ticketPriceInEther) {
  try {
    // Convert ticket price to wei
    const ticketPriceInWei = ethers.parseEther(ticketPriceInEther.toString());
    // Call enterPool function with the pool ID and ticket price, sending the correct value
    const tx = await prizePoolManager.enterPool(poolID, ticketPriceInWei, {
      value: ticketPriceInWei // Send the ticket price as msg.value
    });
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log('Entered the pool successfully!', receipt);

  } catch (error) {
    console.error('Error entering pool:', error);
  }
}

const poolId = 41; // Pool ID
const amount = 0.001; // Amount to send

enterPool(poolId, amount);
