// smart-contract/scripts/enterLocalPool.js
const { ethers } = require('ethers');

// Connect to Ethereum (Hardhat node)
const infuraUrl = 'http://127.0.0.1:8545';
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet('0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a', provider); // Using another account

// Define the contract address and ABI
const contractAddress = '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e'; // Replace with your deployed contract address
const contractABI = [
  "function enterPool(uint256 poolId) payable"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function enterLocalPool() {
  const poolId = 41; // Replace with the ID of the pool you want to enter
  const ticketPrice = ethers.parseEther('0.004'); // Ticket price, it should match the pool ticket price

  try {
    // Sending transaction to enter the pool
    const tx = await prizePoolManager.enterPool(poolId, { value: ticketPrice });
    await tx.wait(); // Wait for the transaction to be mined
    console.log('Entered pool successfully!');
  } catch (error) {
    console.error('Error entering pool:', error);
  }
}

enterLocalPool();
