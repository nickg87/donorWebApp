"use client";

// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SocialDonations from '../components/SocialDonations';
import ProgressBar from '../components/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {

  const [donors, setDonors] = useState(null);
  const [pools, setPools] = useState(null);


  useEffect(() => {

    if (!pools) {
      //Fetch pools
      fetch('http://localhost:5001/api/pools')
        .then((res) => res.json())
        .then((data) => setPools(data))
        .catch((error) => console.error('Error fetching pools:', error));
    }

    if (!donors) {
      // Fetch donors
      fetch('http://localhost:5001/api/donors')
        .then((res) => res.json())
        .then((data) => setDonors(data))
        .catch((error) => console.error('Error fetching donors:', error));
    }


  }, [pools, donors]);

  console.log('kkt main');

  return (
    <Layout>
      <>
        {/*<div className="bg-gray-700 m-2 p-4 flex rounded-md shadow-md">*/}
        {/*  <div className="w-full max-w-screen-sm mx-auto">*/}
        {/*    <h1 className="text-2xl font-bold text-gray-100">Welcome to My App</h1>*/}
        {/*    <p className="text-gray-200 mt-2">*/}
        {/*      Get started by editing <code className="text-blue-600">src/app/pages.js</code>*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <ProgressBar/>

        {pools && (
          <div className="m-2 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pools</h2>
            <ul className="divide-y divide-gray-200">
              {pools.map((pool) => (
                <li key={pool.id} className="py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800">{pool.name}</span>
                      <span className="text-sm text-gray-500">{pool.description}</span>
                    </div>
                    <span className="text-sm text-gray-500">Capacity: {pool.capacity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {donors && (
          <div className="m-2 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Donors</h2>
            <ul className="divide-y divide-gray-200">
              {donors.map((donor) => (
                <li key={donor.id} className="py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-medium text-gray-800">{donor.address}</span>
                      <span className="text-sm text-gray-500">Amount: {donor.amount}, Fee: {donor.fee}</span>
                    </div>
                    <span className="text-sm text-gray-500">Pool ID: {donor.poolId}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <>
          {/* Existing content here */}
          <SocialDonations />
        </>
      </>
    </Layout>
  );
};


export default MainContent;