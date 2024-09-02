"use client";

import React, { useState, useEffect } from 'react';


const DevCurrentLists = ({ pools, transactions }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      {pools && (
        <div className="m-2 p-4 max-w-lg w-full">
          <h2 className="text-xl font-semibold text-white-800 mb-4">Pools</h2>
          <ul className="divide-y divide-gray-200">
            {pools.map((pool) => (
              <li key={pool.id} className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-white-800">{pool.name}</span>
                    <span className="text-sm text-white-500">{pool.description}</span>
                  </div>
                  <span className="text-sm text-white-500">Capacity: {pool.capacity}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {transactions && (
        <div className="m-2 p-4 max-w-lg w-full">
          <h2 className="text-xl font-semibold text-white-800 mt-8 mb-4">Transactions</h2>
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-white-800">{transaction.address}</span>
                    <span className="text-sm text-white-500">Amount: {transaction.amount}, Fee: {transaction.fee}</span>
                  </div>
                  <span className="text-sm text-white-500">Pool ID: {transaction.poolId}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default DevCurrentLists;