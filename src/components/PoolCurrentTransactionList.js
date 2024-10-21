"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import {formatEther } from 'viem';
import { fetchCurrentTransactionsForPoolId, timestampToDateString, getTimeAgo} from "@/utils/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';


const PoolCurrentTransactionList = ({ pool }) => {
  const [transactions, setTransactions] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getTransactionsForPool = async (id) => {
      const data = await fetchCurrentTransactionsForPoolId(id);
      if (data?.response?.status !== 404) {
        setTransactions(data);
      }
    };

    if (pool?.id) {
      getTransactionsForPool(pool?.id);
    }

  }, [pool?.id]);

  // if (transactions) {
  //   transactions.map((transaction) => {
  //     console.log(transaction);
  //
  //     const weiValue = BigInt(transaction.value); // Example Wei value
  //     const etherValue = formatEther(weiValue); // Convert Wei to Ether
  //     console.log(etherValue); // Outputs the value in Ether
  //     const txnFeeWei = BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice);
  //     console.log('formatEther(txnFeeWei)');
  //     console.log(formatEther(txnFeeWei));
  //
  //   });
  // }


  return (
    <div className="flex flex-col justify-center items-center py-4">
      {transactions && (
        <div className="mx-2 px-4 w-full bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white mt-4 mb-4">Transactions for this pool</h2>
          <ul className="divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="py-4">
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Block:</span>
                    <span className="text-sm text-white">{transaction.blockNumber}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Age:</span>
                    <span className="text-sm text-white">{getTimeAgo(transaction.timeStamp)} ago</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">From:</span>
                    <span className="text-sm text-white flex items-center justify-end" style={{ width: 'calc(100% - 48px)' }}>
                      <span className="truncate max-w-[calc(100%_-_140px)]" title={transaction.from}>
                        {transaction.from}
                      </span>
                      <a
                        href={`https://etherscan.io/tx/${transaction.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-400 hover:text-blue-500 transition"
                        title="Check it on etherscan!"
                      >
                        <FontAwesomeIcon icon={faLink} size="lg" style={{width: 20}}/>
                      </a>
                    </span>
                  </div>
                  <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Amount:</span>
                    <span className="text-sm text-white">{formatEther(transaction.value)} ETH</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Txn Fee:</span>
                    <span className="text-sm text-white">{Number(formatEther((BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice)))).toFixed(8)} ETH</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};


export default PoolCurrentTransactionList;