import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TransactionListComponent = ({ transactions }) => {
  // Helper function to convert UNIX timestamp to readable date format
  const timestampToDateString = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Adjust locale and format as needed
  };

  // Helper function to format Ethereum value from wei to ETH
  const formatEtherValue = (value) => {
    return ethers.formatEther(value);
  };

  return (
    <div className="max-h-screen overflow-y-hidden bg-black p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Last 10 transactions on the network:</h2>
      <div className="max-h-[40vh] overflow-y-auto space-y-4 hidden-scrollbar">
        {transactions.map((tx, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white">Transaction {index + 1}</h3>
            <p className="text-white"><strong>Timestamp:</strong> {timestampToDateString(tx.timeStamp)}</p>
            <p className="text-white"><strong>From:</strong> {tx.from}</p>
            <p className="text-white"><strong>To:</strong> {tx.to}</p>
            <p className="text-white"><strong>Value:</strong> {formatEtherValue(tx.value)} ETH</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Transaction Hash:</strong> {tx.hash}</p>
            <p className="text-white"><strong>Block Number:</strong> {tx.blockNumber}</p>
            <p className="text-white"><strong>Gas Price:</strong> {tx.gasPrice} wei</p>
            <p className="text-white"><strong>Gas Used:</strong> {tx.gasUsed}</p>
            <p className="text-white"><strong>Confirmations:</strong> {tx.confirmations}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionListComponent;