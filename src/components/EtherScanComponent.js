import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
const axios = require('axios');
import { useAppContext } from '@/contexts/AppContext';
import TransactionListComponent from "@/components/TransactionListComponent";
import WebSocketClient from '@/components/WebSocketClient';

const EtherScanComponent = ({ address }) => {

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const isDev = process.env.NEXT_PUBLIC_DEVELOPER_MODE === 'true';
  const etherscanApiKey = process.env.NEXT_PUBLIC_DONOR_ETHSCAN_APIKEY;
  const { globalState, updateBalance, updateShouldFetch } = useAppContext();
  const [transactionCount, setTransactionCount] = useState(null);
  const [transactionList, setTransactionList] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Smooth animation effect
  useEffect(() => {
    if (globalState.shouldFetch) {
      if (isDev) console.log('Enters here useEffect globalState.shouldFetch is TRUE');
      if (globalState.currentPool?.eth_address) {
        fetchDataFromAPI();
      }

    }
  }, [globalState.shouldFetch]);

  useEffect(() => {
    if (globalState.currentPool?.eth_address) {
      fetchDataFromAPI();
    }
  }, [address, etherscanApiKey]);

  return (
    <div>
      <h2>This is EtherScanComponent.js</h2>
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
