// src/app/page.js
import React from 'react';
import MainContent from '../components/MainContent';
import { AppProvider } from '../contexts/AppContext';

export default function Home({pools, donors}) {
  return <AppProvider>
    <MainContent pools={pools} donors={donors}/>;
  </AppProvider>
}


export async function getServerSideProps(context) {
  try {
    // Fetch pools
    const poolsRes = await fetch('http://localhost:5001/api/pools');
    const poolsData = await poolsRes.json();

    // Fetch donors
    const donorsRes = await fetch('http://localhost:5001/api/donors');
    const donorsData = await donorsRes.json();

    return {
      props: {
        pools: poolsData,
        donors: donorsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pools: null,
        donors: null,
      },
    };
  }
}
