// smart-contract/scripts/estimateGasForEnterPool.js
require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Sepolia network
const infuraApiKey = process.env.INFURA_API_KEY; // Replace with your Infura project ID
const sepoliaUrl = `https://sepolia.infura.io/v3/${infuraApiKey}`;
const provider = new ethers.JsonRpcProvider(sepoliaUrl);

// Wallet setup
const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Define the contract address and ABI
const contractAddress = '0xDe58A23495124294d856142a108975c54b17BC82'; // Replace with your deployed contract address
const contractABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {"stateMutability": "payable", "type": "fallback"}, {
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }], "name": "changeOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "ticketPrice",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "maxPoolSize", "type": "uint256"}],
  "name": "createPool",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}],
  "name": "enterPool",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [],
  "name": "feePercent",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "name": "pools",
  "outputs": [{"internalType": "uint256", "name": "size", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "ticketPrice",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "maxPoolSize", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "totalTickets",
    "type": "uint256"
  }, {"internalType": "bool", "name": "settled", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "poolId", "type": "uint256"}, {
    "internalType": "address",
    "name": "bankAddress",
    "type": "address"
  }, {"internalType": "address", "name": "winnerAddress", "type": "address"}],
  "name": "settlePool",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {"stateMutability": "payable", "type": "receive"}];

// Initialize the contract
const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);

async function estimateGasForEnterPool() {
  const poolId = 41; // Replace with your pool ID
  const amount = ethers.parseEther('0.004');

  try {
    const estimatedGas = await prizePoolManager.estimateGas.enterPool(poolId, {
      value: amount,
    });

    const gasPrice = await provider.getGasPrice();
    console.log('Estimated gas for enterPool:', estimatedGas.toString());
    console.log('Current gas price:', gasPrice, 'Gwei');
  } catch (error) {
    console.error('Error estimating gas:', error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
}

estimateGasForEnterPool();