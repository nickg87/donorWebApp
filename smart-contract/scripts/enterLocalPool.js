// smart-contract/scripts/enterLocalPool.js
// require('dotenv').config();
const { ethers } = require('ethers');

// Connect to Ethereum (Hardhat node)
const infuraUrl = 'http://127.0.0.1:8545';
const provider = new ethers.JsonRpcProvider(infuraUrl);

// Wallet setup (local address)
const privateKey = '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
const wallet = new ethers.Wallet(privateKey, provider);

// Contract address and ABI
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Replace with your deployed contract address
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
const ticketPrice = 0.001; // Ticket price in ether

enterPool(poolId, ticketPrice);