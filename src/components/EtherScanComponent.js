import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
const axios = require('axios');
import { useAppContext } from '@/contexts/AppContext';
import TransactionListComponent from "@/components/TransactionListComponent";

const EtherScanComponent = ({ address }) => {
  const { globalState, setGlobalState } = useAppContext();
  const [transactionCount, setTransactionCount] = useState(null);
  const [transactionList, setTransactionList] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const etherscanApiKey = process.env.NEXT_PUBLIC_DONOR_ETHSCAN_APIKEY;
  //console.log(etherscanApiKey);

  const fetchData = async () => {
    if (!etherscanApiKey) {
      console.error('Etherscan API key is not set');
      setError('Etherscan API key is not set');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.EtherscanProvider('sepolia', etherscanApiKey);

      // Fetch transaction count
      const txCount = await provider.getTransactionCount(address);
      setTransactionCount(txCount);

      // Fetch balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);
      const formattedBalanceToUSDT = parseFloat(formattedBalance) * 100; // Multiply balance by 100
      setBalance(formattedBalance); // Update local state
      setGlobalState({ ...globalState, balance: formattedBalanceToUSDT }); // Update global state


      setLoading(false);
      fetchConfirmedTransactionCount( address, etherscanApiKey);
    } catch (error) {
      console.error('Error fetching data from Etherscan:', error);
      setError('Error fetching data from Etherscan');
      setLoading(false);
    }
  };

  const fetchConfirmedTransactionCount = async (address, etherscanApiKey) => {
    try {
      const response = await axios.get(`https://api-sepolia.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'txlist',
          address: address,
          apikey: etherscanApiKey,
          sort: 'desc', // Sort by block number descending (latest transactions first)
          page: 1,
          offset: 100, // Max number of transactions to fetch per request
          status: '1', // Confirmed transactions only (status 1)
        },
      });

      if (response.data.status === '1') {
        const dateResponse = response.data;
        //console.log(dateResponse);
        const lastTenTransactions = dateResponse.result.slice(0, 10);
        setTransactionList(lastTenTransactions);
        return dateResponse.result.length; // Total number of confirmed transactions
      } else {
        console.error('Error fetching confirmed transaction count:');
      }
    } catch (error) {
      console.error('Error fetching confirmed transaction count:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000); // Interval set to 10 seconds (10000 milliseconds)

    return () => clearInterval(fetchDataInterval);
  }, [address, etherscanApiKey]);

  return (
    <div>
      <button onClick={fetchData} disabled={loading} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && (
        <>
          {transactionList && <p>Transaction Count: {transactionList.length}</p> }
          <p>Balance: {balance} ETH</p>
        </>
      )}
      {transactionList && <TransactionListComponent transactions={transactionList}/> }
    </div>
  );
};

export default EtherScanComponent;
