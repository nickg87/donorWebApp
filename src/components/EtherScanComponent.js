import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const EtherScanComponent = ({ address }) => {
  const [transactionCount, setTransactionCount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const etherscanApiKey = process.env.NEXT_PUBLIC_DONOR_ETHSCAN_APIKEY;

  const fetchData = async () => {
    if (!etherscanApiKey) {
      console.error('Etherscan API key is not set');
      setError('Etherscan API key is not set');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.providers.EtherscanProvider('sepolia', etherscanApiKey);

      // Fetch transaction count
      const txCount = await provider.getTransactionCount(address);
      setTransactionCount(txCount);

      // Fetch balance
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Etherscan:', error);
      setError('Error fetching data from Etherscan');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address, etherscanApiKey]);

  return (
    <div>
      <h3>Address: {address}</h3>
      <button onClick={fetchData} disabled={loading} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && (
        <>
          <p>Transaction Count: {transactionCount}</p>
          <p>Balance: {balance} ETH</p>
        </>
      )}
    </div>
  );
};

export default EtherScanComponent;
