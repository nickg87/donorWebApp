//backend/routes/etherscan.js
const express = require('express');
const { ethers } = require('ethers');
const axios = require('axios');
const router = express.Router();

router.get('/fetch-data/:address', async (req, res) => {
  const { address } = req.params;
  const etherScanApiKey = process.env.ETHERSCAN_APIKEY;

  if (!etherScanApiKey) {
    return res.status(500).json({ error: 'Etherscan API key is not set' });
  }

  try {
    // Initialize Etherscan provider
    const provider = new ethers.providers.EtherscanProvider("sepolia", etherScanApiKey);

    // Fetch transaction count
    const txCount = await provider.getTransactionCount(address);

    // Fetch balance
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.utils.formatEther(balance);

    // Fetch confirmed transactions
    const response = await axios.get(`https://api-sepolia.etherscan.io/api`, {
      params: {
        module: 'account',
        action: 'txlist',
        address: address,
        apikey: etherScanApiKey,
        sort: 'desc',
        page: 1,
        offset: 100,
        status: '1',
      },
    });

    if (response.data.status === '1') {
      const transactionCount = response.data.result.length;
      const transactionList = response.data.result.slice(0, 10);
      return res.json({ transactionCount, transactionList, balance: formattedBalance });
    } else {
      return res.status(500).json({ error: 'Error fetching transaction data' });
    }
  } catch (error) {
    console.error('Error fetching data from Etherscan:', error);
    return res.status(500).json({ error: 'Error fetching data from Etherscan' });
  }
});

module.exports = router;
