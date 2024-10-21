// smart-contract/scripts/estimateGasForEnterPool.js
require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Sepolia network
const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
//const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
//const infuraeKey = process.env.INFURA_API_KEY; // Replace with your Infura project ID
const infuraUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
//const infuraUrl = 'http://127.0.0.1:8545';
// Wallet setup (local address)
const provider = new ethers.JsonRpcProvider(infuraUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address and ABI
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Replace with your deployed contract address
const contractABI = [
  "function enterPool(uint256 poolId, uint256 ticketPrice) payable" // Define the enterPool function ABI
];

const prizePoolManager = new ethers.Contract(contractAddress, contractABI, wallet);


async function estimateGasForEnterPool() {
  const poolId = 41; // Replace with your pool ID
  const amount = ethers.parseEther('0.001');

  try {
    const estimatedGas = await prizePoolManager.estimateGas.enterPool(poolId, amount, {
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