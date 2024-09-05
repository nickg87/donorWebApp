const { ethers } = require('ethers');
const axios = require('axios');
const { broadcastMessage } = require('../webSocket'); // Import broadcast function


const fetchEtherScanData = async (address, db) => {
  const etherScanApiKey = process.env.ETHERSCAN_APIKEY;

  if (!etherScanApiKey) {
    throw new Error('Etherscan API key is not set');
  }

  try {
    // Initialize Etherscan provider
    const provider = new ethers.providers.EtherscanProvider("sepolia", etherScanApiKey);

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
      const transactions = response.data.result;
      let newTransactionsCount = 0;

      for (const transaction of transactions) {
        const existingTransaction = await db('transactions').where({ hash: transaction.hash }).first();

        if (!existingTransaction) {
          await db('transactions').insert({
            blockHash: transaction.blockHash,
            blockNumber: parseInt(transaction.blockNumber),
            from: transaction.from,
            gas: parseInt(transaction.gas),
            gasPrice: transaction.gasPrice,
            gasUsed: parseInt(transaction.gasUsed),
            hash: transaction.hash,
            timeStamp: new Date(parseInt(transaction.timeStamp) * 1000).toISOString(),
            to: transaction.to,
            txreceipt_status: parseInt(transaction.txreceipt_status),
            value: transaction.value,
            poolId: null, // Adjust as necessary
          });
          newTransactionsCount++;
        }
      }

      if (newTransactionsCount > 0) {
        // Broadcast update to all WebSocket clients
        broadcastMessage({
          type: 'UPDATE',
          balance: formattedBalance,
          newTransactionsCount,
        });
      }

      return {
        transactionCount: transactions.length,
        newTransactionsCount,
        balance: formattedBalance,
      };
    } else {
      throw new Error('Error fetching transaction data');
    }
  } catch (error) {
    console.error('Error fetching data from Etherscan:', error);
    throw error;
  }
};

module.exports = fetchEtherScanData;
