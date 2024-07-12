"use client";

import React, { useState, useEffect } from 'react';


const DevCurrentLists = ({ pools, donors }) => {
  return (
    <>
      {pools && (
        <div className="m-2 p-4">
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
      {donors && (
        <div className="m-2 p-4">
          <h2 className="text-xl font-semibold text-white-800 mt-8 mb-4">Donors</h2>
          <ul className="divide-y divide-gray-200">
            {donors.map((donor) => (
              <li key={donor.id} className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-white-800">{donor.address}</span>
                    <span className="text-sm text-white-500">Amount: {donor.amount}, Fee: {donor.fee}</span>
                  </div>
                  <span className="text-sm text-white-500">Pool ID: {donor.poolId}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};


export default DevCurrentLists;