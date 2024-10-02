//smart-contract/scripts/createLocalPool.js
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = 'http://127.0.0.1:8545';
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);

// Define the contract address and ABI
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your deployed contract address
const contractABI = [
  "function createPool(uint256 poolId, uint256 ticketPrice, uint256 maxPoolSize)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function createLocalPool(poolID) {
  const ticketPrice = ethers.parseEther('0.001');
  const maxPoolSize = ethers.parseEther('0.04');

  try {
    const tx = await prizePoolManager.createPool(poolID, ticketPrice, maxPoolSize);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log('Pool created successfully!');
    console.log(receipt);
    // Get the PoolCreated event from the transaction receipt
    // const event = receipt.events.find(event => event.event === 'PoolCreated');
    // if (event) {
    //   const poolId = event.args.poolId.toString();
    //   console.log(`Pool ID: ${poolId}`);
    // } else {
    //   console.log('PoolCreated event not found in transaction receipt.');
    // }
  } catch (error) {
    console.error('Error creating pool:', error);
  }
}

const uniquePoolId = 41;
createLocalPool(uniquePoolId);
