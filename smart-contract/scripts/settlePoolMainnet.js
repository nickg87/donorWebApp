require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum
const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
const provider = new ethers.JsonRpcProvider(infuraUrl);

// Use your contract deployer's private key
const privateKey = process.env.PRIVATE_KEY; // Ensure you have your private key in the .env file
const wallet = new ethers.Wallet(privateKey, provider);

// Define the contract address and ABI
const contractAddress = '0x6EE62E1a7Bf6765C9f3c660a653bc5B9235414c2'; // Replace with your deployed contract address
const contractABI = [
  "function settlePool(uint256 poolId, address bankAddress, address winnerAddress, uint256 totalPoolSize)"
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function settlePool(poolID) {
  // You need to know the total pool size to distribute the funds
  const totalPoolSize = ethers.parseEther('0.002'); // Example total pool size; replace with actual value

  const bankAddress = '0x9EcA171eA62b7aC92E4258f71f195042b3E2ECe6'; // Your main address
  const winnerAddress = bankAddress; // You can set the winner to be the same as the bank address

  try {
    const tx = await prizePoolManager.settlePool(poolID, bankAddress, winnerAddress, totalPoolSize);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    console.log('Pool settled successfully!', receipt);
  } catch (error) {
    console.error('Error settling pool:', error);
  }
}

const poolId = 41; // Pool ID you want to settle
settlePool(poolId);
