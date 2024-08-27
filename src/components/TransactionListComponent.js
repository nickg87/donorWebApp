import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TransactionListComponent = ({ transactions }) => {
  //https://sepolia.etherscan.io/tx/0x356aa6a1460149481f5a9e0778205208079a815d09bb9af2a2be6dc7effba6cd

  //console.log(transactions);
  // Helper function to convert UNIX timestamp to readable date format
  const timestampToDateString = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Adjust locale and format as needed
  };

  // Helper function to format Ethereum value from wei to ETH
  const formatEtherValue = (value) => {
    // ethers v6
    //return ethers.formatEther(value);
    return ethers.utils.formatEther(value);
  };

  return (
    <div className="max-h-screen overflow-y-hidden bg-black bg-opacity-40 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Last 10 transactions on the network:</h2>
      <div className="max-h-[40vh] overflow-y-auto space-y-4 hidden-scrollbar">
        {transactions.map((tx, index) => (
          <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white">Transaction {index + 1}</h3>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Timestamp:</strong> {timestampToDateString(tx.timeStamp)}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>From:</strong> {tx.from}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>To:</strong> {tx.to}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Value:</strong> {formatEtherValue(tx.value)} ETH</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Transaction Hash:</strong> {tx.hash}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Block Number:</strong> {tx.blockNumber}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Gas Price:</strong> {tx.gasPrice} wei</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Gas Used:</strong> {tx.gasUsed}</p>
            <p className="text-white" style={{ wordBreak: "break-all" }}><strong>Confirmations:</strong> {tx.confirmations}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionListComponent;