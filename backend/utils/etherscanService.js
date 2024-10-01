import { ethers } from 'ethers';
import axios from 'axios';
import { broadcastMessage } from '../webSocket.js'; // Import broadcast function

export const fetchEtherScanData = async (address, db) => {
  const etherScanApiKey = process.env.ETHERSCAN_APIKEY;
  // console.log(etherScanApiKey);
  // console.log(process.env);

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

      // Check pools to see if they are full
      const pools = await db('pools').where({ active: true, drawn_status: 'inactive' });
      let drawnStatus = 'inactive';

      for (const pool of pools) {
        const hasTransactions = await db('transactions').where('poolId', pool.id).first();
        if (hasTransactions) {
          const totalValueResult = await db('transactions').where('poolId', pool.id).sum({ totalValue: db.raw('CAST(value AS BIGINT)') });
          const poolPrizeAmount = pool.prize_amount;
          //force some other value for testing purposes
          //const poolPrizeAmount = 0.04;

          // Ensure we safely access the totalValue
          const totalValue = Array.isArray(totalValueResult) && totalValueResult.length > 0 ? totalValueResult[0].totalValue : 0;
          const formattedTotalValue = ethers.utils.formatEther(totalValue);

          console.log('Total value for poolID ' + pool.id + ': ' + formattedTotalValue);
          console.log('Pool prize Amount for poolID ' + pool.id + ': ' + poolPrizeAmount);

          if (totalValue >= poolPrizeAmount) {
            console.log('SHOULD ENTER DRAW LOGIC for poolID: ' + pool.id);
            const randomTransactionResult = await db('transactions')
              .where('poolId', pool.id)
              .orderByRaw('RANDOM()') // Use RANDOM() to select a random transaction
              .first(); // Get only one transaction

            if (randomTransactionResult) {
              // Prepare the drawn_data JSON with relevant transaction information
              const drawnData = randomTransactionResult;

              // Pool is full, trigger draw logic
              await db('pools')
                .where({ id: pool.id })
                .update({
                  drawn_status: 'in_progress', // Adjust as necessary
                  drawn_at: new Date(),
                  drawn_data: JSON.stringify(drawnData), // Store drawn_data as JSON
                });

              drawnStatus = 'in_progress';
              console.log(`Pool ${pool.id} is drawn with drawn_data:`, drawnData);
            } else {
              console.log(`No transactions found for poolID: ${pool.id}`);
            }
          }
        }
      }

      return {
        transactionCount: transactions.length,
        newTransactionsCount,
        balance: formattedBalance,
        drawn_status: drawnStatus,
      };
    } else {
      console.log(response)
      throw new Error('Error fetching transaction data');
    }
  } catch (error) {
    console.error('Error fetching data from Etherscan:', error);
    throw error;
  }
};
