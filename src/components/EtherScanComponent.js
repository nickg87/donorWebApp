import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
const axios = require('axios');
import { useAppContext } from '@/contexts/AppContext';
import TransactionListComponent from "@/components/TransactionListComponent";
import WebSocketClient from '@/components/WebSocketClient';

const EtherScanComponent = ({ address }) => {

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const { globalState, updateBalance, updateShouldFetch } = useAppContext();
  const [transactionCount, setTransactionCount] = useState(null);
  const [transactionList, setTransactionList] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const etherscanApiKey = process.env.NEXT_PUBLIC_DONOR_ETHSCAN_APIKEY;
  //console.log(etherscanApiKey);

  const fetchDataFromAPI = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl + `etherscan/fetch-data/${address}`);
      const { transactionCount, transactionList, balance } = response.data;

      setTransactionCount(transactionCount);
      setTransactionList(transactionList);
      setBalance(balance);
      updateBalance(parseFloat(balance) * 100); // Assuming USD conversion is done on frontend

      if (globalState.shouldFetch) {
        updateShouldFetch(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!etherscanApiKey) {
      console.error("Etherscan API key is not set");
      setError("Etherscan API key is not set");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Initialize Etherscan provider for ethers v5
      const provider = new ethers.providers.EtherscanProvider("sepolia", etherscanApiKey);
      // ethers v6:
      //const provider = new ethers.EtherscanProvider('sepolia', etherscanApiKey);

      // Fetch transaction count
      const txCount = await provider.getTransactionCount(address);

      // Fetch balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance); // Format using ethers.utils for v5
      // ethers v6
      //const formattedBalance = ethers.formatEther(balance);
      const formattedBalanceToUSDT = parseFloat(formattedBalance) * 100; // Convert balance to USD
      setBalance(formattedBalance); // Update local state
      updateBalance(formattedBalanceToUSDT); // Update global state
      if (globalState.shouldFetch) {
        updateShouldFetch(false);
      }

      setLoading(false);
      fetchConfirmedTransactionCount(address, etherscanApiKey);
    } catch (error) {
      console.error("Error fetching data from Etherscan:", error);
      setError("Error fetching data from Etherscan");
      setLoading(false);
    }
  };

  // Smooth animation effect
  useEffect(() => {
    console.log('xxxxxxx enters here useEffect shouldFetch')
    if (globalState.shouldFetch) {
      fetchDataFromAPI();
    }
  }, [globalState.shouldFetch]);


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
        setTransactionCount(dateResponse.result.length);
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
    fetchDataFromAPI();
    // const fetchDataInterval = setInterval(() => {
    //   fetchDataFromAPI();
    // }, 300000); // Interval set to 5 minutes (1000 milliseconds = 1 second)
    //
    // return () => clearInterval(fetchDataInterval);
  }, [address, etherscanApiKey]);

  return (
    <div>
      <button onClick={fetchDataFromAPI} disabled={loading} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Fetching API DATA...' : 'Test Fetch Data from API'}
      </button>
      {/*<button onClick={fetchData} disabled={loading} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">*/}
      {/*  {loading ? 'Fetching...' : 'Fetch Data'}*/}
      {/*</button>*/}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && (
        <>
          {transactionList && <p>Transaction Count: {transactionCount}</p> }
          <p>Balance: {balance} ETH</p>
        </>
      )}
      <WebSocketClient />
      {transactionList && <TransactionListComponent transactions={transactionList}/> }
    </div>
  );
};

export default EtherScanComponent;
